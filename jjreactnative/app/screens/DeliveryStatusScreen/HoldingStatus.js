import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, AppState } from 'react-native';
import { AppConfig } from '../../common/config';
import moment from 'moment/min/moment-with-locales';
import { COLOR_GREEN_1 } from '../../resources/colors';
import {BaseComponent} from '../../common/base/BaseComponent';
import { interval } from 'rxjs';
import PropTypes from 'prop-types';

const width = AppConfig.windowWidth;
export default class HoldingStatus extends BaseComponent {
    
    constructor(props) {
        super(props);
        this.time = this._getExpireSecondCount(props.date);
    }

    componentDidMount = () => {
        super.componentDidMount();
        this._startInterval();
        AppState.addEventListener('change', this._handleAppStateChange);
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

    _startInterval = () => {
        this._removeSubscribe()
        const {date} = this.props;
        this.time = this._getExpireSecondCount(date);
        if (!this.time) {
            return;
        }
        if (this.time < -10) {
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
            if (this.time < -10) {
                this._refreshTimeOut();
                return;
            }
        });
    };

    _refreshTimeOut = () => {
        this.props.refreshTimeOutHolding()
        this._removeSubscribe()
        this.time = undefined;
    }

    _removeSubscribe = () => {
        if (!!this.subscribe) {
            this.subscribe.remove(this.subscribe);
            this.subscribe.unsubscribe();
            this.subscribe = undefined;
        }
    }

    _getExpireSecondCount = time => {
        return moment.utc(time).local().diff(moment(), 'seconds');
    }

    _handleAppStateChange = nextAppState => {
        if ( nextAppState === 'active') {
            this.time = this._getExpireSecondCount(this.props.date);
            this._startInterval
        }
    };

    render() {
        const {openModalDetail} = this.props
        return (
            <View
                style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#fff',
                }}
            >
                <Image style={styles.img} source={require('../../resources/images/img_holding.png')} />
                <Text style={styles.text}>Chưa tới gần khung giờ bạn vừa đặt chỗ,</Text>
                <Text style={styles.text}>JAMJA sẽ giúp bạn tìm người mua hộ vào</Text>
                <Text style={styles.time}>
                    {moment.utc(this.props.date).local().format('HH:mm A, DD/MM/YYYY')}
                </Text>
                <Text style={styles.text}>Bạn chờ chút nhé!</Text>
                <Text onPress={openModalDetail} style={styles.txtDetail}>Xem chi tiết đơn mua hộ</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txtDetail: {
        color: COLOR_GREEN_1,
        marginTop: 11,
        padding: 3,
    },
    time: {
        color: '#454545',
        fontWeight: 'bold',
        marginVertical: 8,
        fontSize: 18
    },
    img: {
        width,
        height: (width * 957) / 1125
    },
    text: {
        color: '#454545',
        marginBottom: 2
    }
});

HoldingStatus.propTypes = {
    openModalDetail: PropTypes.func,
    date: PropTypes.string,
    refreshTimeOutHolding: PropTypes.func,
}
