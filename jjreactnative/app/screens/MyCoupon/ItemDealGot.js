import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import moment from 'moment/min/moment-with-locales';
import FastImage from 'react-native-fast-image';
import {
    DEAL_TYPE_LAST_MIN,
    DEAL_TYPE_EXCLUSIVE,
    STATUS_REJECTED,
    STATUS_USER_CANCEL,
    STATUS_MERCHANT_CANCEL,
    STATUS_MERCHANT_REJECT,
    STATUS_EXPIRED,
    STATUS_REDEEMED,
    REDEEMED,
    CANCEL,
    EXPIRED,
    DEAL_TYPE_MOVIE
} from '../../const';
import {styles} from './styles';
import { getDayOfWeekAsViString } from '../../utils/DateUtil';
import { StringUtil } from '../../utils/string-util';
import { buildImageSource, IMAGE_INTERNET } from '../../utils/image-util';
import BookingHighlight from '../../common/view/highlight/BookingHighlight';
import { BaseComponent } from '../../common/base/BaseComponent';
import JJIcon from '../../common/view/icon/JJIcon';
import { getQRCodeUrl } from '../../utils/Utils';

moment.locale('vi');

export default class ItemDealGot extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = this._getState(props);
    }

    render() {
        const { coupon } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.content} onPress={this._openDealInfo} activeOpacity={0.8}>
                    <View style={{ height: 128, width: 124 }}>
                        <FastImage
                            style={styles.image}
                            source={buildImageSource(
                                IMAGE_INTERNET,
                                StringUtil.addSizeToImageUrl(coupon.getIn(['deal', 'images', 0, 'thumbnail'], ''), 124, 128)
                            )}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View
                            style={[
                                styles.backgroundHighlight,
                                { backgroundColor: this.state.isExclusiveDeal ? 'rgba(231,57,72,0.8)' : 'rgba(0,0,0,0.8)' }
                            ]}
                        >
                            <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>{this.state.code}</Text>
                        </View>
                        <View style={styles.qrCode}>
                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(!!this.state.code ? this.state.code : '', 144))}
                                style={{ height: 40, width: 40 }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.brandName} numberOfLines={1}>
                            {coupon.getIn(['deal', 'brand', 'brand_name'], '')}
                        </Text>
                        <BookingHighlight
                            bookingHighlight={coupon.get('coupon_highlight', coupon.getIn(['deal', 'highlight_title'], ''))}
                            promoCodeHighlight={coupon.getIn(['promocode', 'description'])}
                            promoCodeType={coupon.getIn(['promocode', 'type_promocode'])}
                        />

                        <Svg height={1} width={'100%'} viewBox={'0 0 228 1'} style={{ marginTop: 4, marginBottom: 2 }}>
                            <Line x1="0" y1="0" x2="4" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="8" y1="0" x2="12" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="16" y1="0" x2="20" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="24" y1="0" x2="28" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="32" y1="0" x2="36" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="40" y1="0" x2="44" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="48" y1="0" x2="52" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="56" y1="0" x2="60" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="64" y1="0" x2="68" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="72" y1="0" x2="76" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="80" y1="0" x2="84" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="88" y1="0" x2="92" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="96" y1="0" x2="100" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="104" y1="0" x2="108" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="112" y1="0" x2="116" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="120" y1="0" x2="124" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="128" y1="0" x2="132" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="136" y1="0" x2="140" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="144" y1="0" x2="148" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="152" y1="0" x2="156" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="160" y1="0" x2="164" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="168" y1="0" x2="172" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="176" y1="0" x2="180" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="184" y1="0" x2="188" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="192" y1="0" x2="196" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="200" y1="0" x2="204" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="208" y1="0" x2="212" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="216" y1="0" x2="220" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                            <Line x1="224" y1="0" x2="228" y2="0" stroke="#e0e0e0" strokeWidth="1" />
                        </Svg>
                        {this.state.isExclusiveDeal && <Text style={styles.textTime}>{this.state.textDealTimeLabel}</Text>}
                        <Text style={{ fontSize: 14, color: '#999999', lineHeight: 16 }}>
                            {!this.state.isExclusiveDeal && (
                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#999999', lineHeight: 16 }}>
                                    {this.state.textDealTimeLabel}
                                </Text>
                            )}
                            {this.state.dealTimeInfo}
                        </Text>

                        <View style={styles.statusLayout}>
                            {this.state.dealStatus < 0 && <Text style={styles.txtDealStatus}>Chưa đổi</Text>}
                            {this.state.dealStatus >= 0 && (
                                <Text style={[styles.dealStatusInfo, { backgroundColor: this.state.dealStatusBackgroundColor }]}>
                                    {this.state.dealStatusInfo}
                                </Text>
                            )}
                            {!!coupon.get('shipping_order_id') && (
                                <FastImage
                                    source={require('../../resources/images/delivery/ic_delivery.png')}
                                    style={{ width: 38, height: 17 }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            )}
                        </View>
                        <JJIcon name={'chevron_right_o'} color={'#bababa'} size={8} style={{ position: 'absolute', top: 18, right: 16 }} />
                    </View>
                </TouchableOpacity>
                <Svg height={129} width={15} viewBox={'0 0 15 221'} style={{ position: 'absolute', left: 130, top: 0 }}>
                    <Path d="m1 0c0 3.314 2.686 6 6 6c3.314 0 6 -2.686 6 -6c-3.065 0 -8.444 0 -12 0z" fill={'#fafafa'} stroke={'#ededed'} />
                    <Path
                        d="m7 17c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 39c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 62c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 84c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 106c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 128c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 151c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 173c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path
                        d="m7 195c3.314 0 6 2.686 6 6c0 3.314 -2.686 6 -6 6c-3.314 0 -6 -2.686 -6 -6c0 -3.314 2.686 -6 6 -6z"
                        fill={'#fafafa'}
                        stroke={'#ededed'}
                    />
                    <Path d="m13 224c0 -3.314 -2.686 -6 -6 -6c-3.314 0 -6 2.686 -6 6c3.103 0 9.074 0 12 0z" fill={'#fafafa'} stroke={'#ededed'} />
                </Svg>
                <FastImage source={this.state.imageRenderPath} style={styles.imageRender} resizeMode={FastImage.resizeMode.cover} />
            </View>
        );
    }

    _openDealInfo = () => {
        const dealType = this.props.coupon.getIn(['deal', 'deal_type']);

        if (dealType === DEAL_TYPE_EXCLUSIVE) {
            this.props.navigation.push('ExclusiveReservationInfo', { couponId: this.props.coupon.get('id'), coupon: this.props.coupon });
        } else if (dealType === DEAL_TYPE_LAST_MIN) {
            this.props.navigation.push('LastMinReservationInfo', { couponId: this.props.coupon.get('id'), coupon: this.props.coupon });
        } else if (dealType === DEAL_TYPE_MOVIE) {
            this.props.navigation.push('MovieReservationInfo', { couponId: this.props.coupon.get('id'), coupon: this.props.coupon });
        }
    };

    _getDealInfoOfLastMinDeal = coupon => {
        let hintText = coupon.getIn(['deal', 'hint_text'], '');

        if (hintText !== undefined && hintText !== null && hintText.toLowerCase().indexOf('số') >= 0) {
            hintText = hintText.substring(2, hintText.length);
            hintText = hintText.toUpperCase();
            hintText = hintText.trim();
        }

        let checkInTime = coupon.get('check_in_time');
        if (checkInTime === undefined || checkInTime === null) {
            checkInTime = coupon.getIn(['deal', 'check_in_time']);
        }

        let checkInDate = moment.unix(checkInTime).local();

        let dealTimeInfo = coupon.get('slot_count', 0);
        dealTimeInfo += ' ' + hintText;
        dealTimeInfo += ', lúc ' + checkInDate.format('HH:mm');
        dealTimeInfo += ', ' + getDayOfWeekAsViString(checkInDate);
        dealTimeInfo += ', ' + checkInDate.format('DD/MM/YYYY');

        return dealTimeInfo;
    };

    _getDealStatus = dealGot => {
        let status = dealGot.get('status');
        if (status === STATUS_REJECTED || status === STATUS_USER_CANCEL || status === STATUS_MERCHANT_CANCEL || status === STATUS_MERCHANT_REJECT) {
            return CANCEL;
        }
        if (status === STATUS_EXPIRED) return EXPIRED;
        if (status === STATUS_REDEEMED) return REDEEMED;
        return -1;
    };

    _getState = props => {
        let { coupon } = props;
        if (!coupon || !coupon.get('deal')) return {};
        let code = coupon.get('code');
        if (StringUtil.isBlank(code)) {
            code = coupon.getIn(['deal', 'code'], '');
        }

        let textDealTimeLabel = '';
        let dealTimeInfo = '';
        let isExclusiveDeal = true;

        const dealType = coupon.getIn(['deal', 'deal_type']);

        if (dealType === DEAL_TYPE_EXCLUSIVE) {
            textDealTimeLabel = 'Hạn dùng: ';
            dealTimeInfo = moment
                .utc(coupon.getIn(['deal', 'start_sale_time']))
                .local()
                .format('HH:mm, DD/MM/YYYY');
            dealTimeInfo += ' - ';
            dealTimeInfo += moment
                .utc(coupon.getIn(['deal', 'end_sale_time']))
                .local()
                .format('HH:mm, DD/MM/YYYY');
        } else if (dealType === DEAL_TYPE_LAST_MIN) {
            isExclusiveDeal = false;
            textDealTimeLabel = 'Đặt chỗ: ';
            dealTimeInfo = this._getDealInfoOfLastMinDeal(coupon);
        } else if (dealType === DEAL_TYPE_MOVIE) {
            isExclusiveDeal = false;
            textDealTimeLabel = 'Đặt chỗ: ';
            dealTimeInfo = this._getDealInfoOfLastMinDeal(coupon);
        }

        let dealStatusBackgroundColor = '#ffffff';
        let dealStatusInfo = null;
        let imageRenderPath = null;
        const dealStatus = this._getDealStatus(coupon);
        switch (dealStatus) {
            case CANCEL:
                dealStatusInfo = 'Đã hủy';
                dealStatusBackgroundColor = '#e73a4b';
                break;
            case EXPIRED:
                dealStatusInfo = 'Hết hạn';
                dealStatusBackgroundColor = '#9b9b9b';
                break;
            case REDEEMED:
                dealStatusInfo = 'Đã đổi';
                dealStatusBackgroundColor = '#4bc731';
                imageRenderPath = require('../../resources/images/ic_rend_deal.png');
                break;
            default:
                dealStatusInfo = 'Chưa đổi';
                dealStatusBackgroundColor = 'transparent';
        }

        return {
            dealStatusInfo,
            dealStatusBackgroundColor,
            imageRenderPath,
            isExclusiveDeal,
            textDealTimeLabel,
            dealTimeInfo,
            code,
            dealStatus
        };
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.coupon !== undefined && this.props.coupon === undefined) return true;
        if (nextProps.coupon === undefined || this.props.coupon === undefined) return false;
        if (!nextProps.coupon.equals(this.props.coupon)) return true;
        if (nextProps.coupon.get('id') !== this.props.coupon.get('id')) return true;
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this._getState(nextProps));
    }
}

ItemDealGot.propTypes = {
    coupon: PropTypes.object,
    navigation: PropTypes.object
};
