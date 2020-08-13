import React from 'react';
import { Text } from 'native-base';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';

import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from '../../../../../resources/dimens';
import { COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE } from '../../../../../resources/colors';
import JJIcon from '../../../../common/JJIcon';
import { DateUtil } from '../../../../../utils/date-utils';
import { BaseComponent } from '../../../../common/BaseComponent';
import PromoCodeInput from './PromoCodeInput';
import { DEAL_TYPE_MOVIE, ERROR_NORMAL } from '../../../../../const';
import DividerLine from '../../../../common/DividerLine';
import StoreSelectBox from './StoreSelectBox';
import SlotSelectBox from './SlotSelectBox';
import DateSelectBox from './DateSelectBox';
import TimeListSelectBox from './TimeListSelectBox';
import { TimeBaseStatus } from '../../repo/BookingRepo';
import FlashSaleBooking from './FlashSaleBooking';

moment.locale('vi');

const HeightOfTimeBase = 56;

export default class TimebaseBooking extends BaseComponent {
    constructor() {
        super();
        this.state = {
            promoCodeInput: undefined
        };
    }

    render() {
        if (!this.props.deal || !this.props.timebaseBooking) return null;

        if (this.props.deal.get('stores') === undefined || this.props.deal.get('stores').size < 1) {
            return this._renderLocationNotSupport();
        }

        const ctaStatus = this.props.timebaseBooking.get('status');

        if (ctaStatus === TimeBaseStatus.NOT_GO_LIVE) {
            return this._renderDealIsNotGoLive();
        }

        return (
            <View style={[styles.container, { marginTop: this.props.deal.getIn(['promocode', 'id']) ? 0 : DIMENSION_PADDING_LARGE }]}>
                {this._renderStoreAndSlot()}

                {ctaStatus !== TimeBaseStatus.UNKNOWN_ERROR && (
                    <DateSelectBox
                        onPressed={this._showDatePicker}
                        timebaseBooking={this.props.timebaseBooking}
                        onClosePopoverChangeDateButton={this._onClosePopoverChangeDateButton}
                    />
                )}

                {ctaStatus !== TimeBaseStatus.UNKNOWN_ERROR && ctaStatus !== TimeBaseStatus.NOT_VALID && (
                    <TimeListSelectBox
                        timebaseBooking={this.props.timebaseBooking}
                        dealType={this.props.deal.get('deal_type')}
                        onSelected={this._onTimePickerItemClicked}
                        onOpenDatePickerPressed={this._showDatePicker}
                    />
                )}

                {this._renderUnknownError()}

                {!!this.props.flashSale && (
                    <FlashSaleBooking
                        flashSale={this.props.flashSale}
                        slotUnit={this.props.deal.get('hint_text')}
                        timeSelected={this.props.timebaseBooking.getIn(['selected', 'time'])}
                        dateSelected={this.props.timebaseBooking.getIn(['selected', 'date'])}
                        hasNormalBookingTime={
                            !!this.props.timebaseBooking.getIn(['selected', 'times']) &&
                            this.props.timebaseBooking.getIn(['selected', 'times']).size > 0
                        }
                        onSelected={this._onTimePickerItemClicked}
                        onTimeOut={this._onTimeOutFlashSaleCountDown}
                    />
                )}

                {this._renderPromoCodeInput(ctaStatus)}

                {this._renderButtonGetCode(ctaStatus)}
            </View>
        );
    }

    _renderLocationNotSupport = () => {
        return (
            <View style={[styles.container, { marginTop: DIMENSION_PADDING_LARGE }]}>
                <Text
                    style={{
                        color: COLOR_TEXT_INACTIVE,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        paddingRight: DIMENSION_PADDING_MEDIUM
                    }}
                >
                    {`Khuyến mãi này không áp dụng tại ${this.props.selectedProvinceName}. Vui lòng đổi khu vực để có thể đặt được chỗ.`}
                </Text>

                <View
                    style={[
                        styles.singleButtonUnFillColor,
                        { backgroundColor: 'white', borderColor: COLOR_TEXT_INACTIVE_DISABLE, marginTop: DIMENSION_PADDING_LARGE }
                    ]}
                >
                    <Text
                        style={{ color: COLOR_TEXT_INACTIVE_DISABLE, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold', textAlign: 'center' }}
                        uppercase={true}
                    >
                        {`Không áp dụng tại ${this.props.selectedProvinceName}`}
                    </Text>
                </View>
            </View>
        );
    };

    _renderDealIsNotGoLive = () => {
        const startValidTime = moment
            .utc(this.props.deal.get('start_valid_time', ''))
            .local()
            .format('dddd DD/MM/YYYY');
        const message = `Chương trình chính thức bắt đầu vào ngày ${startValidTime}`;
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    marginTop: DIMENSION_PADDING_LARGE,
                    marginBottom: DIMENSION_PADDING_LARGE,
                    padding: DIMENSION_PADDING_MEDIUM,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <JJIcon name={'info_o'} size={24} color={COLOR_PRIMARY} />
                <Text
                    style={{
                        color: COLOR_PRIMARY,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        paddingLeft: DIMENSION_PADDING_SMALL
                    }}
                >
                    {message}
                </Text>
            </View>
        );
    };

    _renderUnknownError = () => {
        const ctaStatus = this.props.timebaseBooking.get('status');
        if (
            (ctaStatus !== TimeBaseStatus.NOT_VALID && ctaStatus !== TimeBaseStatus.UNKNOWN_ERROR) ||
            (!!this.props.flashSale && this.props.flashSale.get('totalSlot', 0) > 0)
        )
            return null;

        let message = ERROR_NORMAL;
        if (ctaStatus === TimeBaseStatus.NOT_VALID) {
            const startValidTime = DateUtil.formatCalendarDate(this.props.timebaseBooking.getIn(['selected', 'date']));
            message = `${startValidTime},\nKhông còn khung giờ áp dụng khuyến mãi!`;
        }

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    marginTop: DIMENSION_PADDING_MEDIUM,
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <JJIcon name={'info_o'} size={24} color={COLOR_PRIMARY} />

                <Text
                    style={{
                        color: COLOR_PRIMARY,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        paddingLeft: DIMENSION_PADDING_SMALL
                    }}
                >
                    {message}
                </Text>
            </View>
        );
    };

    _renderStoreAndSlot = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <StoreSelectBox
                    storeCount={this.props.deal.get('stores', []).size}
                    timebaseBooking={this.props.timebaseBooking}
                    dealType={this.props.deal.get('deal_type')}
                    onPressed={this._showStorePicker}
                />

                {this.props.deal.get('deal_type') !== DEAL_TYPE_MOVIE && (
                    <SlotSelectBox
                        hintText={this.props.deal.get('hint_text', '')}
                        timebaseBooking={this.props.timebaseBooking}
                        onPressed={this._showSlotPicker}
                    />
                )}
            </View>
        );
    };

    _renderPromoCodeInput = ctaStatus => {
        if (
            (ctaStatus === TimeBaseStatus.UNKNOWN_ERROR || ctaStatus === TimeBaseStatus.NOT_VALID) &&
            (!this.props.flashSale || this.props.flashSale.get('times', { size: 0 }).size < 1)
        )
            return null;
        if (!this.props.timebaseBooking || !this.props.timebaseBooking.getIn(['selected', 'time'])) return null;
        if (!this.props.timebaseBooking.getIn(['selected', 'times']) || this.props.timebaseBooking.getIn(['selected', 'times'], { size: 0 }).size < 1)
            return null;
        if (this.props.deal.get('deal_type') === DEAL_TYPE_MOVIE) return null;

        return <PromoCodeInput deal={this.props.deal} timebaseBooking={this.props.timebaseBooking} listener={this.props.listener} />;
    };

    _renderButtonGetCode = ctaStatus => {
        if (
            (ctaStatus === TimeBaseStatus.UNKNOWN_ERROR || ctaStatus === TimeBaseStatus.NOT_VALID) &&
            (!this.props.flashSale || this.props.flashSale.get('times', { size: 0 }).size < 1)
        )
            return null;
        const disabled = this._isDisableGetCode();
        const selected = this.props.timebaseBooking.getIn(['selected', 'time']) !== undefined;
        const text = selected
            ? 'Xác nhận đặt chỗ'
            : this.props.deal.get('deal_type') === DEAL_TYPE_MOVIE
            ? 'Chọn rạp chiếu & thời gian'
            : 'Chọn cửa hàng, số lượng & thời gian';
        return (
            <View>
                <DividerLine
                    style={{
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM,
                        marginBottom: DIMENSION_PADDING_MEDIUM
                    }}
                />
                <TouchableOpacity
                    style={
                        selected
                            ? styles.singleButtonFillColor
                            : [
                                  styles.singleButtonUnFillColor,
                                  { backgroundColor: 'white', borderColor: disabled ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_PRIMARY }
                              ]
                    }
                    disabled={disabled}
                    onPress={this._onGetCodeClicked}
                >
                    <Text
                        style={{
                            color: selected ? 'white' : disabled ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_PRIMARY,
                            fontSize: DIMENSION_TEXT_HEADER,
                            fontWeight: 'bold'
                        }}
                        uppercase={true}
                    >
                        {text}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    _onGetCodeClicked = () => {
        if (this.props.listener && this.props.deal) this.props.listener.onGetCodeClicked(this.props.deal.get('deal_type', ''));
    };

    _showStorePicker = () => {
        this.props.navigation.navigate('StorePicker', {
            stores: this.props.deal.get('stores'),
            storeSelected: this.props.timebaseBooking.getIn(['selected', 'store'], ''),
            dealType: this.props.deal.get('deal_type'),
            onStoreSelected: this._onStorePickerItemClicked
        });
    };

    _showSlotPicker = () => {
        const slots = [];
        const minSlot = this.props.timebaseBooking.get('minOfMinSlot', 0);
        const maxSlot = this.props.timebaseBooking.get('maxOfMaxSlotPerVoucher', 0);
        for (let i = minSlot; i <= maxSlot; i++) {
            slots.push(i);
        }

        const slotUnit = this.props.deal
            .get('hint_text', '')
            .toLowerCase()
            .replace('số ', '');
        this.props.navigation.navigate('SlotPicker', {
            slots: slots,
            slotSelected: this.props.timebaseBooking.getIn(['selected', 'slot'], 0),
            slotUnit: slotUnit,
            onSlotSelected: this._onSlotPickerItemClicked
        });
    };

    _showDatePicker = () => {
        this.props.navigation.navigate('DatePicker', {
            dates: this.props.timebaseBooking.getIn(['selected', 'dates'], []).toJS(),
            dateSelected: this.props.timebaseBooking.getIn(['selected', 'date'], ''),
            onDateSelected: this._onDatePickerItemClicker
        });
    };

    _onDatePickerItemClicker = date => {
        console.log('Timebasebooking:_onDatePickerItemClicker', date);
        if (this.props.listener) this.props.listener.onDateChangeListener(date);
    };

    _onSlotPickerItemClicked = slot => {
        if (this.props.listener) this.props.listener.onSlotChangeListener(slot);
    };

    _onTimePickerItemClicked = time => {
        if (this.props.listener) this.props.listener.onTimeChangeListener(time);
    };

    _onStorePickerItemClicked = store => {
        if (this.props.listener) this.props.listener.onStoreChangeListener(store);
    };

    _isDisableGetCode = () => {
        return (
            !this.props.timebaseBooking ||
            this.props.timebaseBooking.get('isLoading') ||
            (this.props.timebaseBooking.get('status') !== TimeBaseStatus.CTA_AVAILABLE &&
                (!this.props.flashSale || this.props.flashSale.get('times', { size: 0 }).size < 1)) ||
            !this.props.timebaseBooking.getIn(['selected', 'time'])
        );
    };

    _scrollToTimeSelected = () => {
        try {
            const timeSelected = this.props.timebaseBooking.getIn(['selected', 'time']);
            const times = this.props.timebaseBooking.getIn(['selected', 'times'], []);

            if (!timeSelected || times.size < 1) {
                // this.timePickerRef.scrollToIndex({animated: true, index: 0, viewPosition: 0.5});
                return;
            }

            let selectedTimeIndex = times.findIndex((time, index) => {
                return !!time.get('time') && moment(time.get('time')).isSame(timeSelected.get('time'), 'minutes');
            });

            if (selectedTimeIndex < 0) return;

            if (this.mounted && this.timePickerRef && selectedTimeIndex > 1)
                this.timePickerRef.scrollToIndex({ animated: true, index: selectedTimeIndex, viewPosition: 0.5 });
        } catch (e) {
            console.log('_scrollToTimeSelected', e);
        }
    };

    _onClosePopoverChangeDateButton = () => {
        this.props.listener && this.props.listener.onClosePopoverChangeDateButton();
    };

    _onTimeOutFlashSaleCountDown = () => {
        console.debug('TB:_onTimeOutFlashSaleCountDown', this.props.listener);
        !!this.props.listener && !!this.props.listener.onTimeOutFlashSaleCountDown && this.props.listener.onTimeOutFlashSaleCountDown();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        setTimeout(() => {
            if (this.mounted && this.timePickerRef) this._scrollToTimeSelected();
        }, 250);

        console.log('Timebasebooking:componentDidUpdate', this.props.timebaseBooking.toJS());
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deal && !nextProps.deal.equals(this.props.deal)) return true;
        if (!!nextProps.timebaseBooking && !nextProps.timebaseBooking.equals(this.props.timebaseBooking)) return true;
        if (!!nextProps.flashSale && !this.props.flashSale) return true;
        if (!nextProps.flashSale && !!this.props.flashSale) return true;
        if (!!nextProps.flashSale && !nextProps.flashSale.equals(this.props.flashSale)) return true;

        return false;
    }

    componentWillUnmount() {
        this.timePickerRef = undefined;
        super.componentWillUnmount();
    }
}

TimebaseBooking.propTypes = {
    deal: PropTypes.object,
    timebaseBooking: PropTypes.object,
    flashSale: PropTypes.object,
    listener: PropTypes.object,
    isLoginned: PropTypes.bool,
    navigation: PropTypes.object,
    selectedProvinceName: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: DIMENSION_PADDING_LARGE,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM
    },
    textSelectBox: {
        marginLeft: 2,
        marginRight: 2,
        flex: 1.1,
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    dateSelectBox: {
        marginLeft: DIMENSION_PADDING_TINY,
        marginRight: DIMENSION_PADDING_TINY,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    buttonOtherDay: {
        height: HeightOfTimeBase,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        backgroundColor: '#4bc731',
        borderColor: '#4bc731',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1
    },
    dividerTimebaseSelection: {
        backgroundColor: COLOR_TEXT_INACTIVE_DISABLE,
        height: 10,
        width: 10,
        borderRadius: 5,
        marginLeft: DIMENSION_PADDING_MEDIUM
    },
    singleButtonFillColor: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleButtonUnFillColor: {
        flex: 1,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
