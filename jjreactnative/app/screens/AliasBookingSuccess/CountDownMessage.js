import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
moment.locale('vi');

import Text from '../../common/view/text/JJText';
import {BaseComponent} from "../../common/base/BaseComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY} from "../../resources/dimens";
import {DateUtil} from '../../utils/date-utils';
import {AnalyticsHelper} from "../../common/analytics";

export default class CountDownMessage extends BaseComponent {

    render() {

        const checkIn = moment.unix(this.props.check_in_time).local();

        return (
            <View style={[{padding: DIMENSION_PADDING_MEDIUM}, this.props.style]}>
                <Text style={{textAlign: 'center'}}>
                    {`Chưa đến giờ đặt chỗ,\nbạn vui lòng chờ đến `}{this._getTimeByMinute()} trước giờ đặt để kích hoạt nút "Sử dụng mã"
                </Text>

                <Text style={{marginTop: DIMENSION_PADDING_MEDIUM, textAlign: 'center'}}>
                    Giờ đặt của bạn là <Text style={{fontWeight: 'bold'}}>{checkIn.format('hh:mm A')}</Text>,
                </Text>
                <Text style={{marginTop: DIMENSION_PADDING_TINY, textAlign: 'center'}}>
                    {DateUtil.formatFullCalendarDate(checkIn.toDate())}
                </Text>
            </View>
        )
    }

    _getTimeByMinute = () => {
        const time = moment.unix(this.props.check_in_time).local().diff(this.props.start_redeem_time, 'minutes');

        const hours = Math.floor(time/60);
        let minutes = hours > 0 ? time%(60*hours) : time;
        if (minutes > 0 && minutes < 10) minutes = '0' + minutes;

        if (hours < 1) return <Text style={{color: '#EE853A', fontWeight: 'bold'}}>{minutes} phút</Text>;
        return <Text style={{color: '#EE853A', fontWeight: 'bold'}}>{hours} giờ {minutes} phút</Text>;
    }

    componentDidMount() {
        super.componentDidMount();

        AnalyticsHelper.trackItemImpression(
            this.props.situation,
            'show_popup_redeem_time_notice'
        )
    }
}

CountDownMessage.propTypes = {
    situation: PropTypes.object,
    start_countdown_time: PropTypes.any,
    start_redeem_time: PropTypes.any,
    check_in_time: PropTypes.any,
    style: PropTypes.any
}