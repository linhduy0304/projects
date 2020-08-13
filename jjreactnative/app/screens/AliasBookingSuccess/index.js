import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import moment from 'moment/min/moment-with-locales';

import {BaseComponent} from "../../common/base/BaseComponent";
import JJStatusBar from "../../components/common/view/JJStatusBar";
import FastImage from "react-native-fast-image";
import JJIcon from '../../common/view/icon/JJIcon';
import {styles, CircleSuccessSize} from './styles';
import Text from '../../common/view/text/JJText';
import {COLOR_BACKGROUND_2, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
} from "../../resources/dimens";
import ButtonStickBottom from '../../common/view/button/ButtonStickBottom';
import BookingInfoDialog from './BookingInfoDialog';
import RedeemByLocation from './RedeemByLocation';
import ToolTipTopCenter from '../../common/view/notice/ToolTipTopCenter';
import {AnalyticsHelper} from '../../common/analytics';

moment.locale('vi');

const SCREEN = 'AliasBookingSuccess';

export default class AliasBookingSuccess extends BaseComponent {

    itemIds = {};

    constructor(props) {
        super(props);
        const {coupon} = props.navigation.state.params;

        if (!!coupon) {
            this.itemIds = {
                item_id: coupon.getIn(['deal', 'slug']),
                item_brand: coupon.getIn(['deal', 'brand', 'brand_slug']),
                item_category: coupon.getIn(['deal', 'deal_type']),
                item_name: coupon.getIn(['deal', 'title'])
            }
        }
    }


    render() {

        const {coupon} = this.props.navigation.state.params;

        return (
            <View style={{flex: 1, backgroundColor: COLOR_BACKGROUND_2}}>

                <JJStatusBar
                    bgColor={'#000'}
                    styleColor={'light'}/>

                <View style={{width: '100%', height: '25%'}}>

                    <FastImage
                        style={{width: '100%', height: '100%'}}
                        source={require('../../resources/images/background/products.png')}
                        resizeMode={FastImage.resizeMode.cover}/>

                    <View style={styles.congratulationTextContainer}>

                        <Text style={{color: 'white', fontSize: 24}}>
                            Chúc mừng bạn,
                        </Text>

                        <Text style={{color: 'white', textAlign: 'center'}}>
                            Yêu cầu đặt chỗ đã được chấp nhận!
                        </Text>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.closeButton}
                        onPress={this._onClosePress}>
                        <JJIcon
                            name={'x_o'}
                            color={'white'}
                            size={14}/>
                    </TouchableOpacity>

                    <View style={styles.circleSuccess}>

                        <FastImage
                            style={{width: CircleSuccessSize, height: CircleSuccessSize}}
                            source={require('../../resources/images/deal/icon_ring_contacting.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <JJIcon
                            name={'check_o'}
                            color={'#4AC731'}
                            size={CircleSuccessSize/2}
                            style={{
                                position: 'absolute'
                            }}/>
                    </View>

                </View>

                <View style={{marginTop: CircleSuccessSize/2 + 8, width: '100%', alignItems: 'center'}}>
                    <Text style={{color: COLOR_TEXT_INACTIVE}}>
                        Mã đặt chỗ
                    </Text>
                    <Text style={{color: COLOR_PRIMARY, fontWeight: 'bold', fontSize: 18, marginBottom: DIMENSION_PADDING_TINY}}>
                        {coupon.get('code', '')}
                    </Text>

                    <View style={{height: 2, width: 75, backgroundColor: COLOR_PRIMARY}}/>
                </View>

                <ToolTipTopCenter
                    message={`Vui lòng đến cửa hàng trong ${this._getTimeBeforeRedeem()} phút trước giờ đặt chỗ và bấm nút "Sử Dụng Mã", hệ thống sẽ hiển thị mã dựa trên vị trí của bạn`}/>

                <View style={{flex: 1, marginBottom: DIMENSION_PADDING_MEDIUM}}>
                    <FastImage
                        style={{width: '100%', height: '100%'}}
                        source={require('../../resources/images/redeem_near_by_store.png')}
                        resizeMode={FastImage.resizeMode.contain}/>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this._onOpenBookingDetail}>
                    <Text style={{color: COLOR_PRIMARY, alignSelf: 'center'}}>
                        Thông tin đặt chỗ <JJIcon name={'chevron_down_o'} color={COLOR_PRIMARY} size={8} style={{marginLeft: 4}}/>
                    </Text>

                    <View style={styles.topRectOfBookingDetail}>
                        <View style={{height: 3, width: 56, borderRadius: 1.5, backgroundColor: '#D8D8D8', margin: DIMENSION_PADDING_SMALL}}/>
                    </View>
                </TouchableOpacity>

                <BookingInfoDialog
                    item={coupon}
                    screen={SCREEN}
                    onClosed={this._onCloseBookingDetailPopup}
                    onRef={this._onBookingDetailDialogRef}/>

                <ButtonStickBottom
                    title={'SỬ DỤNG MÃ'}
                    align={'center'}
                    backgroundColor={COLOR_PRIMARY}
                    textSize={16}
                    containerStyle={{zIndex: 11}}
                    onPress={this._onUseCodePress}/>

                <RedeemByLocation
                    ref={this._onRedeemRef}
                    coupon={coupon}
                    screen={SCREEN}
                    navigation={this.props.navigation}/>
            </View>
        )
    }

    _onClosePress = () => {
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: SCREEN,
                section: 'header'
            },
            'button_close_click',
            'go_back',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );
        this.props.navigation.goBack();
    }

    _onOpenBookingDetail = () => {
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: SCREEN,
                section: 'bottom'
            },
            'button_view_booking_detail_click',
            'open_booking_detail_popup',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );

        !!this.bookingDetailDialog && this.bookingDetailDialog.open();
    }

    _onBookingDetailDialogRef = ref => this.bookingDetailDialog = ref;

    _onRedeemRef = ref => this.redeemRef = ref;

    _getTimeBeforeRedeem = () => {
        const {coupon} = this.props.navigation.state.params;
        if (!coupon) return '';

        return moment.unix(coupon.get('check_in_time')).local().diff(moment.utc(coupon.get('start_redeem_time')).local(), 'minutes');
    }

    _onUseCodePress = () => {
        const {coupon} = this.props.navigation.state.params;

        if (!!this.redeemRef && !!coupon) {
            AnalyticsHelper.trackItemListInteraction(
                {
                    screen_name: SCREEN,
                    section: 'bottom'
                },
                'button_use_code_click',
                'start_redeem_by_location',
                this.itemIds.item_id,
                this.itemIds.item_brand,
                this.itemIds.item_category,
                this.itemIds.item_name
            );

            this.redeemRef.redeem(coupon);
        }
    }

    _onCloseBookingDetailPopup = () => {
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: SCREEN,
                section: 'popup_booking_detail'
            },
            'close_booking_detail_click',
            'close_booking_detail_popup',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );
    }
}