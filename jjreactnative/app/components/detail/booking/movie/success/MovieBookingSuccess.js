import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, BackHandler, ScrollView, Clipboard, Dimensions } from 'react-native';
import { Text, Container } from 'native-base';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { COLOR_PRIMARY, COLOR_GRAY_BG, COLOR_TEXT_INACTIVE, COLOR_LINE, COLOR_TEXT_BLACK_1 } from '../../../../../resources/colors';
import moment from 'moment/min/moment-with-locales';
import LoadingViewPopup from '../../../../../common/view/loading/LoadingViewPopup';
import { getQRCodeUrl } from '../../../../../utils/Utils';
import { DateUtil } from '../../../../../utils/date-utils';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER_X,
    DIMENSION_TEXT_SUB
} from '../../../../../resources/dimens';
import ButtonNormal from '../../../../common/button/ButtonNormal';
import JJIcon from '../../../../common/JJIcon';
import RedeemGateway from '../../../../redeemCode/RedeemGateway';
import { BasePureComponent } from '../../../../common/BasePureComponent';
import { AnalyticsUtil } from '../../../../common/analytics/analytics';
import { Toast } from '../../../../common/alert/Toast';
import JJStatusBar from '../../../../common/view/JJStatusBar';
import { getPaddingTopBar } from '../../../../../utils/common-utils';
import { ObjectUtil } from '../../../../../utils/object-utils';
import { FormInfoViewItem } from '../common';
import { buildImageSource, IMAGE_INTERNET } from '../../../../../utils/image-util';
import RowFormBookingHighlight from '../../../../../common/view/form/RowFormBookingHighlight';
import FromPaymentValue from '../../../../../common/view/form/FromPaymentValue';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const paddingTopBar = getPaddingTopBar();
const topHeight = windowHeight * 0.3;
moment.locale('vi');
import { DealSubject } from '../../../../../common/subject/deal-subject';

class MovieBookingSuccess extends BasePureComponent {
    deal;
    booking;
    order;
    openFrom;

    constructor(props) {
        super(props);

        this.deal = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'deal']);
        this.booking = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'booking']);
        this.order = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'order']);
        this.openFrom = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'from']);
        if(!this.deal.get('check_in_time')) {
            this.deal = this.deal.update('check_in_time', () => this.order.getIn(['coupon', 'check_in_time']))
        }
   
        this.state = {
            modalVisible: false
        };

        if (!isIOS) {
            this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
                BackHandler.addEventListener('hardwareBackPress', this._handlePressBack)
            );
        }
    }

    render() {
        const checkInTime = moment.unix(this.order.getIn(['coupon', 'check_in_time'])).local();

        let latestPrice = this.order.getIn(['total_price'], 0);
        if (this.order.getIn(['price_with_promocode'], 0) > 0) {
            latestPrice = this.order.getIn(['price_with_promocode'], 0);
        }

        let qrCode = this.order.getIn(['coupon', 'code'], '');
        if (!!this.order.getIn(['coupon', 'qr_code'])) {
            qrCode = this.order.getIn(['coupon', 'qr_code'], '');
        }

        return (
            <Container>
                <JJStatusBar bgColor={'#000'} styleColor={'light'} />

                <ScrollView style={styles.scrollContent}>
                    <View style={{ width: windowWidth, height: topHeight }}>
                        <FastImage
                            style={{ width: windowWidth, height: topHeight }}
                            source={require('../../../../../resources/images/deal/bg_contacting.png')}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <Text
                            style={{
                                fontSize: DIMENSION_TEXT_CONTENT,
                                color: 'white',
                                textAlign: 'center',
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                top: paddingTopBar + 12,
                                left: 0,
                                right: 0,
                                padding: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            {`Chúc mừng bạn, ${this.order.getIn(['coupon', 'user_name'], '')}!\nYêu cầu đặt chỗ xem phim đã được chấp nhận!`}
                        </Text>
                    </View>

                    <View style={styles.qrCodeContainerBackground}>
                        <TouchableOpacity onPress={this._onOpenQRCodePreview} style={styles.qrCodeBackground}>
                            <FastImage
                                style={{ width: 124, height: 124 }}
                                source={require('../../../../../resources/images/deal/icon_ring_contacting.png')}
                                resizeMode={FastImage.resizeMode.contain}
                            />

                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(qrCode, 144))}
                                style={{ height: 72, width: 72, position: 'absolute', top: 26, left: 26 }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_SMALL }}>
                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>Mã vào rạp</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 4 }} onPress={this._onCopyClicked}>
                                <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_HEADER_X, fontWeight: 'bold', marginRight: 2 }}>
                                    {this.order.getIn(['coupon', 'code'], '')}
                                </Text>
                                <JJIcon color={COLOR_TEXT_INACTIVE} size={10} name={'copy_o'} />
                            </TouchableOpacity>
                            <View style={{ height: 2, width: 76, backgroundColor: COLOR_PRIMARY }} />
                        </View>

                        <View style={styles.orderInfoLayout}>
                            <FormInfoViewItem
                                leftTitle={'Phim'}
                                rightTitle={this.order.getIn(['bhd_order', 'film_title'], '')}
                                color={COLOR_TEXT_BLACK_1}
                                weight={'bold'}
                            />

                            <FormInfoViewItem
                                leftTitle={'Rạp chiếu'}
                                rightTitle={this.order.getIn(['coupon', 'store', 'address'], '')}
                                color={COLOR_TEXT_BLACK_1}
                                weight={'bold'}
                            />

                            <FormInfoViewItem
                                leftTitle={'Suất chiếu'}
                                rightTitle={`${checkInTime.format('hh:mm A')}, ${DateUtil.formatFullCalendarDate(checkInTime.toDate())}`}
                                color={COLOR_TEXT_BLACK_1}
                                weight={'bold'}
                            />

                            <FormInfoViewItem
                                leftTitle={'Vị trí ghế'}
                                rightTitle={this._getSeatSelected()}
                                color={COLOR_TEXT_BLACK_1}
                                weight={'bold'}
                            />

                            <RowFormBookingHighlight
                                bookingHighlight={this.order.getIn(['coupon', 'coupon_highlight'], '')}
                                promoCodeHighlight={this.order.getIn(['coupon', 'promocode', 'description'])}
                                promoCodeType={this.order.getIn(['coupon', 'promocode', 'type_promocode'])}
                            />

                            <FromPaymentValue
                                style={{
                                    marginTop: DIMENSION_PADDING_MEDIUM
                                }}
                                originalValue={this.order.getIn(['original_price'], 0)}
                                discountValue={this.order.getIn(['total_price'], 0)}
                                promoValue={this.order.getIn(['price_with_promocode'])}
                                promoCode={this.order.getIn(['coupon', 'promocode', 'code_name'])}
                            />
                        </View>

                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_CONTENT
                            }}
                        >
                            Lưu ý: Mã đặt chỗ đã được gửi về mail của bạn. Vui lòng kiểm tra email hoặc xem lại trong{' '}
                            <Text
                                style={{
                                    color: COLOR_TEXT_INACTIVE,
                                    fontSize: DIMENSION_TEXT_CONTENT,
                                    fontWeight: 'bold'
                                }}
                            >
                                Mã khuyến mãi của tôi
                            </Text>{' '}
                            trên ứng dụng.
                        </Text>

                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_SUB,
                                width: '100%',
                                textAlign: 'center',
                                marginTop: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            Để nhận ưu đãi, bấm <Text style={{ color: COLOR_PRIMARY }}>Sử dụng mã</Text> & làm theo hướng dẫn
                        </Text>

                        <ButtonNormal
                            borderColor={COLOR_PRIMARY}
                            fillColor={COLOR_PRIMARY}
                            textColor={'white'}
                            text={'SỬ DỤNG MÃ'}
                            onPress={this._onRedeemCodeClicked}
                            style={{ marginTop: DIMENSION_PADDING_MEDIUM, width: '100%' }}
                        />
                    </View>

                    <View style={{ height: 48 }} />
                </ScrollView>

                <TouchableOpacity
                    onPress={this._onCloseClicked}
                    style={{
                        height: DIMENSION_BUTTON_MEDIUM,
                        width: DIMENSION_BUTTON_MEDIUM,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: paddingTopBar + 24,
                        left: 0
                    }}
                >
                    <JJIcon name={'x_o'} size={16} color={'white'} />
                </TouchableOpacity>

                <RedeemGateway
                    deal={this.deal}
                    navigation={this.props.navigation}
                    visible={this.state.modalVisible}
                    onCloseModal={this._onCloseModal}
                    onRedeemSuccess={this._onRedeemSuccess}
                />

                <LoadingViewPopup visible={this.state.isCanceling} message={'Đang xử lý...'} />
            </Container>
        );
    }

    _getSeatSelected = () => {
        const tickets = this.order.getIn(['bhd_order', 'tickets']);
        if (!tickets || tickets.size < 1) return '';

        return tickets.map(tk => tk.get('SeatData', '')).join(', ') + ` (${this.order.get('count', 0)} ghế)`;
    };

    _onCloseModal = () => this.setState({ modalVisible: false });

    _onRedeemSuccess = () => {
        if (this.openFrom === 'deal_detail') {
            this.props.navigation.pop(4);
        } else {
            this.props.navigation.pop(5);
        }
    };

    _onCloseClicked = () => {
        const paramsTracking = {
            action_location: 'booking_return_code',
            action_name: 'click_close_button',
            item_id: this.deal.getIn(['slug'], ''),
            item_name: this.deal.getIn(['slug'], ''),
            item_brand: this.deal.getIn(['brand', 'brand_slug'], ''),
            deal_type: this.deal.getIn(['deal_type'], ''),
            coupon: this.order.getIn(['coupon', 'id'], '')
        };
        AnalyticsUtil.logNormalEvent('close_booking_return_code', paramsTracking, 'action_coupon');
        this._handlePressBack();
    };

    _handlePressBack = () => {
        //
        const tickets = this.order.getIn(['bhd_order', 'tickets']);
        const coupon = this.order.getIn;
        const data = [];
        tickets.toJS().map(el => {
            data.push(el.SeatData);
        });
        // console.log(this.order.getIn(['coupon', 'check_in_time']));

        const payload = {
            deal_id: this.deal.get('id', ''),
            booking_highlight: this.booking.getIn(['time', 'highlight'], '0k'),
            booking_schedule: this.booking.getIn(['time', 'id'], ''),
            check_in_time: this.order.getIn(['coupon', 'check_in_time']),
            cinema: this.booking.getIn(['store', 'address'], ''),
            cinema_id: this.booking.getIn(['store', 'id'], ''),
            code: this.order.getIn(['coupon', 'code'], ''),
            coupon_id: this.order.getIn(['coupon', 'coupon_id'], ''),
            max_slot: this.booking.getIn(['time', 'slotAvailable'], 0),
            max_slot_per_voucher: this.booking.getIn(['time', 'max_slot_per_voucher'], 1),
            min_slot: this.booking.getIn(['time', 'min_slot'], 1),
            movie_room: this.order.getIn(['bhd_order', 'screen_name'], ''),
            seats: data,
            slot_available: this.booking.getIn(['time', 'slotAvailable'], 0) - this.order.get('count', 0),
            slots: this.order.get('count', 0)
        };
        DealSubject.dispatch('update_ticket', payload);
        if (this.openFrom === 'deal_detail') {
            this.props.navigation.pop(3);
        } else {
            this.props.navigation.pop(4);
        }
        return true;
    };

    _onRedeemCodeClicked = () => {
        this.setState({ modalVisible: true });
        if (this.order) return;
        AnalyticsUtil.logNormalEvent(
            'open_redeem_gateway',
            {
                action_location: 'booking_return_code',
                action_name: 'click_redeem_button',
                coupon: this.order.getIn(['coupon', 'id'], '')
            },
            'action_coupon'
        );
    };

    _onOpenQRCodePreview = () => {
        if (!this.order) return;

        let qrcode = this.order.getIn(['coupon', 'code'], '');
        if (!!this.order.getIn(['coupon', 'qr_code'])) {
            qrcode = this.order.getIn(['coupon', 'qr_code'], '');
        }

        if (qrcode === undefined || qrcode === null) return;

        AnalyticsUtil.logNormalEvent(
            'open_qr_code_preview',
            {
                action_location: 'booking_return_code',
                action_name: 'click_qr_code_image',
                qr: qrcode
            },
            'action_coupon'
        );

        this.props.navigation.navigate('QRCodePreview', { qrCode: qrcode });
    };

    _onCopyClicked = () => {
        Clipboard.setString(this.order.getIn(['coupon', 'code'], ''));
        Toast.showToast('Đã Copy');
    };

    componentDidMount() {
        super.componentDidMount();
        if (!isIOS) {
            this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
                BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack)
            );
        }

        AnalyticsUtil.logCurrentScreen('booking_return_code', {
            item_id: this.deal.getIn(['slug'], ''),
            item_name: this.deal.getIn(['slug'], ''),
            item_brand: this.deal.getIn(['brand', 'brand_slug'], ''),
            deal_type: this.deal.getIn(['deal_type'], ''),
            coupon: this.order.getIn(['coupon', 'id'], '')
        });
    }

    componentWillUnmount() {
        console.log('------ === componentWillUnmount');
        if (!isIOS) {
            BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack);
            this._didFocusSubscription && this._didFocusSubscription.remove();
            this._willBlurSubscription && this._willBlurSubscription.remove();
        }
        super.componentWillUnmount();
    }
}

const styles = StyleSheet.create({
    scrollContent: {
        backgroundColor: COLOR_GRAY_BG,
        flex: 1
    },
    qrCodeBackground: {
        height: 124,
        width: 124,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 62,
        borderWidth: 0.1,
        backgroundColor: COLOR_GRAY_BG
    },
    orderInfoLayout: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        backgroundColor: 'white'
    },
    couponInfo: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_LINE,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textCouponInfoLabel: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT,
        marginLeft: DIMENSION_PADDING_TINY
    },
    textCouponInfoValue: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_CONTENT,
        textAlign: 'right',
        flex: 1,
        fontWeight: 'bold'
    },
    qrCodeContainerBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        marginTop: -124 / 2,
        backgroundColor: 'transparent'
    },
    couponHighlightRed: {
        textAlign: 'right',
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold'
    }
});

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned
    };
}

export default connect(mapStateToProps)(MovieBookingSuccess);
