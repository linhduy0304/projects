import React from 'react'
import {View} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import JJIcon from '../common/JJIcon'
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_UNDER_TINY
} from "../../resources/dimens";
import {DEAL_TYPE_ECOUPON, DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../../const";

export default class DealTypeTitle extends React.PureComponent {

    render() {
        if (!this.props.dealType) return null;
        let label = null;
        let icon = null;
        let color = COLOR_PRIMARY;
        switch (this.props.dealType) {
            case DEAL_TYPE_LAST_MIN:
            case DEAL_TYPE_MOVIE:
                label = 'Đặt chỗ';
                icon = 'booking_o';
                break;
            case DEAL_TYPE_EXCLUSIVE:
                label = 'Lấy mã';
                icon = 'ticket_o';
                break;
            case DEAL_TYPE_ECOUPON:
                label = 'Mua online';
                icon = 'online_web_o';
                color = COLOR_TEXT_INACTIVE;
                break;
            default:
                label = 'Tổng hợp';
                icon = 'info_o';
                color = COLOR_TEXT_INACTIVE;
                break;
        }

        return (
            <View style={{
                flexDirection: 'row',
                position: 'absolute',
                left: DIMENSION_PADDING_SMALL,
                top: DIMENSION_PADDING_SMALL + 2,
                borderColor: color,
                borderRadius: DIMENSION_RADIUS_MEDIUM,
                borderWidth: 1,
                paddingTop: 1,
                paddingBottom: 1,
                width: 57,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <JJIcon name={icon} color={color} size={DIMENSION_TEXT_UNDER_TINY}/>
                <Text style={{color: color, fontSize: DIMENSION_TEXT_UNDER_TINY, marginLeft: DIMENSION_PADDING_TINY}}>
                    {label}
                </Text>
            </View>
        )
    }
}

DealTypeTitle.propTypes = {
    dealType: PropTypes.any
}