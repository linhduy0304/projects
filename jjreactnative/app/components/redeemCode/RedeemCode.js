import React from 'react';
import {Container, Content, Input} from 'native-base';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, BackHandler, TextInput, KeyboardAvoidingView, Keyboard} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import Communications from "react-native-communications";
import FastImage from 'react-native-fast-image'

import {strings} from "../../../locates/i18n";
import CIcon from '../common/CIcon';
import {
    COLOR_LINE,
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_HINT,
    COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE
} from '../../resources/colors'
import {
    STATUS_EXPIRED, DEAL_TYPE_LAST_MIN, PROMOCODE_UPGRADE, DEAL_TYPE_EXCLUSIVE, STATUS_REDEEMED,
    STATUS_REJECTED, DEAL_TYPE_MOVIE
} from "../../const";
import {connect} from "react-redux";
import JJHeader from '../common/JJHeader';
import {getQRCodeUrl} from "../../utils/Utils";
import JJIcon from '../common/JJIcon';
import LoadingViewPopup from "../../common/view/loading/LoadingViewPopup";
import {couponApi} from '../../api/coupon-api'
import {StringUtil} from '../../utils/string-util'
import {BasePureComponent} from "../common/BasePureComponent";
import {couponChangeAction} from '../detail/booking/action'
import {ObjectUtil} from '../../utils/object-utils'
import {AnalyticsUtil} from "../common/analytics/analytics";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_LARGE, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER
} from "../../resources/dimens";
import {Alert} from '../common/alert/JJAlert'
import Text from '../../common/view/text/JJText';
import {HOTLINE} from '../../const';
import RedeemSuccessPopup from './RedeemSuccessPopup';
import {DealSubject} from '../../common/subject/deal-subject';

const isIOS = Platform.OS === 'ios';
moment.locale('vi');

import Intl from 'intl';
import 'intl/locale-data/jsonp/vi'
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";
import type {ServiceInteractionModel} from "../../model/data/ServiceInteractionModel";
import {getErrorMessage, ERROR_NORMAL} from '../../utils/text-message';


const KEYBOARD_NUMBER_TYPE = !!isIOS ? 'number-pad' : 'numeric';

class RedeemCode extends BasePureComponent {

    static navigationOptions = {
        header: null,
    };

    numberFormat = undefined;

    constructor(props) {
        super();
        this.state = {
            showMoreInfo: false,
            loading: false,
            inputInfo: {
                storeCode: null,
                slot: null,
                price: null,
                discount: null,
                note: null
            },
        };
        if (!isIOS) {
            this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
                BackHandler.addEventListener('hardwareBackPress', this._handlePressBack)
            );
        }
    }

    render() {
        let {deal} = this.props.navigation.state.params;

        let content = null;
        if (!deal) {
            content = <ActivityIndicator animating={true}
                                         size={'small'}/>
        } else {
            content = this._renderMainContent(deal);
        }

        const enableRejectButton = !!this.state.inputInfo.storeCode  && !StringUtil.isEmpty(this.state.inputInfo.storeCode.trim());
        const enableAcceptButton = enableRejectButton &&
                                    !!this.state.inputInfo.slot &&
                                    !StringUtil.isEmpty(this.state.inputInfo.slot);

        const buttonAcceptColor = enableAcceptButton ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE_DISABLE;
        const buttonRejectColor = enableRejectButton ? COLOR_TEXT_INACTIVE : COLOR_TEXT_INACTIVE_DISABLE;

        return (
            <Container style={{flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white'}}>
                {/*toolbar*/}
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={false}
                    title={'ĐỔI MÃ'}
                />

                {content}

                <KeyboardAvoidingView style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'column',
                    backgroundColor: 'white'
                }}
ehavior={(Platform.OS === 'ios') ? 'padding' : null}>                                      b
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 8,
                        paddingBottom: 16
                    }}>
                        <Text style={{
                            height: 20,
                            color: '#999999',
                            textAlign: 'center',
                            fontSize: 12
                        }}>
                            Hotline JAMJA:
                        </Text>
                        <TouchableOpacity style={{marginLeft: 4, flexDirection: 'row'}}
                                          onPress={this._onCallSupportClicked}>
                            <JJIcon name={'phone_forwarded_o'}
                                    size={18}
                                    color={COLOR_PRIMARY}/>
                            <Text style={styles.hotLine}>
                                {HOTLINE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.layoutButtonRedeem}>
                        <TouchableOpacity
                            style={[
                                styles.buttonReject,
                                {
                                    borderColor: buttonRejectColor
                                }
                            ]}
                            onPress={this._onActionRejectClicked}
                            disabled={!enableRejectButton}>
                            <Text style={{fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold', color: buttonRejectColor}}>
                                {strings('redeem_code.label_reject')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.buttonRedeem,
                                {
                                    backgroundColor: buttonAcceptColor,
                                    borderColor: buttonAcceptColor
                                }]
                            }
                            onPress={this._onActionAcceptClicked}
                            disabled={!enableAcceptButton}>

                            <Text style={{fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold', color: 'white'}}>
                                {strings('redeem_code.label_accept')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                <RedeemSuccessPopup
                    ref={'redeemSuccessPopup'}
                    onPress={this._onRedeemSuccessButtonPress}/>

                <LoadingViewPopup visible={this.state.loading}
                                  message={'Đang xử lý...'}/>
            </Container>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this.onRedeemSuccess = this.props.navigation.state.params.onRedeemSuccess;
        this._logScreen();
        if (!isIOS) {
            this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
                BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack)
            );
        }
        setTimeout(() => {
            if (!this.mounted) return;
            try {
                if (!!this.refs && !!this.refs['textInputStoreCode'] && !!this.refs['textInputStoreCode']._root) {
                    this.refs['textInputStoreCode']._root.focus()
                }
            } catch (e) {
                console.log(e);
            }

        }, 1000);
    }

    _renderMainContent = (deal) => {
        const isLastMin = DEAL_TYPE_LAST_MIN === deal.get('deal_type', '') || DEAL_TYPE_MOVIE === deal.get('deal_type', '');
        return (
            <Content style={{
                backgroundColor: 'white',
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 120,
                paddingBottom: 8
            }}>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 16,
                    marginTop: 16
                }}>
                    <TouchableOpacity onPress={this._onOpenQRCodePreview}>
                        <FastImage
                            source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(deal.get('code', ''), 144))}
                            style={{height: 72, width: 72}}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </TouchableOpacity>
                    <Text style={{color: '#999999', fontSize: 14}}>
                        Mã {isLastMin ? 'đặt chỗ' : 'ưu đãi'}
                    </Text>
                    <Text style={{color: COLOR_PRIMARY, fontSize: 18, fontWeight: 'bold'}}>
                        {deal.get('code', '')}
                    </Text>

                    <View style={{width: 72, height: 2, backgroundColor: COLOR_PRIMARY}}/>
                </View>

                {
                    deal.get('code', '').indexOf('***') >= 0 &&
                    <Text style={{
                        paddingTop: DIMENSION_PADDING_MEDIUM,
                        paddingBottom: DIMENSION_PADDING_MEDIUM,
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        paddingRight: DIMENSION_PADDING_MEDIUM,
                        color: COLOR_TEXT_INACTIVE,
                        textAlign: 'center'
                    }}>
                        Nhập Mã xác nhận cửa hàng để kích hoạt & xác nhận Mã đặt chỗ
                    </Text>
                }

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: '#999999', fontSize: 14}}>
                        Ưu đãi:
                    </Text>
                    {this._renderCouponHighlight(deal)}
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: '#999999', fontSize: 14}}>
                        Chương trình:
                    </Text>
                    <Text style={{flex: 1, color: '#999999', fontSize: 14, fontWeight: 'bold'}}>
                        {deal.get('title', '')}
                    </Text>
                </View>

                {this._renderWarning(deal)}

                <View style={styles.inputContainer}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{color: '#454545'}}>
                            {strings('redeem_code.label_store_code')}
                            <Text style={{color: COLOR_PRIMARY}}>*</Text>
                            :
                        </Text>
                        <Text style={{color: '#C9C9CD', fontSize: 11}}>
                            {strings('redeem_code.sub_store_code')}
                        </Text>
                    </View>
                    <Input
                        ref='textInputStoreCode'
                        style={{flex: 1, color: '#454545', textAlign: 'right'}}
                        maxLength={20}
                        autoFocus={false}
                        multiline={false}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        returnKeyLabel={'next'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        onChangeText={this._onStoreCodeInputChanged}
                        onSubmitEditing={this._onStoreCodeInputSubmitClicked}/>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{color: '#454545'}}>
                            {this._getHintText(deal)}
                            <Text style={{color: COLOR_PRIMARY}}>
                                *
                            </Text>
                            :
                        </Text>
                        <Text style={{color: '#C9C9CD', fontSize: 11}}>
                            {this._getHintText(deal)}
                        </Text>
                    </View>
                    <Input style={{flex: 1, color: '#454545', textAlign: 'right'}}
                           ref="edtSlot"
                           maxLength={2}
                           multiline={false}
                           keyboardType={KEYBOARD_NUMBER_TYPE}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           returnKeyType={'default'}
                           returnKeyLabel={'default'}
                           onChangeText={this._onSlotInputChanged}
                           value={this.state.inputInfo.slot}
                    />
                </View>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 16}}
                                  onPress={this._actionShowMoreInfo}>
                    <View style={{flex: 1}}>
                        <Text style={{color: this.state.showMoreInfo ? '#999999' : '#454545'}}>
                            {strings('redeem_code.label_more_info')}
                        </Text>
                        <Text style={{
                            color: '#999999',
                            fontSize: 11
                        }}>
                            {this.state.showMoreInfo ? '' : strings('redeem_code.sub_more_info')}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                        <CIcon name={this.state.showMoreInfo ? 'angle-up' : 'angle-down'} family={'FontAwesome'}
                               style={{color: COLOR_TEXT_INACTIVE, padding: 10}}/>
                    </View>
                </TouchableOpacity>
                {
                    this.state.showMoreInfo && <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={styles.inputContainer}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{color: '#454545'}}>
                                    {strings('redeem_code.label_pricing')}:
                                </Text>
                                <Text style={{
                                    color: '#C9C9CD',
                                    fontSize: 11
                                }}>
                                    {strings('redeem_code.sub_pricing')}
                                </Text>
                            </View>
                            <TextInput style={{flex: 1, color: '#454545', textAlign: 'right'}}
                                       keyboardType={KEYBOARD_NUMBER_TYPE}
                                       maxLength={19}
                                       placeholderTextColor={COLOR_TEXT_HINT}
                                       underlineColorAndroid='transparent'
                                       multiline={false}
                                       autoCorrect={false}
                                       onChangeText={this._onPriceNumberInputChanged}
                                       value={this.state.inputInfo.price}/>
                                  
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={{flex: 1, justifyContent: 'center'}}> 
                                <Text style={{color: '#454545'}}>
                                    {strings('redeem_code.label_discount')}:
                                </Text>
                                <Text style={{
                                    color: '#C9C9CD',
                                    fontSize: 11
                                }}>
                                    {strings('redeem_code.sub_discount')}
                                 </Text>
                            </View>
                            <TextInput style={{flex: 1, color: '#454545', textAlign: 'right'}}
                                       keyboardType={KEYBOARD_NUMBER_TYPE}
                                       maxLength={19}
                                       placeholderTextColor={COLOR_TEXT_HINT}
                                       underlineColorAndroid='transparent'
                                       multiline={false}
                                       autoCorrect={false}
                                       onChangeText={this._onDiscountInputChanged}
                                       value={this.state.inputInfo.discount}/>
                        </View>

                        <View style={{flexDirection: 'column', marginTop: 16}}>
                            <Text style={{color: '#454545'}}>
                                {strings('redeem_code.label_note')}:
                            </Text>
                            <Input
                                style={{
                                    flex: 1,
                                    color: COLOR_TEXT_BLACK_1,
                                    backgroundColor: 'white',
                                    textAlignVertical: "top",
                                    height: 120,
                                    borderColor: COLOR_LINE,
                                    borderWidth: 1,
                                    borderRadius: DIMENSION_RADIUS_LARGE,
                                    paddingTop: DIMENSION_PADDING_SMALL,
                                    paddingBottom: DIMENSION_PADDING_SMALL,
                                    paddingLeft: DIMENSION_PADDING_SMALL,
                                    paddingRight: DIMENSION_PADDING_SMALL,
                                    marginTop: DIMENSION_PADDING_SMALL,
                                    marginBottom: DIMENSION_PADDING_MEDIUM,
                                    fontSize: DIMENSION_TEXT_CONTENT
                                }}
                                placeholder={strings('redeem_code.sub_note')}
                                placeholderTextColor={COLOR_TEXT_HINT}
                                maxLength={1024}
                                multiline={true}
                                underlineColorAndroid='transparent'
                                defaultValue={this.state.inputInfo.note}
                                onChangeText={this._onNoteInputChanged}/>
                        </View>
                    </View>
                }

            </Content>
        )
    }

    _onActionRejectClicked = () => {
        Keyboard.dismiss();
        let {deal} = this.props.navigation.state.params;
        if (!deal) return;
        this._actionReject(deal)
    }

    _onActionAcceptClicked = () => {
        Keyboard.dismiss();
        let {deal} = this.props.navigation.state.params;
        if (!deal) return;
        this._actionAccept(deal)
    }

    _onCallSupportClicked = () => Communications.phonecall('090 222 0326', true);

    _onPriceNumberInputChanged = (text) => {
        this.setState({
            ...this.state,
            inputInfo: {
                ...this.state.inputInfo,
                price: this._priceFormat(text)
            }
        })
    }

    _onDiscountInputChanged = text => {
        this.setState({
            ...this.state,
            inputInfo: {
                ...this.state.inputInfo,
                discount: this._priceFormat(text)
            }
        })
    }

    _onNoteInputChanged = text => this.state.inputInfo.note = text;

    _onStoreCodeInputChanged = text => {
        this.setState({
            ...this.state,
            inputInfo: {
                ...this.state.inputInfo,
                storeCode: text.trim()
            }
        })
    }

    _onSlotInputChanged = text => {
        this.setState({
            ...this.state,
            inputInfo: {
                ...this.state.inputInfo,
                slot: this._slotNumberFormat(text)
            }
        })
    }

    _onStoreCodeInputSubmitClicked = () => this.refs['edtSlot']._root.focus();

    _priceFormat = (price) => {
        if(StringUtil.isBlank(price)) return "";
        let priceNumber = price.replace(/[^0-9]/g, "");
        if(priceNumber.length <= 3) return priceNumber;
        if (!this.numberFormat) this.numberFormat = new Intl.NumberFormat('vi', { style: 'decimal', maximumFractionDigits: 3});
        priceNumber = this.numberFormat.format(priceNumber);
        return priceNumber;
    }

    _slotNumberFormat = (text) => {
        if (!!isIOS) return text;
        return text.replace(/[^0-9]/g, '');
    }

    _renderCouponHighlight = (deal) => {
        if (!deal) return null;
        if (deal.get('deal_type', '') === DEAL_TYPE_EXCLUSIVE) {
            return (
                <Text style={styles.couponHighlightRed}>
                    {deal.get('highlight_title', '')}
                </Text>
            )
        }

        const promoCodeApplied = deal.get('promocode_applied');


        if (!promoCodeApplied || !promoCodeApplied.get('code_name')) {
            return (
                <Text style={[styles.couponHighlightRed]}>
                    {deal.get('coupon_highlight', '')}
                </Text>
            )
        }

        if (PROMOCODE_UPGRADE === promoCodeApplied.type_promocode) {
            return (
                <Text style={[styles.couponHighlightRed]}>
                    {deal.get('coupon_highlight', '') + ' & ' + promoCodeApplied.get('description', '')}
                </Text>
            )
        }

        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#999999', textDecorationLine: 'line-through', fontSize: 14, fontWeight: 'bold'}}>
                    {deal.get('coupon_highlight', '')}
                </Text>
                <Text style={styles.couponHighlightRed}>
                    {' ' + promoCodeApplied.get('description', '')}
                </Text>
            </View>
        )
    }

    _renderWarning = (deal) => {
        if (!deal) return null;
        let message = null;
        if (deal.get('status') == STATUS_EXPIRED) {
            message = deal.get('warning_msg', '');
        } else if (deal.get('check_in_time')) {
            let checkinDate = moment.unix(deal.get('check_in_time')).local();
            if (checkinDate.isAfter(new Date())) {
                message = strings('redeem_code.redeem_early_1') + checkinDate.format('HH:mm, DD/MM/YYYY') + strings('redeem_code.redeem_early_2');
            }
        }

        if (StringUtil.isBlank(message)) return null;
        return (
            <View style={{flex: 1, flexDirection: 'column', marginTop: 16}}>
                <Text style={{fontSize: 12, color: COLOR_PRIMARY}}>
                    <JJIcon name={'alert_triangle_o'}
                            size={16}
                            color={COLOR_PRIMARY}/>
                    {' ' + strings('redeem_code.label_warning')}:
                </Text>
                <Text style={{color: COLOR_PRIMARY, fontSize: 12}}>
                    {message}
                </Text>
            </View>
        )
    }

    _onOpenQRCodePreview = () => {
        let {deal} = this.props.navigation.state.params;
        if (!deal) return;

        let qrcode = deal.get('code');
        if (StringUtil.isBlank(qrcode)) return;

        AnalyticsUtil.logNormalEvent(
            'open_qr_code_preview',
            {
                action_location: 'redeem_code',
                action_name: 'click_qr_code_image',
                qr: qrcode
            },
            'action_coupon'
        )

        this.props.navigation.navigate('QRCodePreview', {qrCode: qrcode});
    }

    _actionReject = (deal) => {
        if (this.state.loading || !deal) return null;
        let inputInfo = this.state.inputInfo;
        if (inputInfo.storeCode == null || inputInfo.storeCode.length < 3) {
            this._showAlertHaveOnlyButtonOk(strings('redeem_code.please_input_store_code'));
            return;
        }
        if (!StringUtil.isValidName(inputInfo.storeCode)) {
            this._showAlertHaveOnlyButtonOk('Mã xác nhận cửa hàng không hợp lệ');
            return;
        }
        this._actionShowLoading();
        this._redeem('reject_redeem', deal, this.state.inputInfo);
    }

    _showAlertHaveOnlyButtonOk = (message) => {
        Alert.alert('Thông báo',
            message,
            [
                {text: 'OK', onPress: () => console.log('cancel alert warning')}
            ],
            {cancelable: true})
    }

    _actionAccept = (deal) => {
        if (this.state.loading || !deal) return null;
        let inputInfo = this.state.inputInfo;
    
        if (inputInfo.storeCode == null || inputInfo.storeCode.length < 3) {
            this._showAlertHaveOnlyButtonOk(strings('redeem_code.please_input_store_code'));
            return;
        }
        if (!StringUtil.isValidName(inputInfo.storeCode)) {
            this._showAlertHaveOnlyButtonOk('Mã xác nhận cửa hàng không hợp lệ');
            return;
        }
        if (inputInfo.slot == null || parseInt(inputInfo.slot) < 1 || !StringUtil.isValidNumber(inputInfo.slot)) {
            this._showAlertHaveOnlyButtonOk(strings('redeem_code.please_input_slot') + ' ' + this._getHintText(deal));
            return;
        }
        this._actionShowLoading();
        this._redeem('accept_redeem', deal, this.state.inputInfo);
    }

    _redeem = (action, deal, inputObject) => {
        if (!deal || !inputObject) {
            return;
        }
        let requestParams = {};
        requestParams.action = action;
        requestParams.code = deal.get('code', '');
        requestParams.coupon_id = deal.get('coupon_id', '');
        requestParams.slot = inputObject.slot;
        requestParams.merchant_code = inputObject.storeCode;
        if (!StringUtil.isEmpty(inputObject.price)) {
            requestParams.spend_amount = inputObject.price.replace(/[^0-9]/g, "");
        }
        if (!StringUtil.isEmpty(inputObject.discount)) {
            requestParams.pay_amount = inputObject.discount.replace(/[^0-9]/g, "");
        }
        if (inputObject.note !== null) {
            requestParams.note = inputObject.note;
        }

        this._logEventRedeem(`${action}_start_request`);

        couponApi.redeemCoupon(requestParams)
            .then(response => {
                console.log('-----------------redeem response', response);
                this._actionCloseLoading();
                if (response.hasOwnProperty('error') || response.hasOwnProperty('error_message')) {
                    this._logEventRedeem(`${action}_failure`);
                    this._checkRedeemError(response);
                } else {
                    this._checkRedeemResponse(response);
                }
            })
            .catch(error => {
                console.log(error);
                this._logEventRedeem(`${action}_failure`);
                this._actionCloseLoading();
                this._checkRedeemError(error);
            });
    }

    _checkRedeemResponse = (couponState) => {
        console.log('_checkRedeemResponse', this.props.navigation.state.params.deal.toJS(), couponState);

        let {deal} = this.props.navigation.state.params;
        deal = deal.updateIn(['code_status'], () => couponState.coupon_status);
        this.props.dispatch(couponChangeAction(deal.get('id', ''), ObjectUtil.createBaseCouponFromDeal(deal)));

        if (STATUS_REDEEMED == couponState.coupon_status) {
            this._logEventRedeem('accept_redeem_success');

            if (!!couponState.is_display_as_alias) {
                this._showRedeemSuccessPopup(couponState);
            }
            else {
                this._showAlertRedeemSuccess(strings('redeem_code.redeem_success_1') + couponState.code + strings('redeem_code.redeem_success_2'));
            }

            AnalyticsUtil.couponRedeemed(
                deal.getIn(['title'], ''),
                deal.getIn(['slug'], ''),
                deal.getIn(['brand', 'brand_slug'], ''),
                deal.getIn(['cat1'], ''),
                deal.getIn(['cat2'], ''),
                deal.getIn(['deal_type'], ''),
                deal.get('avg_billing_value', 0),
                deal.get('avg_billing_value', 0) * deal.getIn(['coupon', 'slot'], 0),
                deal.getIn(['coupon', 'slot'], 0),
                moment.unix(deal.get('check_in_time')).local().toDate(),
                deal.getIn(['coupon', 'id'], ''),
                deal.getIn(['promocode_applied', 'code_name'], ''),
            );


        } else if (STATUS_REJECTED == couponState.coupon_status) {
            this._logEventRedeem('reject_redeem_success');
            this._showAlertRedeemSuccess(strings('redeem_code.reject_success_1') + couponState.code + strings('redeem_code.reject_success_2'));
        }
    }

    _showAlertRedeemSuccess = (message) => {
        Alert.alert(
            'Thành công',
            message,
            [
                {text: 'OK', onPress: this._onSuccessAlertButtonClicked}
            ],
            {
                cancelable: false,
                onDismiss: this._onSuccessAlertButtonClicked
            }
        )
    }

    _onSuccessAlertButtonClicked = () => {
        if (this.onRedeemSuccess) this.onRedeemSuccess();
        let {deal} = this.props.navigation.state.params;
        if (!deal) return;
        DealSubject.dispatch('remove_ticket', {
            coupon_id: deal.get('coupon_id', ''),
            deal_id: deal.get('id', '')
        });
        this.props.navigation.goBack();
    }

    _checkRedeemError = (error) => {
        if (error === undefined || error === null) return;
        this._showAlertError(getErrorMessage(error, ERROR_NORMAL));
    }

    _getHintText = (deal) => {
        if (!deal) return strings('redeem_code.label_hint_text');

        let hintText = deal.get('hint_text', '');
        if (StringUtil.isBlank(hintText)) return strings('redeem_code.label_hint_text');
        if (hintText.toLowerCase().indexOf('số') < 0) hintText = 'Số ' + hintText;

        return hintText;
    }

    _showAlertError = (message) => {
        Alert.alert('Lỗi',
            message,
            [
                {text: 'OK', onPress: () => console.log('cancel alert error')}
            ],
            {cancelable: true})
    }

    _actionShowMoreInfo = () => {
        this.setState({showMoreInfo: !this.state.showMoreInfo});
    }

    _actionCloseLoading = () => {
        this.setState({loading: false});
    }

    _actionShowLoading = () => {
        this.setState({loading: true});
    }

    _showRedeemSuccessPopup = response => {
        !!this.refs.redeemSuccessPopup && this.refs.redeemSuccessPopup.show(response.coupon_code);

        DealSubject.dispatch(
            'update_coupon_alias',
            {
                couponId: response.coupon_id,
                code: response.coupon_code
            }
        )

        let {deal} = this.props.navigation.state.params;
        if (!deal) return;

        const d: ServiceInteractionModel = {};
        d.screen_name = 'RedeemCode';
        d.item_id = deal.get('slug');
        d.item_brand = deal.getIn(['brand', 'brand_slug']);
        d.item_category = deal.get('deal_type');
        d.interaction_type = 'show_redeem_success_popup';
        AnalyticsUtil.trackPhucLongServiceInteraction(d);
    }

    _onRedeemSuccessButtonPress = () => {
        let {deal} = this.props.navigation.state.params;
        if (!deal) return;

        const d: ServiceInteractionModel = {};
        d.screen_name = 'RedeemCode';
        d.item_id = deal.get('slug');
        d.item_brand = deal.getIn(['brand', 'brand_slug']);
        d.item_category = deal.get('deal_type');
        d.interaction_type = 'redeem_success_button_click';
        AnalyticsUtil.trackPhucLongServiceInteraction(d);

        this.props.navigation.replace('LastMinReservationInfo', {couponId: deal.get('coupon_id', '')});
    }

    _logScreen = () => {
        let {deal} = this.props.navigation.state.params;
        if (deal === undefined) return;

        AnalyticsUtil.logCurrentScreen(
            'redeem_code',
            {
                item_id: deal.getIn(['slug'], ''),
                item_name: deal.getIn(['slug'], ''),
                item_brand: deal.getIn(['brand', 'brand_slug'], ''),
                deal_type: deal.getIn(['deal_type'], ''),
                coupon: deal.get('coupon_id', ''),
                code: deal.get('code', '')
            }
        );
    }

    _logEventRedeem = (event) => {
        let {deal} = this.props.navigation.state.params;
        if (deal === undefined) return;
        AnalyticsUtil.logNormalEvent(
            event,
            {
                action_location: 'redeem_code',
                action_name: 'redeem',
                item_id: deal.getIn(['slug'], ''),
                item_name: deal.getIn(['slug'], ''),
                item_brand: deal.getIn(['brand', 'brand_slug'], ''),
                deal_type: deal.getIn(['deal_type'], ''),
                coupon: deal.get('coupon_id', ''),
                code: deal.get('code', '')
            },
            'action_coupon'
        )
    }

    _handlePressBack = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        if (!isIOS) {
            BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack);
            this._didFocusSubscription && this._didFocusSubscription.remove();
            this._willBlurSubscription && this._willBlurSubscription.remove();
        }
        super.componentWillUnmount();
    }
}

const styles = StyleSheet.create({
    toolbarContainer: {
        backgroundColor: COLOR_PRIMARY,
    },
    textCode: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLOR_PRIMARY,
        fontSize: 18,
        padding: 4,
        marginTop: 8
    },
    textCouponHighlight: {
        textAlign: 'center',
        color: COLOR_PRIMARY,
        fontSize: 12
    },
    couponHighlightRed: {
        color: COLOR_PRIMARY,
        fontSize: 14,
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 16,
        borderBottomWidth: 0.5,
        borderColor: COLOR_LINE,
    },
    phoneIcon: {
        height: 20,
        color: '#999999',
        fontSize: 12,
        paddingTop: 3,
        marginLeft: 5,
        marginRight: 5
    },
    hotLine: {
        height: 20,
        color: COLOR_PRIMARY,
        textAlign: 'center',
        fontSize: 12,
        paddingLeft: 4
    },
    buttonReject: {
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        marginRight: DIMENSION_PADDING_SMALL,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
    },
    buttonRedeem: {
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        marginLeft: DIMENSION_PADDING_SMALL,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
    },
    layoutButtonRedeem: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingTop: 6,
        borderTopWidth: 0.5,
        borderTopColor: '#ededed'
    }
});

export default connect()(RedeemCode);