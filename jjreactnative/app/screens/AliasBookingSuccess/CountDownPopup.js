import React from 'react';
import {View, TouchableOpacity, AppState} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import {interval} from "rxjs";

import {BaseComponent} from "../../common/base/BaseComponent";
import Text from '../../common/view/text/JJText';
import {styles} from './styles';
import FadeInView from "../../common/view/FadeInView";

import CountDownTime from './CountDownTime';
import CountDownMessage from './CountDownMessage';
import {COLOR_LINE, COLOR_PRIMARY} from "../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {DateUtil} from '../../utils/date-utils';

moment.locale('vi');

export default class CountDownPopup extends BaseComponent {

    start_countdown_time;
    start_redeem_time;

    constructor(props) {
        super(props);
        this.state = {
            type: undefined
        };
    }

    render() {

        if (!this.state.type) return null;

        return (
            <FadeInView duration={350} style={styles.countDownContainer}>

                <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center'}}
                    onPress={this.props.onSubmitPress}
                    activeOpacity={1}>

                    <View style={styles.countDownPopupContent}>

                        {
                            this.state.type === 'time' &&
                            <CountDownTime
                                situation={this.props.situation}
                                text={this.state.textTime}/>
                        }

                        {
                            this.state.type === 'message' &&
                            <CountDownMessage
                                situation={this.props.situation}
                                start_countdown_time={this.start_countdown_time}
                                start_redeem_time={this.start_redeem_time}
                                check_in_time={this.props.check_in_time}/>
                        }

                        <TouchableOpacity
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: COLOR_LINE,
                                padding: DIMENSION_PADDING_MEDIUM,
                                alignItems: 'center'
                            }}
                            activeOpacity={0.8}
                            onPress={this.props.onSubmitPress}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: COLOR_PRIMARY}}>
                                OK
                            </Text>
                        </TouchableOpacity>

                    </View>

                </TouchableOpacity>

            </FadeInView>
        )
    }

    _startInterval = () => {
        this._removeSubscribe()
        this.interval = interval(1000);
        this.subscribe = this.interval.subscribe(val => {
            if(!this.mounted) {
                this._removeSubscribe()
                return;
            }
            this.time -= 1;
            if (this.time < 1) {
                this._onTimeOut();
                this._removeSubscribe();
            }

            this.setState({
                textTime: DateUtil.getClock(this.time),
                type: !!this.start_countdown_time.isSameOrBefore(new Date(), 'seconds') ? 'time' : 'message'
            })
        });
    };

    _removeSubscribe = () => {
        if (!!this.subscribe) {
            this.subscribe.remove(this.subscribe);
            this.subscribe.unsubscribe();
            this.subscribe = undefined;
        }
    }

    _getExpireSecondCount = () => {
        return this.start_redeem_time.diff(new Date(), 'seconds');
    }

    _onTimeOut = () => {
        !!this.props.onTimeOut && this.props.onTimeOut();
    }

    _recheck = () => {
        if (!this.start_countdown_time || !this.start_redeem_time) return;

        this.time = this._getExpireSecondCount();

        console.debug('CountDownPopup:_recheck: ', this.start_countdown_time.toDate(), this.start_redeem_time.toDate(), this.time);

        if (this.time <= 1) {
            this._onTimeOut();
            this._removeSubscribe();
            this.setState({
                type: undefined
            });
            return;
        }

        this.setState({
            textTime: DateUtil.getClock(this.time),
            type: !!this.start_countdown_time.isSameOrBefore(new Date(), 'seconds') ? 'time' : 'message'
        });

        this._startInterval();
    }

    _handleAppStateChange = nextAppState => {
        if ( nextAppState === 'active') {
            this.time = this._getExpireSecondCount();
            this.time -= 1;
            if (this.time < 1) {
                this._onTimeOut();
                this._removeSubscribe();
                return;
            }

            this.setState({
                textTime: DateUtil.getClock(this.time),
                type: !!this.start_countdown_time.isSameOrBefore(new Date(), 'seconds') ? 'time' : 'message'
            }, this._startInterval);
        }
    }

    componentDidMount() {
        super.componentDidMount();

        this.start_countdown_time = moment.utc(this.props.start_countdown_time).local();
        this.start_redeem_time = moment.utc(this.props.start_redeem_time).local();
        this._recheck();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this._removeSubscribe();
        super.componentWillUnmount();
    }
}

CountDownPopup.propTypes = {
    start_countdown_time: PropTypes.any,
    start_redeem_time: PropTypes.any,
    check_in_time: PropTypes.number,
    situation: PropTypes.object,
    onSubmitPress: PropTypes.func,
    onTimeOut: PropTypes.func
}