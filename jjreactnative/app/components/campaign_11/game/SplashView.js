import React from 'react'
import {
    View,
    Dimensions
} from 'react-native'
import LottieView from "lottie-react-native";
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../common/BasePureComponent";
import FadeInView from "../../common/view/FadeInView";
import {getPaddingTopBar, isIphoneBunnyEar} from "../../../utils/common-utils";
import ButtonBack from "../ButtonBack";

const iphoneX = isIphoneBunnyEar();
const paddingTopBar = getPaddingTopBar();
const {width} = Dimensions.get('window');
const SCALABLE = width / 375;
const SIZE_63 = SCALABLE*63;
const LOGO_WIDTH = SCALABLE*289;
const LOGO_HEIGHT = SCALABLE*105;
const BOTTOM_HEIGHT = SCALABLE*434;

export default class SplashView extends BasePureComponent {

    render() {

        return (
            <FadeInView style={{flex: 1}}>
                <View
                    style={{
                        backgroundColor: 'transparent',
                        height: paddingTopBar + (iphoneX ? 34 : 0),
                        width: '100%'
                    }}/>

                <View
                    style={{flex: 1}}>

                    <FastImage
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        source={require('../../../resources/game/splash_bg.jpg')}
                        resizeMode={FastImage.resizeMode.cover}/>

                    {/*Top controll*/}
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            top: paddingTopBar + (iphoneX ? 66 : 32),
                            position: 'absolute',
                            left: 0
                        }}>
                        <ButtonBack onPress={this._onBackPressed}/>
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            top: SIZE_63,
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        <FastImage
                            source={require('../../../resources/game/logo_game.png')}
                            style={{
                                width: LOGO_WIDTH,
                                height: LOGO_HEIGHT
                            }}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <LottieView
                            source={require('../../../resources/lottie/loading_gray_dot.json')}
                            resizeMode={'cover'}
                            autoPlay={true}
                            loop={true}
                            speed={0.8}
                            style={{
                                width: 128,
                                marginTop: -16*SCALABLE
                            }}
                        />

                    </View>

                    <FastImage
                        style={{
                            width: '100%',
                            height: BOTTOM_HEIGHT,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                        source={require('../../../resources/game/splash_bottom.png')}
                        resizeMode={FastImage.resizeMode.cover}/>
                </View>
            </FadeInView>
        )
    }

    _onBackPressed = () => this.props.navigation.goBack();
}

SplashView.propTypes = {
    navigation: PropTypes.any
}