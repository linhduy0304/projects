import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';

import {BaseComponent} from "../../../../../common/base/BaseComponent";
import FlashSaleCountDownHeader from '../flashSale/FlashSaleCountDownHeader';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import FlashSaleTimeListSelectBox from '../flashSale/FlashSaleTimeListSelectBox';
import {COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import {DateUtil} from '../../../../../utils/date-utils';

moment.locale('vi');

export default class FlashSaleBooking extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = this._getNoticeState(props);
    }


    render() {

        console.debug('FlashSaleBooking:re der', this.props);

        return (
            <View
                style={[styles.container, {marginTop: !!this.props.hasNormalBookingTime ? 0 : DIMENSION_PADDING_MEDIUM}]}>
                <FlashSaleCountDownHeader
                    time={this.props.flashSale.get('count_down_time')}
                    numberUnit={this.props.slotUnit}
                    totalNumber={this.props.flashSale.get('totalSlot', 0)}
                    availableNumber={this.props.flashSale.get('totalSlotAvailable', 0)}
                    highlight={this.props.flashSale.get('highlight', '')}
                    active={this.props.flashSale.get('active', false)}
                    hasTime={this.props.flashSale.get('times', {size: 0}).size > 0}
                    onTimeOut={this.props.onTimeOut}/>

                {
                    this.props.flashSale.get('times', {size: 0}).size > 0 &&
                    <FlashSaleTimeListSelectBox
                        times={this.props.flashSale.get('times')}
                        onSelected={this.props.onSelected}
                        selectedTime={this.props.timeSelected}/>
                }

                {
                    !!this.state.notice &&
                    <Text style={styles.textNotice}>
                        {this.state.notice}
                    </Text>
                }

            </View>
        )
    }

    _getNoticeState = props => {
        let notice = undefined;

        if (!!props.flashSale && !!props.flashSale.get('count_down_time') && props.flashSale.get('times', {size: 0}).size < 1) {

            if (!props.flashSale.get('active', false)) {
                notice = `Chờ đón lúc ${moment.utc(props.flashSale.get('count_down_time')).local().format('HH:mm')} ${DateUtil.formatFullCalendarDateByUtc(props.flashSale.get('count_down_time'))}`;
            }
            // else if (!!props.dateSelected){
            //     notice = 'Flash sale không áp dụng';
            // }
        }
        return {notice: notice}
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        try {
            if (!nextProps.flashSale) {
                this.setState({notice: undefined});
                return;
            }

            if (!nextProps.flashSale.equals(this.props.flashSale) || !moment(nextProps.dateSelected).isSame(this.props.dateSelected, 'day')) {
                this.setState(this._getNoticeState(nextProps));
            }
        }
        catch (e) {
            console.log(e);
            this.setState({notice: undefined});
        }
    }
}

FlashSaleBooking.propTypes = {
    flashSale: PropTypes.object,
    slotUnit: PropTypes.string,
    timeSelected: PropTypes.object,
    dateSelected: PropTypes.any,
    hasNormalBookingTime: PropTypes.bool,
    onSelected: PropTypes.func,
    onTimeOut: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM,
    },
    textNotice: {
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_INACTIVE,
        textAlign: 'center',
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_TINY,
    }
});