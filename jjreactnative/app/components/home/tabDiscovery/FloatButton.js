import React from 'react'
import {Animated, Easing, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../../../common/base/BaseComponent";
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_SMALL} from "../../../resources/dimens";
import {StringUtil} from '../../../utils/string-util'
import {CommonUtil} from "../../../utils/common-utils";
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {ZINDEX} from "../../../NumberConstant";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const BUTTON_SIZE = 72;
const BUTTON_SIZE_HIDDEN = 54;

export default class FloatButton extends BaseComponent {

    translateX = new Animated.Value(BUTTON_SIZE_HIDDEN);
    currentVisibleState = 'hide';
    didInit = false;

    render() {

        if (!this.props.banner) return null;

        const buttonTranslateX = this.translateX.interpolate({
            inputRange: [0, BUTTON_SIZE_HIDDEN],
            outputRange: [0, BUTTON_SIZE_HIDDEN]
        });

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: DIMENSION_PADDING_LARGE,
                    right: DIMENSION_PADDING_SMALL,
                    zIndex: ZINDEX.TAB_DISCOVERY_FLOAT_BUTTON,
                    transform: [
                        {
                            translateX: buttonTranslateX
                        }
                    ]
                }}>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this._onBannerClicked}>
                    <FastImage
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.banner.getIn(['image', 'link'], ''), BUTTON_SIZE, BUTTON_SIZE))}
                        style={{
                            width: BUTTON_SIZE,
                            height: BUTTON_SIZE
                        }}
                        resizeMode={FastImage.resizeMode.contain}/>
                </TouchableOpacity>

            </Animated.View>
        )
    }

    _startHide = () => {
        if (!this.mounted || this.currentVisibleState === 'hide') return;
        try {
            if (!!this.startAnim) this.startAnim.stop();
            this.currentVisibleState = 'hide';
            this.stopAnim = Animated.timing(this.translateX, {
                toValue: BUTTON_SIZE_HIDDEN,
                easing: Easing.linear(),
                duration: 200,
                useNativeDriver: true
            });
            this.stopAnim.start();
        } catch (e) {
            console.log(e);
        }
    }

    _startShow = () => {
        if (!this.mounted || this.currentVisibleState === 'show') return;
        try {
            if (!!this.stopAnim) this.stopAnim.stop();
            this.currentVisibleState = 'show';
            this.startAnim = Animated.timing(this.translateX, {
                toValue: 0,
                easing: Easing.linear(),
                duration: 200,
                useNativeDriver: true
            });
            this.startAnim.start();
        } catch (e) {
            console.log(e);
        }
    }

    _onBannerClicked = () => {
        if (StringUtil.isEmpty(this.props.banner)) return;
        this._logClicked();

        const deeplink = this.props.banner.get('deeplink');

        if (!StringUtil.isEmpty(deeplink)) {
            CommonUtil.openLink(this.props.navigation, deeplink);
            return;
        }

        const targetUrl = this.props.banner.get('target_url');
        if (!StringUtil.isEmpty(targetUrl)) {
            CommonUtil.openLink(this.props.navigation, targetUrl);
        }
    }

    _logClicked = () => {
        try {
            AnalyticsUtil.logNormalEvent(
                'banner_clicked',
                {
                    position: this.props.banner.getIn(['banner_position', 'display']),
                    name: this.props.banner.getIn(['banner_position', 'name'])
                },
                'banner'
            )
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => {
            this._startShow();
            this.didInit = true;
        }, 4000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.banner && !this.props.banner) return true;
        if (!nextProps.banner && !!this.props.banner) return true;
        if (!nextProps.banner.equals(this.props.banner)) return true;
        return false;
    }
}

FloatButton.propTypes = {
    navigation: PropTypes.any,
    banner: PropTypes.any
}
