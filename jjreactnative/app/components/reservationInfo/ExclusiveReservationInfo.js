import React from 'react';
import {Spinner, Text} from 'native-base';
import {
    View,
    StyleSheet,
    ScrollView,
    Share,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import {connect} from "react-redux";
import moment from 'moment/min/moment-with-locales';
import {fromJS} from "immutable";
import FastImage from 'react-native-fast-image'

import JJIcon from '../common/JJIcon';
import { strings } from '../../../locates/i18n';
import {COLOR_BLACK, COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../resources/colors'
import DealConditionInfo from './DealConditionInfo'
import RedeemGateway from '../redeemCode/RedeemGateway'
import {couponIsValid} from '../../utils/CouponUtil'
import JJHeader from '../common/JJHeader';
import ReservationMapView from "../common/ReservationMapView";
import {getQRCodeUrl} from '../../utils/Utils'
import {
    DIMENSION_PADDING_EXTRA, DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM,
    DIMENSION_TEXT_HEADER_X
} from "../../resources/dimens";
import {getCouponDetail} from "../../Api";
import ActionsButton from "./ActionsButton";
import {BasePureComponent} from "../common/BasePureComponent";
import {couponApi} from '../../api/coupon-api'
import {ObjectUtil} from '../../utils/object-utils'
import {CommonUtil} from '../../utils/common-utils'
import {AnalyticsUtil} from "../common/analytics/analytics";
import {Toast} from "../common/alert/Toast";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

moment.locale('vi');

class ExclusiveReservationInfo extends BasePureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
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
        const {isLoading, coupon} = this.state;

        let content = null;
        if (coupon !== undefined){
            content = this._renderContent();
        } else if (isLoading) {
            content = this._renderLoading();
        } else {
            content = this._renderErrorFetch();
        }

        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                {/*toolbar*/}
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={false}
                    title={'THÔNG TIN MÃ ƯU ĐÃI'}
                />
                {
                    coupon !== undefined && coupon !== null && coupon.get('deal') &&
                    <RedeemGateway deal={coupon.get('deal')}
                                   navigation={this.props.navigation}
                                   visible={this.state.modalVisible}
                                   onCloseModal={() => this.setState({modalVisible: false})}
                                   onRedeemSuccess={() => this.setState({modalVisible: false})}/>
                }
                {/*body*/}
                {content}
            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this._fetchCouponDetail();
        this.props.navigation.state.params.onAction = this._onAction;
    }

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
    //             <JJIcon name={'share_ios_o'} size={18} color={COLOR_BLACK} />
    //         </TouchableOpacity>
    //     )
    // }

    _renderContent = () => {
        let {coupon} = this.state;
        let status = coupon.get('status', 0);
        let couponInValid = !couponIsValid(status);

        const isFromDealDetail = this.props.navigation.state.params.isFromDealDetail ? this.props.navigation.state.params.isFromDealDetail : false;
        const expireDate = moment.utc(coupon.getIn(['deal', 'start_sale_time'], '')).local().format('HH:mm, DD/MM/YY') + ' - ' + moment.utc(coupon.getIn(['deal', 'end_sale_time'], '')).local().format('HH:mm, DD/MM/YY')

        return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: COLOR_GRAY_BG}}>
                <ScrollView>
                    <ReservationMapView deal={this.state.coupon.get('deal')}
                                        userLat={this.props.latitude}
                                        userLong={this.props.longitude}
                                        navigation={this.props.navigation}/>

                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 16}}>
                        <TouchableOpacity onPress={this._onOpenQRCodePreview}>
                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(coupon.get('code', ''), 144))}
                                style={{height: 72, width: 72}}
                                resizeMode={FastImage.resizeMode.contain}/>
                        </TouchableOpacity>
                        <Text style={{color: '#999999', fontSize: 14}}>
                            Mã khuyến mãi
                        </Text>
                        <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 4}} onPress={this._onCopyClicked}>
                            <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_HEADER_X, fontWeight: 'bold', marginRight: 2}}>
                                {coupon.get('code', '')}
                            </Text>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    size={10}
                                    name={'copy_o'}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor: '#ffffff'}}>
                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>
                                {strings('exclusive_reservation.label_expire_date')}
                            </Text>
                            <Text style={styles.contentValue}>
                                {expireDate}
                            </Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>
                                Ưu đãi
                            </Text>
                            <Text style={[styles.contentValue, {fontWeight: 'bold', color: COLOR_PRIMARY}]}>
                                {coupon.getIn(['deal','highlight_title'], '')}
                            </Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>
                                Khách đặt
                            </Text>
                            <Text style={styles.contentValue}>
                                {coupon.get('user_name', '')}
                            </Text>
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.contentLabel}>
                                Điện thoại liên hệ
                            </Text>
                            <Text style={styles.contentValue}>
                                {coupon.get('phone_number', '')}
                            </Text>
                        </View>
                        <View style={[styles.rowContent, {borderColor: '#ffffff'}]}>
                            <Text style={styles.contentLabel}>
                                Email
                            </Text>
                            <Text style={styles.contentValue}>
                                {coupon.get('email', '')}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.headerLabel}>
                            {strings('exclusive_reservation.header_more_info')}
                        </Text>
                        <Text style={{color: '#dadada', padding: 16, backgroundColor: '#ffffff'}}>
                            {coupon.get('booking_note') ? coupon.get('booking_note', '') : 'Không có dữ liệu'}
                        </Text>
                    </View>

                    <View style={{padding: 16}}>
                        <ActionsButton coupon={coupon}
                                       couponInValid={couponInValid}
                                       navigation={this.props.navigation}
                                       from={'exclusive_reservation_info'}
                                       disableCancelCouponButton={true}/>
                    </View>

                    <DealConditionInfo condition={coupon.getIn(['deal', 'condition'], '')}/>

                    {
                        !isFromDealDetail &&
                        <View style={{
                            flex: 1,
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            paddingBottom: DIMENSION_PADDING_EXTRA,
                            paddingTop: DIMENSION_PADDING_MEDIUM
                        }}>
                            <TouchableOpacity style={styles.buttonRounder}
                                              onPress={() => this._actionDealDetail()}>
                                <Text style={{color: '#999999', fontWeight: 'bold', fontSize: 16}}
                                      uppercase={true}>
                                    chi tiết ưu đãi
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: COLOR_GRAY_BG, width: '100%'}}/>
                </ScrollView>
                {this._renderUseCodeButton(couponInValid)}
            </View>
        )
    };

    _renderUseCodeButton = (couponInValid) => {
        if (couponInValid || !!this.state.networkError) return null;
        return (
            <View style={styles.useCodeBackground}>
                <TouchableOpacity style={styles.useCodeButton} onPress={() => this._actionRedeemCode()}>
                    <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}
                          uppercase={true}>
                        {strings('exclusive_reservation.use_code')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };

    _renderLoading = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_GRAY_BG}}>
                <Spinner color={COLOR_PRIMARY} />
            </View>
        )
    };

    _renderErrorFetch = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_GRAY_BG}}>
                <Text style={{color: '#999999'}}>
                    Không có thông tin
                </Text>
            </View>
        )
    };

    _onCopyClicked = () => {
        Clipboard.setString(this.state.coupon.get('code', ''));
        Toast.showToast('Đã Copy');
    }

    _fetchCouponDetail = () => {
        couponApi.getCouponDetail(this.props.navigation.state.params.couponId)
            .then(response => {
                console.log('getCouponDetail', response);
                return fromJS(response);
            })
            .then(coupon => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    networkError: false,
                    coupon
                }, () => {
                    this._logScreen();
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    networkError: CommonUtil.isNetworkConnectionError(error)
                });
            })
    }

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

    _actionDealDetail = () => {
        let {coupon} = this.state;
        if (!coupon) return;
        this.props.navigation.navigate('DealDetail', { "deal": coupon.get('deal').toJS(), source_deal_detail: 'reservation_info' })
    }

    _actionRedeemCode = () => {
        this.setState({modalVisible: true});

        AnalyticsUtil.logNormalEvent(
            'open_redeem_gateway',
            {
                action_location: 'exclusive_reservation_info',
                action_name: 'click_redeem_button',
                coupon: this.state.coupon.get('id', '')
            },
            'action_coupon'
        )
    }

    _onAction = (action) => {
        if (action === 'refresh') {
            this._fetchCouponDetail();
        }
    }

    _onOpenQRCodePreview = () => {
        let {coupon} = this.state;
        if (!coupon) return;

        this.props.navigation.navigate('QRCodePreview', {qrCode: coupon.get('code', '')});
    }

    _logScreen = () => {
        AnalyticsUtil.logCurrentScreen(
            'exclusive_reservation_info',
            {
                item_id: this.state.coupon.getIn(['deal', 'slug'], ''),
                item_name: this.state.coupon.getIn(['deal', 'slug'], ''),
                item_brand: this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
                deal_type: this.state.coupon.getIn(['deal', 'deal_type'], ''),
                coupon: this.state.coupon.get('id', '')
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.coupon &&
            nextProps.couponDataChange.get('coupon') &&
            this.state.coupon.get('code') === nextProps.couponDataChange.getIn(['coupon', 'code'])) {

            const coupon = nextProps.couponDataChange.get('coupon');

            this.setState({
                ...this.state,
                coupon: this.state.coupon.updateIn(['deal', 'code_status'], () => coupon.get('status'))
                    .updateIn(['status'], () => coupon.get('status'))
            })
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
    headerLabel: {
        padding: 16,
        fontWeight: 'bold',
        color: '#666666',
        fontSize: 14
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
        paddingTop: 4,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ededed'
    },
    useCodeButton: {
        width: '100%',
        backgroundColor: COLOR_PRIMARY,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user,

        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),

        couponDataChange: state.couponDataChangeReducer,
    }
};

export default connect(mapStateToProps)(ExclusiveReservationInfo);