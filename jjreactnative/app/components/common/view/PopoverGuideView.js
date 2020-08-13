import React from 'react'
import {Easing, View, TouchableOpacity} from "react-native";
import {Text} from "native-base";
import Popover from "react-native-popover-view";
import PropTypes from 'prop-types'

import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {BaseComponent} from "../BaseComponent";
import JJIcon from "../JJIcon";
import {ConfigDb} from "../../../api/storage/ConfigDb";

export default class PopoverGuideView extends BaseComponent {

    title = '';
    message = '';
    focused = false;

    constructor(props) {
        super(props);
        this.state = {
            popoverVisible: false
        };
        if (!!props && !!props.navigation) {
            this._didFocusSubscription = props.navigation.addListener('willFocus', payload =>
                {
                    console.log('Home:pop:willFocus');
                    this.focused = true;
                }
            );

            this._willBlurSubscription = props.navigation.addListener('willBlur', payload =>
                {
                    console.log('Home:pop:willBlur');
                    this.focused = false;
                }
            );
        }
    }


    render() {
        if (!this.state.popoverVisible) return null;

        const anchorView = this.props.getAnchorView();

        if (!anchorView) return null;

        return (
            <Popover
                popoverStyle={{ backgroundColor: '#3399ff', borderRadius: DIMENSION_RADIUS_LARGE, width: '80%' }}
                isVisible={this.state.popoverVisible}
                placement={this.props.position}
                fromView={anchorView}
                showBackground={false}
                animationConfig={{ duration: 100, easing: Easing.inOut(Easing.linear) }}>

                <View style={{
                    padding: DIMENSION_PADDING_SMALL,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{flex: 1}}>
                        <Text style={{color: 'white', fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                            {this.title}
                        </Text>
                        <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_CONTENT, marginTop: 2 }}>
                            {this.message}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            paddingRight: DIMENSION_PADDING_SMALL,
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingTop: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_SMALL
                        }}
                        onPress={this._onClosePopover}>
                        <JJIcon name={'x_o'}
                                color={'white'}
                                size={16} />
                    </TouchableOpacity>
                </View>
            </Popover>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this.focused = true;

        if (this.props.type === 'Dạo xem') {
            this._checkToOpenTabDiscoveryPopover();
        } else if (this.props.type === 'Đặt chỗ') {
            this._checkToOpenTabBookingPopover();
        } else if (this.props.type === 'filter') {
            this._checkToOpenFilterButtonPopover();
        }
    }

    _startShowFilterButtonPopover = () => {
        if (!this.mounted || !this.focused) return;
        this.title = 'Quá nhiều thông tin?';
        this.message = 'Lọc để tìm khuyến mãi phù hợp với bạn.';
        this.setState({
            popoverVisible: true
        });
        ConfigDb.filterButtonPopoverVisible();
    }

    _scheduleToShowFilterButtonPopover = () => {
        if (!this.mounted || !this.focused) return;
        setTimeout(this._startShowFilterButtonPopover, 5000);
    }

    _checkToOpenFilterButtonPopover = () => {
        if (!ConfigDb.hasVisibleFilterButtonPopover()) {
            this._scheduleToShowFilterButtonPopover();
        }
        else {
            this.props.onShowPopover();
        }
    }

    _startShowTabBookingPopover = () => {
        if (!this.mounted || !this.focused) return;
        this.title = 'Đặt chỗ khuyến mãi';
        this.message = 'Deal độc quyền cho khách hàng của\nJAMJA. Đặt chỗ là được giảm!';
        this.setState({
            popoverVisible: true
        });
        ConfigDb.tabBookingPopoverVisible();
    }

    _scheduleToShowTabBookingPopover = () => {
        if (!this.mounted || !this.focused) return;
        setTimeout(this._startShowTabBookingPopover, 5000);
    }

    _checkToOpenTabBookingPopover = () => {
        if (!ConfigDb.hasVisibleTabBookingPopover()) {
            this._scheduleToShowTabBookingPopover();
        }
        else {
            this.props.onShowPopover();
        }
    }

    _startShowTabDiscoveryPopover = () => {
        if (!this.mounted || !this.focused) return;
        this.title = 'Dạo xem khuyến mãi';
        this.message = 'Săn tin khuyến mãi online/offline mới nhất\nvà lấy mã giảm giá độc quyền';
        this.setState({
            popoverVisible: true
        });
        ConfigDb.tabDiscoveryPopoverVisible();
    }

    _scheduleToShowTabDiscoveryPopover = () => {
        if (!this.mounted || !this.focused) return;
        setTimeout(this._startShowTabDiscoveryPopover, 10000);
    }

    _checkToOpenTabDiscoveryPopover = () => {
        if (!ConfigDb.hasVisibleTabDiscoveryPopover()) {
            this._scheduleToShowTabDiscoveryPopover();
        }
        else {
            this.props.onShowPopover();
        }
    }

    _onClosePopover = () => {
        this.setState({popoverVisible: false});
        this.focused = false;
        this.props.onShowPopover();
    }

    componentWillUnmount() {
        !!this._didFocusSubscription && this._didFocusSubscription.remove();
        !!this._willBlurSubscription && this._willBlurSubscription.remove();
        this.focused = false;
        super.componentWillUnmount();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.type !== this.props.type ||
            nextState.popoverVisible !== this.state.popoverVisible ||
            nextProps.active !== this.props.active;
    }
}

PopoverGuideView.propTypes = {
    type: PropTypes.any,
    active: PropTypes.any,
    position: PropTypes.any,
    navigation: PropTypes.any,
    getAnchorView: PropTypes.any,
    onShowPopover: PropTypes.any
}