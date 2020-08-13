import React, { Component } from 'react';
import { Text, View, Easing, TouchableOpacity } from 'react-native';
import Popover from 'react-native-popover-view';
import PropTypes from 'prop-types';

import { COLOR_TEXT_BLACK_1, COLOR_TEXT_GRAY, COLOR_BACKGROUND_TOOLTIP } from '../../resources/colors';
import { DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM } from '../../resources/dimens';
import JJIcon from '../../common/view/icon/JJIcon';
import { AppConfig } from '../../common/config';
import CountDown from './CountDown';

const TooltipLayout = {
    backgroundColor: COLOR_BACKGROUND_TOOLTIP,
    borderRadius: DIMENSION_RADIUS_MEDIUM,
    width: AppConfig.windowWidth * 0.76,
    padding: DIMENSION_PADDING_SMALL
};

export default class JamjaStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            note: 'Thời gian dự kiến giao hàng có thể kéo dài do thời tiết xấu, tắc đường, ... Vui lòng liên hệ hotline JAMJA để được hỗ trợ thêm'
        };
    }

    render() {
        const { status, auto_cancel_time, estimate_start_shipping_time, refreshTimeOut } = this.props;
        const {note} = this.state;
        return (
            <View
                style={{
                    backgroundColor: 'rgba(34, 195, 0, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 11,
                    flexDirection: 'row'
                }}
            >
                <Text style={{ color: COLOR_TEXT_BLACK_1, marginHorizontal: 40 }}>
                    {this._getTitleStatus()}
                    {(status === 'assigning' || status === 'accepted' || status === 'shipping') && (
                        <CountDown
                            time={status === 'assigning' ? auto_cancel_time : estimate_start_shipping_time}
                            status = {status}
                            refreshTimeOut = {refreshTimeOut}
                        />
                    )}
                </Text>

                {(status === 'accepted' || status === 'shipping') && (
                    <TouchableOpacity
                        ref={'buttonToolTip'}
                        style={{
                            position: 'absolute',
                            right: 0,
                            paddingHorizontal: 13
                        }}
                        onPress={() => this.setState({ isVisible: true })}
                    >
                        <JJIcon name="info_o" size={16} color={COLOR_TEXT_GRAY} />
                    </TouchableOpacity>
                )}

                <Popover
                    popoverStyle={TooltipLayout}
                    showBackground={false}
                    verticalOffset={AppConfig.ios ? 0 : -16}
                    isVisible={this.state.isVisible}
                    fromView={this.refs.buttonToolTip}
                    placement={'bottom'}
                    animationConfig={{
                        duration: 100,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }}
                    onClose={() => this.setState({ isVisible: false })}
                >
                    <Text style={{ color: '#fff', lineHeight: 18 }}>
                        {note}
                    </Text>
                </Popover>
            </View>
        );
    }

    _getTitleStatus = () => {
        switch (this.props.status) {
            case 'assigning':
            case 'auto_cancel':
                return 'Đang tìm người mua hộ';
            case 'accepted':
            case 'shipping':
                return 'Đơn mua hộ sẽ được giao trong';
            case 'completed':
                return 'Đã giao hàng thành công!';
            case 'user_cancel':
                return 'Bạn đã huỷ đơn';
            case 'shipper_cancel':
            case 'admin_cancel':
            case 'partner_cancel':
                return 'Shipper đã huỷ đơn';
            default:
                return '';
        }
    };
}

JamjaStatus.propTypes = {
    onReBroadCast: PropTypes.func,
    status: PropTypes.string,
    auto_cancel_time: PropTypes.any,
    estimate_start_shipping_time: PropTypes.any,
    cancelOrder: PropTypes.any
}
