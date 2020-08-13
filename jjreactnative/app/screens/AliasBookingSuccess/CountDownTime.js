import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
moment.locale('vi');

import Text from '../../common/view/text/JJText';
import {BaseComponent} from "../../common/base/BaseComponent";
import {styles} from './styles';
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {AnalyticsHelper} from '../../common/analytics';

export default class CountDownTime extends BaseComponent {

    render() {

        return (
            <View style={[{padding: DIMENSION_PADDING_MEDIUM}, this.props.style]}>
                <Text style={{textAlign: 'center'}}>
                    {`Chưa đến giờ đặt chỗ,\nvui lòng trở lại sau:`}
                </Text>

                <Text style={styles.textTimeCountDown}>
                    {this.props.text}
                </Text>
            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();

        AnalyticsHelper.trackItemImpression(
            this.props.situation,
            'show_popup_redeem_time_countdown'
        )
    }
}

CountDownTime.propTypes = {
    text: PropTypes.any,
    situation: PropTypes.object,
    style: PropTypes.any
}