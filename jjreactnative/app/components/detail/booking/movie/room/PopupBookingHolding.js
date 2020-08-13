import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {interval} from 'rxjs';

import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_XX
} from "../../../../../resources/dimens";
import JJIcon from '../../../../common/JJIcon';
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";

export const TIME = 300; //seconds

export default class PopupBookingHolding extends BaseComponent {

    time = TIME;

    constructor(props) {
        super(props);
        this.state = {
            text: '-:--'
        }
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: DIMENSION_PADDING_LARGE
                }}>

                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: DIMENSION_RADIUS_LARGE
                    }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: DIMENSION_TEXT_HEADER,
                                color: COLOR_TEXT_BLACK_1,
                                position: 'absolute',
                                left: 0,
                                right: 0
                            }}>
                            Giữ chỗ thành công
                        </Text>

                        <TouchableOpacity
                            style={{
                                padding: DIMENSION_PADDING_MEDIUM
                            }}
                            activeOpacity={0.8}
                            onPress={this._onClosePress}>
                            <JJIcon
                                size={16}
                                name={'x_o'}
                                color={COLOR_TEXT_INACTIVE}/>
                        </TouchableOpacity>

                    </View>

                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: DIMENSION_TEXT_CONTENT,
                            color: COLOR_TEXT_BLACK_1,
                            padding: DIMENSION_PADDING_MEDIUM
                        }}>
                        Ghế bạn chọn sẽ được giữ trong
                        <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}> 5 </Text>
                        phút. Vui lòng hoàn tất thanh toán trong khoảng thời gian này.
                    </Text>

                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: DIMENSION_TEXT_HEADER_XX,
                            color: COLOR_TEXT_BLACK_1,
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: DIMENSION_PADDING_MEDIUM
                        }}>
                        {this.state.text}
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginLeft: DIMENSION_PADDING_MEDIUM,
                            marginRight: DIMENSION_PADDING_MEDIUM,
                            marginBottom: DIMENSION_PADDING_MEDIUM,
                            backgroundColor: COLOR_PRIMARY,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            padding: DIMENSION_PADDING_MEDIUM,
                            alignItems: 'center'
                        }}
                        activeOpacity={0.8}
                        onPress={this._onPress}>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: DIMENSION_TEXT_HEADER
                            }}>
                            OK
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    _startInterval = () => {
        console.log('MovieRoom:PopupBookingHolding:_startInterval', this.props);
        this.interval = interval(1000);
        this.subscribe = this.interval.subscribe(val => {

            this.time -= 1;
            if (this.time <= 0) {
                this.setState({
                    text: '0:00'
                });
                this._onTimeOut();
                this.subscribe.remove(this.subscribe);
                this.subscribe.unsubscribe();
                return;
            }
            const minutes = Math.floor(this.time/60);
            let seconds = minutes > 0 ? this.time%(60*minutes) : this.time;
            if (seconds < 10) seconds = '0' + seconds;
            this.setState({
                text: `${minutes}:${seconds}`
            })
        });
    }

    _onTimeOut = () => {
        this.props.onTimeOut();
    }

    _onClosePress = () => {
        this.props.onPressClose();
    }

    _onPress = () => {
        this.props.onPressSubmit();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.text !== this.state.text) return true;
        if (nextProps.time !== this.props.time) return true;

        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.time = this.props.time;
        this._startInterval();
    }

    componentWillUnmount() {
        try {
            if (!!this.subscribe) {
                this.subscribe.remove(this.subscribe);
                this.subscribe.unsubscribe();
            }
        } catch (e) {
            console.log(e);
        }
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        try {
            console.log('MovieRoom:PopupBookingHolding:componentWillReceiveProps', nextProps);
            if (nextProps.time !== this.props.time && nextProps.time > 1) {
                this.time = nextProps.time;
            }
            else if (!nextProps.time && !!this.mounted) {
                try {
                    if (!!this.subscribe) {
                        this.subscribe.remove(this.subscribe);
                        this.subscribe.unsubscribe();
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

PopupBookingHolding.propTypes = {
    time: PropTypes.any,
    onPressClose: PropTypes.any,
    onPressSubmit: PropTypes.any,
    onTimeOut: PropTypes.any,
}