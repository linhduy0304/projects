import { connect } from 'react-redux';
import { Text, Container } from 'native-base';
import { View, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import React from 'react';
import { fromJS } from 'immutable'

import {
    COLOR_GRAY_BG, COLOR_GRAY_BG_2, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_HINT,
    COLOR_TEXT_INACTIVE
} from '../../../resources/colors';
import DividerLine from '../../common/DividerLine';
import JJHeader from '../../common/JJHeader';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_LARGE, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import JJIcon from "../../common/JJIcon";
import LoadingViewPopup from "../../../common/view/loading/LoadingViewPopup";
import {ERROR_AUTH_MESSAGE, PROMOCODE_UPGRADE} from "../../../const";
import { BasePureComponent } from "../../common/BasePureComponent";
import { DateUtil } from '../../../utils/date-utils'
import { ObjectUtil } from '../../../utils/object-utils'
import { couponApi } from '../../../api/coupon-api'
import { UserDb } from "../../../api/storage/UserDb";
import { couponChangeAction } from '../booking/action'
import { StringUtil } from '../../../utils/string-util'
import { AnalyticsUtil } from '../../common/analytics/analytics'
import {updateUser} from "../../login/action";
import {fetcherConfig} from '../../../api/fetcher'
import {Alert} from '../../common/alert/JJAlert'
import {CouponDb} from "../../../api/storage/CouponDb";
import {validateEmail, validatePhoneNumber} from '../../../utils/validation-util';
import {AppConfig} from '../../../common/config';
import NoticeSection from '../../../common/view/notice/NoticeSection';
import ViewWithKeyboard from '../../../common/view/ViewWithKeyboard';

moment.locale('vi');

const isIOS = AppConfig.ios;
const headerHeight = isIOS ? 44 : 56;

class ConfirmBooking extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            full_name: props.user.contact_info_full_name,
            phone_number: props.user.contact_info_phone_number,
            email: props.user.contact_info_email,
            question: '',
            other: '',
            isBooking: false
        }
    }

    render() {
        let { deal, booking } = this.props.navigation.state.params;

        const booking_table_questions = deal.get('booking_table_questions', []);

        const enableConfirmButton = this._enableConfirmButton();

        return (
            <Container>
                {/* Toolbar */}
                <JJHeader
                    navigation={this.props.navigation}
                    customTitleView={() => {
                        return (
                            <View style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB }}>
                                    {deal.getIn(['brand', 'brand_name'], '')}
                                </Text>
                                <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                                    XÁC NHẬN ĐẶT CHỖ
                                </Text>
                            </View>
                        )
                    }}
                    leftItem={this._renderLeftButton}
                    rightItem={this._renderRightButton}
                />
                {/* Content */}
                <ViewWithKeyboard
                    style={{ flex: 1, backgroundColor: COLOR_GRAY_BG, justifyContent: 'center' }}>

                    <ScrollView
                        ref="scrollView"
                        style={{ flex: 1 }}>

                        {/* Header */}
                        <View style={{ backgroundColor: 'white', margin: DIMENSION_PADDING_MEDIUM, padding: DIMENSION_PADDING_MEDIUM, borderRadius: DIMENSION_RADIUS_LARGE, borderWidth: 1, borderColor: COLOR_LINE }}>
                            <View style={[styles.rowList, { paddingTop: 0 }]}>
                                <JJIcon style={styles.icon}
                                    name={"map_pin_o"}
                                    size={14}
                                    color={COLOR_TEXT_INACTIVE} />
                                <View style={{ paddingLeft: DIMENSION_PADDING_SMALL }}>
                                    <Text style={styles.textLabel}>
                                        Cửa hàng áp dụng
                                    </Text>
                                    <Text style={styles.textValue}>
                                        {booking.getIn(['store', 'address'], '')}
                                    </Text>
                                </View>
                            </View>
                            <DividerLine />
                            <View style={styles.rowList}>
                                <JJIcon style={styles.icon}
                                    name={"user_o"}
                                    size={14}
                                    color={COLOR_TEXT_INACTIVE} />
                                <View style={{ paddingLeft: DIMENSION_PADDING_SMALL }}>
                                    <Text style={styles.textLabel}>
                                        Số lượng
                                    </Text>
                                    <Text style={styles.textValue}>
                                        {booking.get('slot', 0)} {deal.get('hint_text', '').toLowerCase().replace("số ", "")}
                                    </Text>
                                </View>
                            </View>
                            <DividerLine />
                            <View style={styles.rowList}>
                                <JJIcon style={styles.icon}
                                    name={"clock_o"}
                                    size={14}
                                    color={COLOR_TEXT_INACTIVE} />
                                <View style={{ paddingLeft: DIMENSION_PADDING_SMALL }}>
                                    <Text style={styles.textLabel}>
                                        Thời gian
                                    </Text>
                                    <Text style={styles.textValue}>
                                        {moment(booking.getIn(['time', 'time'])).format('hh:mm A')}, {DateUtil.formatFullCalendarDate(booking.getIn(['time', 'time']))}
                                    </Text>
                                </View>
                            </View>
                            <DividerLine />
                            <View style={[styles.rowList, { paddingBottom: 0 }]}>
                                <JJIcon style={styles.icon}
                                    name={"gift_box_o"}
                                    size={14}
                                    color={COLOR_TEXT_INACTIVE} />
                                <View style={{ paddingLeft: DIMENSION_PADDING_SMALL }}>
                                    <Text style={styles.textLabel}>
                                        Ưu đãi
                                    </Text>
                                    {this._renderBookingHighlight(deal, booking)}
                                </View>
                            </View>
                        </View>

                        {
                            !!deal.get('alert_booking_confirm') &&
                            <NoticeSection
                                style={{marginTop: 0}}
                                icon={deal.get('alert_icon')}
                                message={deal.get('alert_booking_confirm')}/>
                        }

                        {/* Body 1*/}
                        <Text style={{
                            fontWeight: 'bold',
                            padding: DIMENSION_PADDING_MEDIUM,
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_CONTENT
                        }}>
                            THÔNG TIN NGƯỜI ĐẶT
                        </Text>

                        <View style={{ backgroundColor: 'white', padding: DIMENSION_PADDING_MEDIUM }}>
                            <View style={[styles.textInputContainer, { paddingTop: 0 }]}>
                                <Text style={styles.edtDescription}>
                                    Họ và tên
                                    <Text style={[styles.edtDescription, { color: COLOR_PRIMARY }]}>
                                        *
                                    </Text>
                                </Text>
                                <TextInput
                                    placeholder='Họ và tên'
                                    placeholderTextColor={COLOR_TEXT_HINT}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    autoCorrect={false}
                                    fontSize={DIMENSION_TEXT_CONTENT}
                                    maxLength={100}
                                    returnKeyType={'next'}
                                    autoCapitalize={'none'}
                                    onChangeText={this._onUserNameInputChanged}
                                    onSubmitEditing={this._onUserNameInputSubmitClicked}
                                    value={this.state.full_name}
                                    style={styles.textInput} />

                            </View>
                            <DividerLine />
                            <View style={styles.textInputContainer}>
                                <Text style={styles.edtDescription}>
                                    Điện thoại liên hệ
                                    <Text style={[styles.edtDescription, { color: COLOR_PRIMARY }]}>
                                        *
                                    </Text>
                                </Text>
                                <TextInput
                                    ref='edtPhoneNumber'
                                    placeholder='Số điện thoại'
                                    placeholderTextColor={COLOR_TEXT_HINT}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    autoCorrect={false}
                                    maxLength= {21}
                                    fontSize={DIMENSION_TEXT_CONTENT}
                                    keyboardType={'phone-pad'}
                                    returnKeyType={'next'}
                                    autoCapitalize={'none'}
                                    onChangeText={this._onPhoneNumberInputChanged}
                                    onSubmitEditing={this._onPhoneNumberSubmitClicked}
                                    value={this.state.phone_number}
                                    style={styles.textInput} />

                            </View>
                            <DividerLine />
                            <View style={[styles.textInputContainer, { paddingBottom: 0 }]}>
                                <Text style={styles.edtDescription}>
                                    Email
                                    <Text style={[styles.edtDescription, { color: COLOR_PRIMARY }]}>
                                        *
                                    </Text>
                                </Text>
                                <TextInput
                                    ref='edtEmail'
                                    placeholder='Email'
                                    placeholderTextColor={COLOR_TEXT_HINT}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    autoCorrect={false}
                                    fontSize={DIMENSION_TEXT_CONTENT}
                                    keyboardType={'email-address'}
                                    returnKeyType={'done'}
                                    autoCapitalize={'none'}
                                    maxLength= {50}
                                    onChangeText={this._onEmailInputChanged}
                                    value={this.state.email}
                                    style={styles.textInput} />

                            </View>
                        </View>

                        {/* Body 2*/}
                        <Text style={{
                            fontWeight: 'bold',
                            padding: DIMENSION_PADDING_MEDIUM,
                            marginTop: DIMENSION_PADDING_MEDIUM,
                            color: COLOR_TEXT_BLACK_1
                        }}>
                            CÓ DỊP ĐẶC BIỆT?
                        </Text>

                        <View style={{ backgroundColor: 'white' }}>
                            {
                                booking_table_questions.size > 0 &&
                                booking_table_questions.map((item, i) => {
                                    return (
                                        <View key={i}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        ...this.state,
                                                        question: item
                                                    })
                                                }}
                                                style={{ padding: DIMENSION_PADDING_MEDIUM, flexDirection: 'row', alignItems: 'center' }}>

                                                <JJIcon style={{marginRight: 8}}
                                                        name={this.state.question === item ? "circle_radio_o" : "circle_o"}
                                                        size={14}
                                                        color={this.state.question === item ? COLOR_TEXT_BLACK_1 : COLOR_TEXT_INACTIVE} />
                                                <Text style={{ color: this.state.question === item ? COLOR_TEXT_BLACK_1 : COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                            {
                                                i < booking_table_questions.size - 1 &&
                                                <DividerLine style={{ marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM }} />
                                            }

                                        </View>
                                    )
                                })
                            }
                        </View>

                        {/* Footer */}
                        <Text style={{
                            fontWeight: 'bold',
                            padding: DIMENSION_PADDING_MEDIUM,
                            marginTop: DIMENSION_PADDING_MEDIUM,
                            color: COLOR_TEXT_BLACK_1
                        }}>
                            THÔNG TIN THÊM
                        </Text>

                        <TextInput
                            style={{
                                backgroundColor: 'white',
                                textAlignVertical: "top",
                                height: 120,
                                borderColor: COLOR_LINE,
                                borderWidth: 1,
                                borderRadius: DIMENSION_RADIUS_LARGE,
                                padding: DIMENSION_PADDING_MEDIUM,
                                marginLeft: DIMENSION_PADDING_MEDIUM,
                                marginRight: DIMENSION_PADDING_MEDIUM,
                                marginBottom: DIMENSION_PADDING_MEDIUM,
                                fontSize: DIMENSION_TEXT_CONTENT
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    ...this.state,
                                    other: text,
                                })
                            }}
                            onFocus={() => {
                                this.refs.scrollView.scrollToEnd({ animated: true });
                            }}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            placeholderTextColor={COLOR_TEXT_HINT}
                            placeholder={`Hãy cho JAMJA biết nếu bạn có yêu cầu đặc biệt nào đó. JAMJA sẽ thay mặt bạn chuyển lời tới ${deal.getIn(['brand', 'brand_name'], '')}`}
                            value={this.state.other}
                        />

                    </ScrollView>
                    <View style={styles.useCodeBackground}>
                        <TouchableOpacity style={[styles.useCodeButton, { backgroundColor: enableConfirmButton ? COLOR_PRIMARY : COLOR_GRAY_BG_2 }]}
                            onPress={this._confirmBooking}
                            disabled={!enableConfirmButton}>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: DIMENSION_TEXT_HEADER,
                                fontWeight: 'bold'
                            }}
                                uppercase={true}>
                                GỬI YÊU CẦU ĐẶT CHỖ
                            </Text>
                            <Text style={{
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: DIMENSION_TEXT_SUB
                            }}>
                                JAMJA sẽ thay bạn liên hệ với nhà hàng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ViewWithKeyboard>
                {/* Indicator */}
                <LoadingViewPopup visible={this.state.isBooking}
                    message={'Đang gửi yêu cầu đặt chỗ...'} />
            </Container>
        )
    }

    componentDidMount() {
        super.componentDidMount();

        let { deal, booking } = this.props.navigation.state.params;

        console.debug('deal----', deal.toJS());
        AnalyticsUtil.logCurrentScreen(
            'confirm_booking',
            {
                item_id: deal.getIn(['slug'], ''),
                item_name: deal.getIn(['slug'], ''),
                item_brand: deal.getIn(['brand', 'brand_slug'], ''),
                deal_type: deal.getIn(['deal_type'], ''),
                store_id: booking.getIn(['store', 'id'], ''),
                slot: booking.get('slot', -1),
                time: booking.getIn(['time', 'time'], '')
            });
    }

    _onUserNameInputChanged = (text) => this.setState({ ...this.state, full_name: text });

    _onUserNameInputSubmitClicked = () => this.refs.edtPhoneNumber.focus();

    _onPhoneNumberInputChanged = (text) => this.setState({ ...this.state, phone_number: text.trim() });

    _onPhoneNumberSubmitClicked = () => this.refs.edtEmail.focus();

    _onEmailInputChanged = (text) => this.setState({ ...this.state, email: text.trim() });

    _renderLeftButton = () => {
        return (
            <TouchableOpacity
                style={{
                    height: headerHeight,
                    width: headerHeight,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={this._onBackButtonClicked}>
                <JJIcon
                    style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }}
                    name={'x_o'}
                    color={COLOR_TEXT_BLACK_1}
                    size={16} />
            </TouchableOpacity>
        )
    }

    _renderRightButton = () => {
        return (
            <View style={{ flex: 1, width: headerHeight }} />
        )
    }

    _renderBookingHighlight = (deal, booking) => {

        if (!booking.getIn(['promocode', 'id'])) {
            return (
                <Text style={[styles.textValue, { color: COLOR_PRIMARY }]}>
                    {booking.getIn(['time', 'type']) === 'flash_sale' ? '⚡':''}{booking.getIn(['time', 'highlight'], '')}
                </Text>
            )
        }

        if (PROMOCODE_UPGRADE === booking.getIn(['promocode', 'type_promocode'], '')) {

            const highlight = booking.getIn(['time', 'highlight'], '');
            return (
                <Text style={[styles.textValue, { color: COLOR_PRIMARY }]}>
                    {booking.getIn(['time', 'type']) === 'flash_sale' ? '⚡':''}{highlight + ' & ' + booking.getIn(['promocode', 'description'], '')}
                </Text>
            )
        }

        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ color: COLOR_TEXT_INACTIVE, textDecorationLine: 'line-through', fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}>
                    {booking.getIn(['time', 'type']) === 'flash_sale' ? '⚡':''}{booking.getIn(['time', 'highlight'], '')}
                </Text>
                <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}>
                    {' ' + booking.getIn(['promocode', 'description'], '')}
                </Text>
            </View>
        )
    }

    _confirmBooking = () => {
        console.log('_confirmBooking---------');
        if (!!this.state.isBooking) return;
        this.setState({
            ...this.state,
            full_name: this._formatName(this.state.full_name)
        }, () =>{
            if (this._isReadyToBooking()) {
                Keyboard.dismiss();
                this.setState({ isBooking: true });
                let { deal, booking } = this.props.navigation.state.params;
                const requestParamsObject = {
                    'did': deal.get('id', ''),
                    'store': booking.getIn(['store', 'id'], ''),
                    'slot': booking.get('slot', 0),
                    'check_in_time': moment(booking.getIn(['time', 'time'], '')).unix(),
                    'booking_schedule_id': booking.getIn(['time', 'id'], ''),
                    'user_name': this.state.full_name,
                    'email': this.state.email.trim(),
                    'phone_number': this.state.phone_number,
                    'booking_survey': this.state.question,
                    'booking_note': this.state.other,
                    'booking_source': fetcherConfig.getTrackingConfig().drs,
                    "referral_link": fetcherConfig.getTrackingConfig().acs,
                    'booking_platform': isIOS ? 'App/IOs' : 'App/Android',
                    'booking_platform_version': 'v4'
                };
    
                this._cacheUserInfo();
    
                if (booking.get('promocode')) {
                    requestParamsObject.promocode_id = booking.getIn(['promocode', 'id']);
                }
    
                AnalyticsUtil.logVerifyBooking(
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['deal_type'], ''),
                    {
                        store_id: booking.getIn(['store', 'id'], ''),
                        slot: booking.get('slot', -1),
                        time: booking.getIn(['time', 'time'], ''),
                        avg_billing_value: deal.get('avg_billing_value', 0)
                    }
                );

                AnalyticsUtil.beginCheckOut(
                    deal.getIn(['title'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['cat1'], ''),
                    deal.getIn(['cat2'], ''),
                    deal.getIn(['deal_type'], ''),

                    deal.get('avg_billing_value', 0),
                    booking.get('slot', 0) * deal.get('avg_billing_value', 0),
                    booking.get('slot', 0),
                    booking.getIn(['time', 'time'], ''),
                    booking.getIn(['promocode', 'code_name'], '')
                );
    
                couponApi.confirmBooking(requestParamsObject)
                    .then(response => {
                        console.log('ConfirmBooking:response:', response);
                        this._onBookingComplete(response);
                    })
                    .catch(error => {
                        console.log('ConfirmBooking:error:', error);
                        this._onBookingFailure(error);
                    });
            }
        })
    }

    _cacheUserInfo = () => {
        UserDb.updateUserContactInfo(
            this.state.full_name,
            this.state.phone_number,
            this.state.email
        );
        let currentUser = this.props.user;
        currentUser.contact_info_full_name = this.state.full_name;
        currentUser.contact_info_phone_number = this.state.phone_number;
        currentUser.contact_info_email = this.state.email;

        this.props.dispatch(updateUser(currentUser));
    }

    _onBackButtonClicked = () => {
        let { deal, booking } = this.props.navigation.state.params;
        AnalyticsUtil.logConfirmBookingGoBack(
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['deal_type'], ''),
            {
                store_id: booking.getIn(['store', 'id'], ''),
                slot: booking.get('slot', -1),
                time: booking.getIn(['time', 'time'], ''),
                avg_billing_value: deal.get('avg_billing_value', 0)
            }
        )
        this.props.navigation.goBack();
    }

    _onBookingComplete = (response) => {
        let { deal, booking } = this.props.navigation.state.params;
        this.setState({ isBooking: false });
        response.text()
            .then(result => {
                console.log('_onBookingComplete:response:', result);
                let coupon = JSON.parse(result);
                let couponMap = fromJS(coupon);

                if (!response.status || (response.status < 200 && response.status > 299)) {
                    this._onBookingFailure(coupon);
                    return;
                }
                couponMap = couponMap.updateIn(['deal', 'promocode_applied'], () => couponMap.get('promocode'));
                if (StringUtil.isEmpty(couponMap.getIn(['deal', 'coupon_highlight']))) {
                    couponMap = couponMap.updateIn(['deal', 'coupon_highlight'], () => couponMap.get('coupon_highlight'));
                }

                this.props.dispatch(couponChangeAction(deal.get('id', ''), couponMap));
                CouponDb.add(coupon);

                AnalyticsUtil.logVerifyBookingSuccess(
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['deal_type'], ''),
                    {
                        coupon_id: couponMap.get('id', ''),
                        store_id: booking.getIn(['store', 'id'], ''),
                        slot: booking.get('slot', -1),
                        time: booking.getIn(['time', 'time'], ''),
                        avg_billing_value: deal.get('avg_billing_value', 0)
                    }
                );

                this.props.navigation.navigate(
                    "BookingCountDown",
                    {
                        coupon: couponMap,
                        deal: ObjectUtil.mapCouponToDeal(deal, couponMap),
                        booking: booking
                    }
                )
            })
            .catch(error => {
                this._onBookingFailure('Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!');
                console.log('_onBookingComplete:error:', error);
            })
    }

    _onBookingFailure = (error) => {
        console.log('_onBookingFailure:error:', error);
        this.setState({ isBooking: false });
        let message = 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!';
        if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object') {
            if (error.error_message) message = error.error_message;
            else if (error.error) message = error.error;
            else if (error.errorCode === 401) message = ERROR_AUTH_MESSAGE;
        }

        let { deal, booking } = this.props.navigation.state.params;
        AnalyticsUtil.logVerifyBookingFailure(
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['deal_type'], ''),
            {
                store_id: booking.getIn(['store', 'id'], ''),
                slot: booking.get('slot', -1),
                time: booking.getIn(['time', 'time'], '')
            },
            message
        )

        Alert.alert("Lỗi", message);
    }

    _isReadyToBooking() {

        if (StringUtil.isBlank(this.state.full_name)) {
            Alert.alert("Thiếu thông tin", "Vui lòng nhập họ tên");
            return false
        }
        if (StringUtil.isBlank(this.state.phone_number)) {
            Alert.alert("Thiếu thông tin", "Vui lòng nhập số điện thoại liên hệ");
            return false
        }
        if (StringUtil.isBlank(this.state.email)) {
            Alert.alert("Thiếu thông tin", "Vui lòng nhập địa chỉ email");
            return false
        }
        if(!validatePhoneNumber(this.state.phone_number)){
            Alert.alert("Số điện thoại không hợp lệ", "Vui lòng nhập số điện thoại hợp lệ");
            return false;
        }
        if (!validateEmail(this.state.email)) {
            Alert.alert("Email không hợp lệ", "Vui lòng nhập địa chỉ email hợp lệ");
            return false
        }

        return true;
    }

    _formatName = fullName =>{
        if(StringUtil.isBlank(fullName)) return "";
        return fullName.replace(/\s{2,}|[.]/g, " ");
    }

    _enableConfirmButton = () => {
        return !StringUtil.isBlank(this.state.full_name) &&
            !StringUtil.isBlank(this.state.phone_number) &&
            !StringUtil.isBlank(this.state.email);
    }
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 2
    },
    rowList: {
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        flexDirection: 'row',
    },
    textLabel: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    textValue: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    textInputContainer: {
        paddingTop: DIMENSION_PADDING_SMALL,
    },
    edtDescription: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    textInput: {
        height: 40,
        paddingLeft: 0,
        flex: 1
    },
    useCodeBackground: {
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLOR_LINE
    },
    useCodeButton: {
        width: '100%',
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM
    }
});

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned,
    };
}

export default connect(mapStateToProps)(ConfirmBooking);

