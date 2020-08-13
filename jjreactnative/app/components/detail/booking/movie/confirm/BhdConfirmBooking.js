import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import {Text} from 'native-base';
import moment from 'moment/min/moment-with-locales';
import {connect} from "react-redux";

import Repository from "./Repository";
import JJHeader from "../../../../common/JJHeader";
import {
    COLOR_GRAY_BG, COLOR_GRAY_BG_2, COLOR_LINE,
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_HINT,
    COLOR_TEXT_INACTIVE
} from "../../../../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_X,
    DIMENSION_TEXT_HEADER_XX,
    DIMENSION_TEXT_SUB,
    DIMENSION_TEXT_UNDER_TINY
} from "../../../../../resources/dimens";
import JJIcon from "../../../../common/JJIcon";
import LoadingViewPopup from "../../../../../common/view/loading/LoadingViewPopup";
import HeaderCountDown from '../HeaderCountDown';
import {FormInfoViewItem} from '../common';
import DividerLine from "../../../../common/DividerLine";
import {ALERT_TITLE_CONFIRM, BHD_NOTICE_CANCEL_ORDER} from "../../../../../utils/text-message";
import {DateUtil} from "../../../../../utils/date-utils";
import PromoCodeInput from './PromoCodeInput';
import RowFormBookingHighlight from '../../../../../common/view/form/RowFormBookingHighlight';
import FromPaymentValue from '../../../../../common/view/form/FromPaymentValue';
import ViewWithKeyboard from '../../../../../common/view/ViewWithKeyboard';

const isIOS = Platform.OS === 'ios';
const headerHeight = isIOS ? 44 : 56;
moment.locale('vi');

class BhdConfirmBooking extends Repository {

    TAG = "BhdConfirmBooking";

    render() {

        return (
            <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG}}>
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
                                    BHD Star Cineplex
                                </Text>
                                <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                                    XÁC NHẬN ĐẶT VÉ
                                </Text>
                            </View>
                        )
                    }}
                    leftItem={this._renderLeftHeader}
                    rightItem={this._renderRightHeader}
                />

                {/* Content */}
                <ViewWithKeyboard
                    style={{flex: 1, backgroundColor: COLOR_GRAY_BG, justifyContent: 'center'}}>
                    <ScrollView
                        style={{flex: 1}}
                        keyboardShouldPersistTaps={'never'}
                        keyboardDismissMode={'none'}>

                        <View>
                            <View style={styles.formSumary}>
                                <FormInfoViewItem
                                    leftTitle={"Phim"}
                                    rightTitle={this.order.getIn(['jamja_order', 'bhd_order', 'film_title'], '')}
                                    color={COLOR_TEXT_BLACK_1}
                                    weight={'bold'}
                                />
                                <FormInfoViewItem
                                    leftTitle={"Rạp chiếu"}
                                    rightTitle={this.order.getIn(['jamja_order', 'coupon', 'store', 'address'], '')}
                                    color={COLOR_TEXT_BLACK_1}
                                    weight={'bold'}
                                />
                                <FormInfoViewItem
                                    leftTitle={"Suất chiếu"}
                                    rightTitle={`${moment.unix(this.order.getIn(['jamja_order', 'coupon', 'check_in_time'])).local().format('hh:mm A')}, ${DateUtil.formatFullDateFromUnix(this.order.getIn(['jamja_order', 'coupon', 'check_in_time']))}`}
                                    color={COLOR_TEXT_BLACK_1}
                                    weight={'bold'}
                                />
                                <FormInfoViewItem
                                    leftTitle={"Vị trí ghế"}
                                    rightTitle={this._getSeatSelected()}
                                    color={COLOR_TEXT_BLACK_1}
                                    weight={'bold'}
                                />
                                <RowFormBookingHighlight
                                    bookingHighlight={this.order.getIn(['jamja_order', 'coupon', 'coupon_highlight'], '')}
                                    promoCodeHighlight={this.state.data.getIn(['promocode', 'description'])}
                                    promoCodeType={this.state.data.getIn(['promocode', 'type_promocode'])}
                                />

                                <FromPaymentValue
                                    style={{marginTop: DIMENSION_PADDING_MEDIUM}}
                                    originalValue={this.order.getIn(['jamja_order', 'original_price'], 0)}
                                    discountValue={this.order.getIn(['jamja_order', 'total_price'], 0)}
                                    promoValue={this.state.draftTotalPrice}
                                    promoCode={this.state.data.getIn(['promocode', 'code_name'])}
                                    promoOffer={this.state.data.getIn(['promocode', 'offer_type'])}/>

                            </View>

                            {/*promocode*/}
                            <PromoCodeInput
                                isLoading={this.state.isLoadingPromoCode}
                                appliedDescription={this.state.data.getIn(['promocode', 'code_name'])}
                                appliedType={this.state.data.getIn(['promocode', 'type_promocode'])}
                                onApplyPressed={this._onApplyPromoCodePressed}
                                onClearPressed={this._onClearPromoCodePressed}
                                onOpenPromoCodeDetailPressed={this._onOpenPromoCodeDetailPressed}/>

                             {/*View User Content*/}
                            <View style={styles.formConfirmInfo}>

                                <Text
                                    style={{
                                        color: COLOR_TEXT_BLACK_1,
                                        marginBottom: DIMENSION_TEXT_UNDER_TINY,
                                        fontWeight: 'bold',
                                        alignSelf: 'center',
                                        fontSize: DIMENSION_TEXT_HEADER_X
                                    }}>
                                    THÔNG TIN NGƯỜI ĐẶT
                                </Text>

                                <Text
                                    style={{
                                        color: COLOR_TEXT_INACTIVE,
                                        marginRight: DIMENSION_PADDING_MEDIUM,
                                        marginLeft: DIMENSION_PADDING_MEDIUM,
                                        fontSize: DIMENSION_TEXT_CONTENT,
                                        marginBottom: DIMENSION_PADDING_SMALL,
                                        textAlign: 'center',
                                        alignSelf: 'center'
                                    }}>
                                    {`Vé phim sẽ được gửi về email & SĐT dưới đây.\nVui lòng kiểm tra trước khi thanh toán.`}
                                </Text>

                                {/*user display name*/}
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.edtDescription}>
                                        Họ và tên
                                        <Text style={[styles.edtDescription, { color: COLOR_PRIMARY }]}>
                                            *
                                        </Text>
                                    </Text>
                                    <TextInput
                                        placeholder='Nhập họ và tên'
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
                                        Email
                                        <Text style={[styles.edtDescription, { color: COLOR_PRIMARY }]}>
                                            *
                                        </Text>
                                    </Text>
                                    <TextInput
                                        ref='edtEmail'
                                        placeholder='Nhập địa chỉ email'
                                        placeholderTextColor={COLOR_TEXT_HINT}
                                        underlineColorAndroid='transparent'
                                        multiline={false}
                                        autoCorrect={false}
                                        fontSize={DIMENSION_TEXT_CONTENT}
                                        maxLength={100}
                                        keyboardType={'email-address'}
                                        returnKeyType={'next'}
                                        autoCapitalize={'none'}
                                        onChangeText={this._onEmailInputChanged}
                                        onSubmitEditing={this._onEmailSubmitClicked}
                                        value={this.state.email}
                                        style={styles.textInput} />

                                </View>
                                <DividerLine />

                                <View style={styles.textInputContainer}>
                                    <Text style={styles.edtDescription}>
                                        Số điện thoại
                                        <Text style={[styles.edtDescription, { color: COLOR_PRIMARY }]}>
                                            *
                                        </Text>
                                    </Text>
                                    <TextInput
                                        ref='edtPhoneNumber'
                                        placeholder='Nhập số điện thoại'
                                        placeholderTextColor={COLOR_TEXT_HINT}
                                        underlineColorAndroid='transparent'
                                        multiline={false}
                                        autoCorrect={false}
                                        fontSize={DIMENSION_TEXT_CONTENT}
                                        maxLength={100}
                                        keyboardType={'phone-pad'}
                                        returnKeyType={'done'}
                                        autoCapitalize={'none'}
                                        onChangeText={this._onPhoneNumberInputChanged}
                                        value={this.state.phone_number}
                                        style={styles.textInput} />

                                </View>
                                <DividerLine />


                                {/* Check box view */}
                                {
                                    (!!this.deal.get('rating') && this.deal.get('rating', '').toLowerCase() !== 'p') &&
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: DIMENSION_PADDING_MEDIUM
                                        }}
                                        onPress={this._onRatingChecked}
                                        activeOpacity={0.8}>

                                        <JJIcon
                                            style={{marginTop: 3}}
                                            name={(this.state.ratingChecked) ? 'check_squareo' : 'square_o'}
                                            size={16}
                                            color={(this.state.ratingChecked) ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE}
                                        />
                                        <Text
                                            style={{
                                                fontSize: DIMENSION_TEXT_SUB,
                                                color: COLOR_TEXT_BLACK_1,
                                                marginLeft: DIMENSION_PADDING_SMALL,
                                                flex: 1
                                            }}>
                                            Tôi xác nhận mua vé cho người {this._getRatingOfAge()} tuổi trở lên & hiểu rằng JAMJA sẽ không hoàn tiền nếu không chứng thực được độ tuổi của khán giả. Tham khảo quy định của Bộ Văn Hóa, Thể Thao và Du Lịch.
                                        </Text>

                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.useCodeBackground}>
                        <TouchableOpacity
                            style={[styles.useCodeButton, { backgroundColor: !!this.state.enableConfirmButton ? COLOR_PRIMARY : COLOR_GRAY_BG_2 }]}
                            onPress={this._onPressSubmit}
                            activeOpacity={0.8}>

                            <Text
                                style={{
                                    color: '#ffffff',
                                    fontSize: DIMENSION_TEXT_HEADER,
                                    fontWeight: 'bold'
                                }}
                                uppercase={true}>
                                THANH TOÁN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ViewWithKeyboard>

                <LoadingViewPopup
                    visible={this.state.loading}/>
            </View>
        )
    }

    _renderLeftHeader = () => {
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
                    name={'chevron_left_o'}
                    color={COLOR_TEXT_INACTIVE}
                    size={16} />
            </TouchableOpacity>
        )
    }

    _renderRightHeader = () => {
        if (!!this.state.stopCountDown) return null;
        return (
            <HeaderCountDown
                time={this.state.time}
                onTimeOut={this._onTimeOutHolding}/>
        )
    }

    _onBackButtonClicked = () => {
        Alert.alert(
            ALERT_TITLE_CONFIRM,
            BHD_NOTICE_CANCEL_ORDER,
            [
                {
                    text: 'Không',
                    onPress: () => console.log('_onBackButtonClicked:no')
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        this.setState({
                            ...this.state,
                            loading: true
                        }, this._fetchCancelOrder);
                    }
                }
            ],
            {cancelable: false}
        );
    }

    _onRatingChecked = () => {
        this.setState({
            ...this.state,
            ratingChecked: !this.state.ratingChecked
        });
    }

    _getRatingOfAge = () => {
        const rating = !!this.deal ? this.deal.get('rating', '') : '';

        return rating.length > 1 ? rating.substring(1, rating.length) : '';
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned,
    };
}

export default connect(mapStateToProps)(BhdConfirmBooking);

const styles = StyleSheet.create({
    formSumary: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        backgroundColor: 'white',
    },
    formConfirmInfo: {
        marginTop: DIMENSION_TEXT_HEADER_XX,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        backgroundColor: 'white',
        padding: DIMENSION_PADDING_MEDIUM
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