import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from 'native-base';
import {interval} from 'rxjs';

import {BaseComponent} from "../../../common/BaseComponent";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_HEADER_X
} from "../../../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../../../resources/colors";

const TIME = 300; //seconds

export default class HeaderCountDown extends BaseComponent {

    time = TIME;

    constructor(props) {
        super(props);
        this.state = {
            text: '-:--'
        };
        this.time = props.time;
    }


    render() {
        return (
            <View
                style={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: DIMENSION_PADDING_SMALL
                }}>

                <Text
                    style={{
                        fontSize: DIMENSION_TEXT_HEADER_X,
                        color: COLOR_TEXT_BLACK_1,
                        textAlign: 'center'
                    }}>
                    {this.state.text}
                </Text>
            </View>
        )
    }

    _startInterval = () => {
        console.log('MovieRoom:HeaderCountDown:_startInterval', this.props);
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

    componentDidMount() {
        super.componentDidMount();
        this.time = this.props.time;
        this._startInterval();
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextState.text !== this.state.text) return true;
        if (nextProps.time !== this.props.time) return true;

        return false;
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

    componentWillReceiveProps(nextProps) {
        try {
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

HeaderCountDown.propTypes = {
    time: PropTypes.any,
    onTimeOut: PropTypes.any
}