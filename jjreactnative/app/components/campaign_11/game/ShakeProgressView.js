import React from 'react'
import {View, Animated, Easing, Platform} from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from "react-native-linear-gradient";

import {BasePureComponent} from "../../common/BasePureComponent";
import {Sound} from '../../common/Sound'
import {ZINDEX} from "../../../NumberConstant";

const STATE_DISABLE = -1;
const STATE_ENABLE = 1;
const STATE_PAUSE = 3;
const ios = Platform.OS === 'ios';

export default class ShakeProgressView extends BasePureComponent {

    progressValue;
    translateX;
    progressAnimateValue = 0;

    shakeState = STATE_ENABLE;
    intervalRunning = false;

    constructor(props) {
        super(props);
        this.progressValue = new Animated.Value(0);
        this.translateX = this.progressValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, props.width]
        });
        this.progressValue.addListener(this._onProgressValueChanged)
    }

    render() {

        return (
            <View
                style={{
                    width: this.props.width,
                    height: 3,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    zIndex: ZINDEX.SHAKE_PROGRESS_VIEW
                }}>

                <LinearGradient
                    colors={['#C21313', '#FFCB00', '#15EB00']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                        width: this.props.width,
                        height: 3,
                        position: 'absolute'
                    }}/>

                <Animated.View
                    style={{
                        borderRadius: 1,
                        width: this.props.width,
                        height: 3,
                        backgroundColor: '#c62a3b',
                        transform: [{translateX: this.translateX}],
                        zIndex: ZINDEX.SHAKE_PROGRESS_OVERLAY
                    }}>
                    <View
                        style={{
                            width: 3,
                            height: 3,
                            borderRadius: 1.5,
                            backgroundColor: '#c62a3b'
                        }}/>
                </Animated.View>

            </View>
        )
    }

    //progressbar value change listener
    _onProgressValueChanged = (e) => {
        if (!e || e.value === 0 || e.value >= 100) return;

        this.progressAnimateValue = e.value;
        if (this.progressAnimateValue > 0 && this.progressAnimateValue < 95) {
            !!this.props.isEnableSound && Sound.playShaking();
            if (!this.intervalRunning) {
                this._downTranslationInterval();
                this.intervalRunning = true;
            }
        }
        else if (this.progressAnimateValue <= 1) {
            !!this.props.isEnableSound && Sound.playBackground();
        }
    }

    //shake event listener
    _onShakeProgressViewListener = (e) => {
        if (this.shakeState === STATE_DISABLE || this.shakeState === STATE_PAUSE) return;
        const nextProgress = this.progressAnimateValue + e.power*(ios ? 8 : 2);
        if (nextProgress >= 95) {
            this.shakeState = STATE_PAUSE;
            !!this.props.onStartRunning && this.props.onStartRunning();
            Animated.timing(this.progressValue).stop();
            this.progressValue.setValue(100);
            !!this.props.isEnableSound && Sound.playRunningGift();
            return;
        }
        this.progressValue.setValue(nextProgress);
        Animated.timing(this.progressValue).stop();
        this._downTranslationInterval();
    }

    _downTranslationInterval = () => {
        if (!this.mounted || this.shakeState === STATE_PAUSE) {
            return;
        }

        if (this.progressAnimateValue <= 0 || this.progressAnimateValue >= 95) {
            this.intervalRunning = false;
            return;
        }

        Animated.timing(
            this.progressValue,
            {
                toValue: 0,
                duration: 15000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(this._downTranslationInterval);
    }

    _onReset = () => {
        this.progressAnimateValue = 0;
        this.progressValue.setValue(0);
        this.shakeState = STATE_ENABLE;
        this.intervalRunning = false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.setShakeProgressViewListener(this._onShakeProgressViewListener, this._onReset);
    }

    componentWillUnmount() {
        this.progressValue.removeListener(this._onProgressValueChanged);
        clearTimeout(this.shakeSubscription);
        this.shakeSubscription = undefined;
        super.componentWillUnmount();
    }
}

ShakeProgressView.propTypes = {
    width: PropTypes.any,
    setShakeProgressViewListener: PropTypes.any,
    onStartRunning: PropTypes.any,
    isEnableSound: PropTypes.any
}