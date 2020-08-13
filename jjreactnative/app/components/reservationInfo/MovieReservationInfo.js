import React from 'react';
import { Spinner, Text } from 'native-base';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity, Clipboard
} from 'react-native';
import {connect} from "react-redux";
import moment from 'moment/min/moment-with-locales';
import { fromJS } from 'immutable';
import FastImage from 'react-native-fast-image';

import JJIcon from '../common/JJIcon';
import {strings} from '../../../locates/i18n';
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../resources/colors'
import DealConditionInfo from './DealConditionInfo'
import RedeemGateway from '../redeemCode/RedeemGateway'
import {couponIsValid} from '../../utils/CouponUtil'
import {getQRCodeUrl} from "../../utils/Utils";
import ReservationMapView from "../common/ReservationMapView";
import JJHeader from '../common/JJHeader';
import QRCodePreview from '../common/qrcode/QRCodePreview';
import { DIMENSION_PADDING_EXTRA, DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_HEADER_X } from '../../resources/dimens';
import LoadingViewPopup from '../../common/view/loading/LoadingViewPopup';
import { couponApi } from '../../api/coupon-api';
import { BasePureComponent } from '../common/BasePureComponent';
import { DateUtil } from '../../utils/date-utils';
import { ObjectUtil } from '../../utils/object-utils';
import { CommonUtil } from '../../utils/common-utils';
import { AnalyticsUtil } from '../common/analytics/analytics';
import { Toast } from '../common/alert/Toast';
import { buildImageSource, IMAGE_INTERNET } from '../../utils/image-util';
import BookingHighlight from '../../common/view/highlight/BookingHighlight';
import FromPaymentValue from '../../common/view/form/FromPaymentValue';
import { STATUS_REDEEMED, EXPIRED } from '../../const';
import ReservationHotLine from '../../common/view/notice/ReservationHotLine';

moment.locale('vi');

class MovieReservationInfo extends BasePureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            canceling: false,
            isLoading: true,
            coupon: undefined,
            modalVisible: false,
            networkError: false
        };

        const coupon = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'coupon']);
        if (!!coupon) {
            this.state.coupon = fromJS(coupon);
        }
    }

    render() {
        const { isLoading, coupon } = this.state;
        let content = null;

        if (coupon !== undefined) {
            content = this._renderContent();
        } else if (isLoading) {
            content = this._renderLoading();
        } else {
            content = this._renderErrorFetch();
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                {/*toolbar*/}
                <JJHeader navigation={this.props.navigation} showSearchBar={false} title={'THÔNG TIN ĐẶT CHỖ'} />
                {coupon !== undefined && coupon !== null && coupon.get('deal') && (
                    <RedeemGateway
                        deal={coupon.get('deal')}
                        navigation={this.props.navigation}
                        visible={this.state.modalVisible}
                        onCloseModal={() => this.setState({ modalVisible: false })}
                        onRedeemSuccess={() => this.setState({ modalVisible: false })}
                    />
                )}
                {/*body*/}
                {content}
                <LoadingViewPopup visible={this.state.canceling} message={'Đang xử lý...'} />
            </View>
        );
    }

    _renderLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_GRAY_BG }}>
                <Spinner color={COLOR_PRIMARY} />
            </View>
        );
    };

    _renderErrorFetch = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_GRAY_BG }}>
                <Text style={{ color: '#999999' }}>Không có thông tin</Text>
            </View>
        );
    };

    getAvaliable = () => {
        let { coupon } = this.state;
        if (moment().unix() < coupon.get('check_in_time', 0) && coupon.getIn(['deal', 'slot_available'], 0) > 0 && !!coupon.getIn(['deal', 'booking_schedule_id'])) {
            return true;
        }

        return false;
    };

    _renderBookMoreTicketButton = () => {
        const { coupon } = this.state;
        const status = coupon.get('status', 0);
        const couponInvalid = !couponIsValid(status);

        if (couponInvalid === true) {
            return null;
        }
        return (
            <View style={styles.useCodeBackground}>
                <TouchableOpacity
                    style={[styles.useCodeButton, { opacity: this.getAvaliable() ? 1 : 0.5 }]}
                    onPress={this._actionBookMoreTicket}
                    disabled={!this.getAvaliable()}
                >
                    <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} uppercase={true}>
                        Đặt thêm vé
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    _renderRedeemStatus = () => {
        let { coupon } = this.state;
        let status = coupon.get('status', 0);
        if (status === STATUS_REDEEMED) {
            return (
                <View style={styles.dealStatusInfo}>
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Đã đổi</Text>
                </View>
            );
        } else if(status === EXPIRED) {
            return (
                <View style={styles.dealStatusInfo}>
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Mã ưu đãi đã hết hạn</Text>
                </View>
            );
        }
    };

    _renderReservationHotLine = () => {
        let { coupon } = this.state;
        let status = coupon.get('status', 0);
        if(status !== EXPIRED) {
            return <ReservationHotLine/>
        }
    }

    _renderContent = () => {
        let { coupon } = this.state;
        let status = coupon.get('status', 0);
        let couponInValid = !couponIsValid(status);

        const isFromDealDetail = this.props.navigation.state.params.isFromDealDetail ? this.props.navigation.state.params.isFromDealDetail : false;

        const tickets = coupon.getIn(['seats', 'Tickets'], []);

        let qrCode = coupon.get('code', '');
        if (!!coupon.get('qr_code')) {
            qrCode = coupon.get('qr_code', '');
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLOR_GRAY_BG }}>
                <ScrollView>
                    <ReservationMapView
                        deal={coupon.get('deal')}
                        userLat={this.props.latitude}
                        userLong={this.props.longitude}
                        navigation={this.props.navigation}
                    />

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: DIMENSION_PADDING_MEDIUM
                        }}
                    >
                        <TouchableOpacity onPress={this._onOpenQRCodePreview}>
                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(qrCode, 144))}
                                style={{ height: 72, width: 72 }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>

                        <Text style={{ color: '#999999', fontSize: 14 }}>Mã vào rạp</Text>

                        <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 4 }} onPress={this._onCopyClicked}>
                            <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_HEADER_X, fontWeight: 'bold', marginRight: 2 }}>
                                {coupon.get('code', '')}
                            </Text>
                            <JJIcon color={COLOR_TEXT_INACTIVE} size={10} name={'copy_o'} />
                        </TouchableOpacity>

                        {this._renderBookMoreTicketButton()}
                    </View>

                    {this._renderReservationHotLine()}


                    <View style={{backgroundColor: '#ffffff'}}>
                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Phim</Text>
                            <Text style={styles.contentValue}>{coupon.getIn(['deal', 'film_name'], '')}</Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Suất chiếu</Text>
                            <Text style={styles.contentValue}>
                                <Text style={{ color: COLOR_PRIMARY }}>
                                    {moment
                                        .unix(coupon.get('check_in_time', 0))
                                        .local()
                                        .format('hh:mm A')}
                                </Text>
                                {', ' + DateUtil.formatFullDateFromUnix(coupon.get('check_in_time', 0))}
                            </Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Vị trí ghế</Text>
                            <Text style={styles.contentValue}>
                                {tickets.map(s => s.get('SeatData', '')).join(', ') + `(${coupon.get('slot_count', 0)} ghế)`}
                            </Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Ưu đãi</Text>
                            <BookingHighlight
                                style={{
                                    flex: 1
                                }}
                                textAlign={'right'}
                                viewAlign={'flex-end'}
                                promoCodeType={coupon.getIn(['promocode', 'type_promocode'])}
                                promoCodeHighlight={coupon.getIn(['promocode', 'description'])}
                                bookingHighlight={coupon.get('coupon_highlight', '')}
                            />
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Khách đặt</Text>
                            <Text style={styles.contentValue}>{coupon.get('user_name', '')}</Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Điện thoại liên hệ</Text>
                            <Text style={styles.contentValue}>{coupon.get('phone_number', '')}</Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>Email</Text>
                            <Text style={styles.contentValue}>{coupon.get('email', '')}</Text>
                        </View>

                        <FromPaymentValue
                            style={styles.paymentValue}
                            originalValue={coupon.get('original_price', 0)}
                            discountValue={coupon.get('total_price', 0)}
                            promoValue={coupon.get('price_with_promocode')}
                            promoCode={coupon.getIn(['promocode', 'code_name'])}
                        />
                    </View>

                    {this._renderRedeemStatus()}

                    <View style={{ marginTop: DIMENSION_PADDING_LARGE }} />

                    <DealConditionInfo condition={coupon.getIn(['deal', 'condition'], '')} />

                    {!isFromDealDetail && (
                        <View
                            style={{
                                flex: 1,
                                padding: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            <TouchableOpacity style={styles.buttonRounder} onPress={() => this._actionDealDetail()}>
                                <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 16 }} uppercase={true}>
                                    {strings('last_min_reservation.deal_detail')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {this._renderUseCodeButton(couponInValid)}

                    <View style={{ height: DIMENSION_PADDING_EXTRA }} />
                </ScrollView>
            </View>
        );
    };

    // _renderShareButton = () => {
    //     return (
    //         <TouchableOpacity
    //             onPress={this._actionShare}
    //             style={{
    //                 flex: 1,
    //                 width: '100%',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}>
    //             <JJIcon name={'share_ios_o'} size={18} color={COLOR_BLACK}/>
    //         </TouchableOpacity>
    //     )
    // }

    _renderUseCodeButton = couponInValid => {
        if (couponInValid || !!this.state.networkError) return null;
        return (
            <View
                style={{
                    flex: 1,
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    paddingBottom: DIMENSION_PADDING_EXTRA
                }}
            >
                <TouchableOpacity style={styles.useCodeButton} onPress={() => this._actionRedeemCode()}>
                    <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} uppercase={true}>
                        Sử dụng mã
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    _onCopyClicked = () => {
        Clipboard.setString(this.state.coupon.get('code', ''));
        Toast.showToast('Đã Copy');
    };

    _fetchCouponDetail = () => {
        couponApi
            .getCouponDetail(this.props.navigation.state.params.couponId)
            .then(response => {
                console.log('getCouponDetail', response);
                let coupon = fromJS(response);
                if (coupon.getIn(['promocode', 'id'])) coupon = coupon.updateIn(['deal', 'promocode_applied'], () => coupon.get('promocode'));
                coupon = coupon.updateIn(['deal', 'coupon_highlight'], () => coupon.get('coupon_highlight'));

                return coupon;
            })
            .then(coupon => {
                this.setState(
                    {
                        ...this.state,
                        isLoading: false,
                        networkError: false,
                        coupon
                    },
                    () => {
                        this._logScreen();
                    }
                );
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    networkError: CommonUtil.isNetworkConnectionError(error)
                });
            });
    };

    // _actionShare = () => {
    //     let {coupon} = this.state;
    //     if (!coupon) return;
    //
    //     let content = {
    //         title: coupon.getIn(['deal', 'title'], ''),
    //         message: coupon.getIn(['deal', 'title'], '') + ' - ' + coupon.getIn(['deal', 'share_url'], ''),
    //         url: coupon.getIn(['deal', 'share_url'], '')
    //     };
    //     let options = {
    //         dialogTitle: 'Chia sẻ ưu đãi với mọi người',
    //         subject: 'Chia sẻ ưu đãi với mọi người'
    //     };
    //     Share.share(content, options).then(success => {
    //         console.log(success);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }
    _actionBookMoreTicket = () => {
        const { coupon } = this.state;
        const date = new Date(coupon.get('check_in_time') * 1000);
        const booking = {
            slot: 1,

            date: date,
            store: {
                id: coupon.getIn(['store', 'id']),
                address: coupon.getIn(['store', 'address'])
            },
            time: {
                highlight: coupon.get('coupon_highlight'),
                id: coupon.getIn(['deal', 'booking_schedule_id']),
                min_slot: coupon.getIn(['deal', 'min_slot']),
                max_slot_per_voucher: coupon.getIn(['deal', 'max_slot_per_voucher']),
                slotAvailable: coupon.getIn(['deal', 'slot_available']),
                time: date
            }
        };
        this.props.navigation.navigate('MovieRoom', {
            deal: coupon.get('deal'),
            booking: fromJS(booking)
        });
    };

    _actionRedeemCode = () => {
        this.setState({ modalVisible: true });

        AnalyticsUtil.logNormalEvent(
            'open_redeem_gateway',
            {
                action_location: 'last_min_reservation_info',
                action_name: 'click_redeem_button',
                coupon: this.state.coupon.get('id', '')
            },
            'action_coupon'
        );
    };

    _actionDealDetail = () => {
        let { coupon } = this.state;
        if (!coupon) return;
        this.props.navigation.navigate('DealDetail', { deal: coupon.get('deal').toJS(), source_deal_detail: 'reservation_info' });
    };

    _onOpenQRCodePreview = () => {
        let { coupon } = this.state;
        if (!coupon) return;

        let qrCode = coupon.get('code', '');
        if (!!coupon.get('qr_code')) {
            qrCode = coupon.get('qr_code', '');
        }

        this.props.navigation.navigate('QRCodePreview', { qrCode: qrCode });
    };

    _logScreen = () => {
        AnalyticsUtil.logCurrentScreen('last_min_reservation_info', {
            item_id: this.state.coupon.getIn(['deal', 'slug'], ''),
            item_name: this.state.coupon.getIn(['deal', 'slug'], ''),
            item_brand: this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
            deal_type: this.state.coupon.getIn(['deal', 'deal_type'], ''),
            coupon: this.state.coupon.get('id', '')
        });
    };

    _onAction = action => {
        if (action === 'refresh') {
            this._fetchCouponDetail();
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this._fetchCouponDetail();
        this.props.navigation.state.params.onAction = this._onAction;
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.state.coupon &&
            nextProps.couponDataChange.get('coupon') &&
            this.state.coupon.get('code') === nextProps.couponDataChange.getIn(['coupon', 'code'])
        ) {
            const coupon = nextProps.couponDataChange.get('coupon');

            this.setState({
                ...this.state,
                coupon: this.state.coupon
                    .updateIn(['deal', 'code_status'], () => coupon.get('status'))
                    .updateIn(['status'], () => coupon.get('status'))
            });
        }
    }
}

const styles = StyleSheet.create({
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderColor: COLOR_LINE,
        paddingTop: 16,
        paddingBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },
    contentLabel: {
        color: '#999999'
    },
    contentValue: {
        flex: 1,
        textAlign: 'right',
        color: '#454545'
    },
    couponHighlightRed: {
        textAlign: 'right',
        color: COLOR_PRIMARY,
        fontSize: 14,
        fontWeight: 'bold'
    },
    headerLabel: {
        padding: 16,
        fontWeight: 'bold',
        color: '#666666',
        fontSize: 14
    },
    rowBookingSurvey: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopWidth: 0.5,
        borderColor: COLOR_LINE,
        paddingTop: 16,
        paddingBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },
    buttonAlarm: {
        width: '100%',
        height: 48,
        borderWidth: 0.5,
        borderColor: '#ededed',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRounder: {
        height: 48,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4
    },
    useCodeBackground: {
        paddingTop: 24,

        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    useCodeButton: {
        width: '100%',
        backgroundColor: COLOR_PRIMARY,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    paymentValue: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM
    },
    dealStatusInfo: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ededed',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // color: '#ffffff',
        // width: '100%',
        backgroundColor: '#c2c2c2',
        marginHorizontal: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_MEDIUM
    }
});

const mapStateToProps = state => {
    return {
        user: state.loginReducer.user,

        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),

        couponDataChange: state.couponDataChangeReducer
    };
};

export default connect(mapStateToProps)(MovieReservationInfo);
