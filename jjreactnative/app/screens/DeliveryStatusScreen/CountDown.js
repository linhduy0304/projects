import React  from 'react';
import { Text, AppState } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import { interval } from 'rxjs';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../common/base/BaseComponent';

moment.locale('vi');

export default class CountDown extends BaseComponent {

    constructor(props) {
        super(props);
        this.time = this._getExpireSecondCount(props.time);
        this.state = {
            textTime: this._getTextTimeFormat(this.time),
            note: ''
        };
    }

    render() {
        const {status} = this.props;
        const { textTime } = this.state;
        if ((!textTime || textTime.length < 1) && status !== 'assigning') {
            return ' ít phút';
        }
        return <Text style={{ fontWeight: 'bold' }}> {textTime}</Text>;
    }

    _getExpireSecondCount = time => {
        return moment.utc(time).local().diff(moment(), 'seconds');
    }

    _removeSubscribe = () => {
        if (!!this.subscribe) {
            this.subscribe.remove(this.subscribe);
            this.subscribe.unsubscribe();
            this.subscribe = undefined;
        }
    }

    _startInterval = (timeNextProps) => {
        this._removeSubscribe()
        const {status, time} = this.props;
        this.time = this._getExpireSecondCount(!!timeNextProps ? timeNextProps : time);
        if (!this.time) {
            return;
        }
        if (this.time < 1) {
            this._refreshTimeOut();
            return;
        }
        this.interval = interval(1000);
        this.subscribe = this.interval.subscribe(val => {
            if(!this.mounted) {
                this._removeSubscribe()
                return;
            }
            this.time -= 1;
            if (this.time < 1) {
                this._refreshTimeOut();
                return;
            }
            this.setState({textTime: this._getTextTimeFormat(this.time)})
        });
    };

    _refreshTimeOut = () => {
        !!this.props.refreshTimeOut && this.props.refreshTimeOut();
        this._removeSubscribe()
        this.time = undefined;
        this.setState({
            textTime: ''
        })
    }

    _getTextTimeFormat = time => {
        const minutes = Math.floor(time/60);
        let seconds = minutes > 0 ? time%(60*minutes) : time;
        if (seconds < 10) seconds = '0' + seconds;
        return `${minutes}:${seconds}`;
    }

    _handleAppStateChange = nextAppState => {
        if ( nextAppState === 'active') {
            this.time = this._getExpireSecondCount(this.props.time);
            this.setState({
                textTime: this._getTextTimeFormat(this.time)
            }, this._startInterval);
        }
    };

    componentDidMount = () => {
        super.componentDidMount();
        this._startInterval();
        AppState.addEventListener('change', this._handleAppStateChange);
    };

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (nextState.textTime !== this.state.textTime) return true;
        if (nextState.note !== this.state.note) return true;

        return false;
    }

    componentWillUnmount = () => {
        AppState.removeEventListener('change', this._handleAppStateChange);
        try {
            this._removeSubscribe()
        } catch (e) {
            console.log(e);
        }
        super.componentWillUnmount();
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        try {
            if (!!nextProps.time) {
                if (!moment.utc(nextProps.time).isSame(moment.utc(this.props.time), 'seconds')) {
                    this._removeSubscribe()

                    this.setState({
                        textTime: '--:--'
                    }, this._startInterval(nextProps.time));
                }
            }
        }
        catch (e) {
            console.debug(e);
        }
    }
}

CountDown.propTypes = {
    time: PropTypes.any,
    status: PropTypes.string,
    refreshTimeOut: PropTypes.func
}
