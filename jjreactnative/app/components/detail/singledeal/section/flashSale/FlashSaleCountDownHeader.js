import React from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import {Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import moment from 'moment/min/moment-with-locales';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {timer} from 'rxjs';
import {scan, takeWhile} from 'rxjs/operators';

import {BaseComponent} from "../../../../../common/base/BaseComponent";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../../../../resources/colors";
import {DateUtil} from '../../../../../utils/date-utils';
import {CommonUtil} from '../../../../../utils/common-utils';

moment.locale('vi');

export default class FlashSaleCountDownHeader extends BaseComponent {

    diffCount = 0;
    hasStartCountDown = false;

    constructor(props) {
        super(props);
        this.state = this._getState(props);
    }

    render() {
        return (
            <View style={styles.container}>

                <FastImage
                    style={{
                        width: '100%',
                        height: 62,
                    }}
                    source={this.props.hasTime ? require('../../../../../resources/images/flashSale/flash_sale_header_background_2.png') : require('../../../../../resources/images/flashSale/flash_sale_header_background.png')}
                    resizeMode={FastImage.resizeMode.stretch}/>

                <FastImage
                    style={styles.flashSaleImage}
                    source={this.props.active ? require('../../../../../resources/images/flashSale/flash_sale_active.png') : require('../../../../../resources/images/flashSale/flash_sale_inactive.png')}
                    resizeMode={FastImage.resizeMode.contain}/>

                <View style={styles.countDownLayout}>
                    <Text style={styles.textCountDownLabel}>{this.state.countDownLabel}</Text>
                    <View style={styles.viewTime}>
                        <Text style={styles.textTime}>{DateUtil.convertSecond(this.state.diffSeconds, 'hour')}</Text>
                    </View>
                    <Text style={styles.textTimeDivider}>:</Text>
                    <View style={styles.viewTime}>
                        <Text style={styles.textTime}>{DateUtil.convertSecond(this.state.diffSeconds, 'minute')}</Text>
                    </View>
                    <Text style={styles.textTimeDivider}>:</Text>
                    <View style={styles.viewTime}>
                        <Text style={styles.textTime}>{DateUtil.convertSecond(this.state.diffSeconds, 'second')}</Text>
                    </View>
                </View>

                <View style={styles.progressBarLayout}>
                    <FastImage
                        style={styles.progressBackground}
                        source={require('../../../../../resources/images/flashSale/progress_background.png')}
                        resizeMode={FastImage.resizeMode.stretch}/>

                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#DB0079', '#FD6B00']}
                        style={[styles.progressActive, { width: this.state.progress }]}/>

                    <Text style={[styles.textProgress, { color: this.state.textProgressColor }]}>
                        {this.state.textProgress}
                    </Text>
                </View>
            </View>
        )
    }

    _initCountDown = () => {
        try {
            !!this.countDownSubscription && this.countDownSubscription.unsubscribe();
        }
        catch (e) {
            console.log(e);
        }
        this.countDown = timer(0,1000)
            .pipe(
                scan((current, next) => {
                    this.hasStartCountDown = true;
                    return this.diffCount - next
                }),
                takeWhile(counter => counter >= 0)
            );
    }

    _startCountDown = () => {
        this._initCountDown();
        this.countDownSubscription = this.countDown.subscribe(x => {
            if (!this || !this.mounted) return;
            if (!!this.hasStartCountDown) {
                this.setState({
                    diffSeconds: x
                });
                if (x === 0) {

                    if (!!this.props.onTimeOut) {
                        setTimeout(this.props.onTimeOut, 1000);
                    }
                    this.hasStartCountDown = false;
                }
            }
        });
    }

    _getState = props => {
        let diffSeconds = 0;
        let progress = '100%';
        let textProgressColor = 'white';
        let textProgress = '';
        let numberUnit = CommonUtil.dealSlotUnit(props.numberUnit);
        try {
            diffSeconds = moment().diff(moment.utc(props.time).local(), 'seconds');
            if (diffSeconds < 0) diffSeconds *= -1;
            // diffSeconds = moment(props.time).diff(moment(), 'seconds');
        }
        catch (e) {
            console.log(e);
        }

        try {
            progress = (props.availableNumber/props.totalNumber)*100;
            if (typeof progress !== 'number') progress = 0;
            if (progress < 50) {
                textProgressColor = COLOR_TEXT_BLACK_1;
            }
            if (progress >= 0.1) {
                textProgress = `Còn ${props.availableNumber} ${numberUnit} | ${props.highlight}`;
            }
            else if (props.totalNumber === 0){
                textProgress = '';
                progress = '100';
            }
            else {
                textProgress = 'Đã hết';
                textProgressColor = COLOR_TEXT_BLACK_1;
            }
            progress += '%';
        }
        catch (e) {
            console.log(e);
        }

        this.diffCount = diffSeconds;

        return {
            diffSeconds: diffSeconds,
            progress,
            countDownLabel: props.active ? `Sẽ kết thúc sau: ` : `Sẽ bắt đầu sau: `,
            textProgress,
            textProgressColor
        };
    }

    _handleStateChanged = state => {
        if (state === 'active') {
            this.setState(this._getState(this.props));
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._startCountDown();
        AppState.addEventListener('change', this._handleStateChanged);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleStateChanged);
        !!this.countDownSubscription && this.countDownSubscription.unsubscribe();
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.debug('FlashSaleCountDownHeader:componentWillReceiveProps: ', nextProps, this.props);
        if (
            nextProps.active !== this.props.active ||
            nextProps.availableNumber !== this.props.availableNumber ||
            nextProps.totalNumber !== this.props.totalNumber ||
            nextProps.hasTime !== this.props.hasTime ||
            (!nextProps.time || !moment.utc(nextProps.time).local().isSame(this.props.time))
        ) {
            this.setState(this._getState(nextProps));
            if (!this.hasStartCountDown) {
                this._startCountDown();
            }
        }
    }
}

FlashSaleCountDownHeader.propTypes = {
    active: PropTypes.bool,
    time: PropTypes.any,
    availableNumber: PropTypes.number,
    totalNumber: PropTypes.number,
    numberUnit: PropTypes.string,
    highlight: PropTypes.string,
    hasTime: PropTypes.bool,
    onTimeOut: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    flashSaleImage: {
        position: 'absolute',
        left: 0,
        top: DIMENSION_PADDING_TINY,
        width: '35%',
        height: 24
    },
    countDownLayout: {
        position: 'absolute',
        right: DIMENSION_PADDING_SMALL,
        top: DIMENSION_PADDING_SMALL,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCountDownLabel: {
        fontSize: DIMENSION_TEXT_SUB,
        color: COLOR_TEXT_BLACK_1
    },
    textTimeDivider: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold',
        marginLeft: 1,
        marginRight: 1
    },
    viewTime: {
        backgroundColor: 'white',
        borderRadius: DIMENSION_PADDING_TINY,
        borderColor: 'white',
        paddingLeft: DIMENSION_PADDING_TINY,
        paddingRight: DIMENSION_PADDING_TINY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTime: {
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold',
        color: COLOR_TEXT_BLACK_1,
        textAlign: 'center'
    },
    progressBarLayout: {
        flex: 1,
        height: 16,
        borderRadius: DIMENSION_RADIUS_LARGE,
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
        bottom: DIMENSION_PADDING_SMALL,
        left: DIMENSION_PADDING_SMALL,
        right: DIMENSION_PADDING_SMALL
    },
    progressBackground: {
        width: '100%',
        height: '100%'
    },
    progressActive: {
        height: '100%',
        borderRadius: DIMENSION_RADIUS_LARGE,
        position: 'absolute',
        opacity: 0.7
    },
    textProgress: {
        fontSize: 11,
        textAlign: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});