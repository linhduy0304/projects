import React from "react";
import { Text } from 'native-base';
import { View } from "react-native";
import StarRating from 'react-native-star-rating';
import moment from 'moment/min/moment-with-locales';
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../../../resources/dimens";
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../../common/BaseComponent";

moment.locale('vi')

export default class RateDealItem extends BaseComponent {

    render() {
        return (
            <View style={{ backgroundColor: 'white', padding: DIMENSION_PADDING_MEDIUM }}>

                {/* RateStar */}
                <View style={{ justifyContent: 'flex-start' }}>
                    <StarRating
                        disabled={true}
                        containerStyle={{ justifyContent: 'flex-start' }}
                        buttonStyle={{ paddingRight: 2 }}
                        maxStars={5}
                        starSize={14}
                        fullStarColor={'#ef863b'}
                        emptyStarColor={'#ef863b'}
                        rating={this.props.rate.rate_value}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 4 }}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                        bởi
                        <Text style={{ color: COLOR_TEXT_BLACK_1, fontWeight: 'bold', fontSize: DIMENSION_TEXT_CONTENT }}>
                            {' ' + this.props.rate.user.full_name}
                        </Text>
                    </Text>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                        {this._formatCalendarDate(this.props.rate.created)}
                    </Text>
                </View>

                <Text style={{
                    color: COLOR_TEXT_BLACK_1,
                    fontSize: DIMENSION_TEXT_CONTENT
                }}>
                    {this.props.rate.rate_comment}
                </Text>
            </View>
        )
    }

    _formatCalendarDate = (date) => {
        return moment.utc(date).local().calendar(null, {
            sameDay: '[Hôm nay lúc] HH:mm',
            nextDay: '[Ngày mai lúc] HH:mm',
            nextWeek: 'DD/MM/YYYY',
            lastDay: '[Hôm qua lúc] HH:mm',
            lastWeek: 'DD/MM/YYYY',
            sameElse: 'DD/MM/YYYY',
        }).replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.rate !== undefined && this.props.rate === undefined) ||
            nextProps.rate.id !== this.props.rate.id;
    }
}

RateDealItem.propTypes = {
    rate: PropTypes.any,
    navigation: PropTypes.any
}