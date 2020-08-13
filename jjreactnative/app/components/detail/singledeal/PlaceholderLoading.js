import React from 'react'
import {Animated, Dimensions} from 'react-native'
import {View} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {BaseComponent} from "../../common/BaseComponent";
import {COLOR_GRAY_BG, COLOR_GRAY_BG_2} from "../../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";

const {width} = Dimensions.get('window');

export class PlaceholderLoading extends BaseComponent {

    beginShimmerPosition = new Animated.Value(-1);

    render() {

        const imageHeight = 150;
        const contentHeight = 18;
        const animateWidth = 60;

        let outputRange = [0, width - animateWidth];

        const linearTranslate = this.beginShimmerPosition.interpolate({
            inputRange: [-1, 1],
            outputRange: outputRange
        });

        return (
            <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG, padding: DIMENSION_PADDING_MEDIUM}}>

                <View style={{width: '100%', height: imageHeight}}>
                    <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG_2}}/>
                    <Animated.View
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            width: animateWidth,
                            height: imageHeight,
                            transform: [
                                {
                                    translateX: linearTranslate,
                                }
                            ]
                        }}
                    >
                        <LinearGradient
                            style={{flex: 1}}
                            start={{x: 0.0, y: 1.0}}
                            end={{x: 1.0, y: 1.0}}
                            locations={[0.0, 0.5, 1.0]}
                            colors={[COLOR_GRAY_BG_2, '#efefef', COLOR_GRAY_BG_2]}
                        />
                    </Animated.View>
                </View>

                <View style={{width: '100%', height: contentHeight, marginTop: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{flex: 1, height: contentHeight, backgroundColor: COLOR_GRAY_BG_2}}/>
                    <Animated.View
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            width: animateWidth,
                            height: contentHeight,
                            transform: [
                                {
                                    translateX: linearTranslate
                                }
                            ]
                        }}
                    >
                        <LinearGradient
                            style={{flex: 1}}
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0.0, 0.5, 1.0]}
                            colors={[COLOR_GRAY_BG_2, '#efefef', COLOR_GRAY_BG_2]}
                        />
                    </Animated.View>
                </View>

                <View style={{width: '100%', height: contentHeight, marginTop: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{flex: 1, height: contentHeight, backgroundColor: COLOR_GRAY_BG_2}}/>
                    <Animated.View
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            width: animateWidth,
                            height: contentHeight,
                            transform: [
                                {
                                    translateX: linearTranslate
                                }
                            ]
                        }}
                    >
                        <LinearGradient
                            style={{flex: 1}}
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0.0, 0.5, 1.0]}
                            colors={[COLOR_GRAY_BG_2, '#efefef', COLOR_GRAY_BG_2]}
                        />
                    </Animated.View>
                </View>

                <View style={{width: '100%', height: contentHeight, marginTop: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{flex: 1, height: contentHeight, backgroundColor: COLOR_GRAY_BG_2}}/>
                    <Animated.View
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            width: animateWidth,
                            height: contentHeight,
                            transform: [
                                {
                                    translateX: linearTranslate
                                }
                            ]
                        }}
                    >
                        <LinearGradient
                            style={{flex: 1}}
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0.0, 0.5, 1.0]}
                            colors={[COLOR_GRAY_BG_2, '#efefef', COLOR_GRAY_BG_2]}
                        />
                    </Animated.View>
                </View>

                <View style={{width: '100%', height: contentHeight, marginTop: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{flex: 1, height: contentHeight, backgroundColor: COLOR_GRAY_BG_2}}/>
                    <Animated.View
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            width: animateWidth,
                            height: contentHeight,
                            transform: [
                                {
                                    translateX: linearTranslate
                                }
                            ]
                        }}
                    >
                        <LinearGradient
                            style={{flex: 1}}
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0.0, 0.5, 1.0]}
                            colors={[COLOR_GRAY_BG_2, '#efefef', COLOR_GRAY_BG_2]}
                        />
                    </Animated.View>
                </View>

            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this._loopAnimated();
    }

    _loopAnimated = () => {
        const shimmerAnimated = this._getAnimated();
        shimmerAnimated.start(({finished}) => {
            if (finished) {
                this._loopAnimated();
            }
        });
    }

    _getAnimated = () => {
        this.beginShimmerPosition.setValue(-1);
        return Animated.timing(this.beginShimmerPosition, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true
        });
    };

    componentWillUnmount() {
        super.componentWillUnmount();
        const shimmerAnimated = this._getAnimated();
        shimmerAnimated.stop();
    }

}