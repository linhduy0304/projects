import React from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Dimensions, Text, Image, StyleSheet} from 'react-native';
import {} from 'native-base';
import {
    PanGestureHandler,
    TapGestureHandler,
    PinchGestureHandler,
    ScrollView,
    Directions,
    FlingGestureHandler,
    State
} from 'react-native-gesture-handler';

import {BasePureComponent} from "../../../../common/BasePureComponent";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const containerWidth = windowWidth;
const containerHeight = windowHeight * 0.6;
const boxWidth = 120;
const boxHeight = 120;

export default class RoomViewTestingPinch extends BasePureComponent {

    pinchRef = React.createRef();

    bounceLeft;
    bounceRight;
    bounceTop;
    bounceBottom;

    constructor(props) {
        super(props);

        this._calculateBounce(1);

        this._baseScale = new Animated.Value(1);
        this._pinchScale = new Animated.Value(1);
        this._scale = Animated.multiply(this._baseScale, this._pinchScale);
        this._onPinchGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        scale: this._pinchScale
                    }
                },
            ],
            {
                useNativeDriver: true
            }
        );

        this._translateX = new Animated.Value(0);
        this._translateY = new Animated.Value(0);

        this._moveX = Animated.divide(this._translateX, this._scale);
        this._moveY = Animated.divide(this._translateY, this._scale);

        this._boxInfo = { x: 0, y: 0, width: boxWidth, height: boxHeight, scale: 1 };
        this._onPanGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this._translateX,
                        translationY: this._translateY,
                    },
                },
            ],
            { useNativeDriver: true }
        );
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <PanGestureHandler
                    onGestureEvent={this._onPanGestureEvent}
                    onHandlerStateChange={this._onPanHandlerStateChange}>

                    <Animated.View>

                        <PinchGestureHandler
                            ref={this.pinchRef}
                            onGestureEvent={this._onPinchGestureEvent}
                            onHandlerStateChange={this._onPinchHandlerStateChange}>

                            <Animated.View
                                style={{
                                    width: containerWidth,
                                    height: containerHeight,
                                    backgroundColor: '#c5c5c5',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                <Animated.View
                                    style={[
                                        styles.box,
                                        {
                                            transform: [
                                                { perspective: 10 },
                                                { scale: this._scale },
                                                { translateX: this._moveX },
                                                { translateY: this._moveY },
                                            ],
                                        }
                                    ]}
                                />
                            </Animated.View>
                        </PinchGestureHandler>

                    </Animated.View>

                </PanGestureHandler>
            </View>
        );
    }

    _calculateBounce = (scale) => {
        this.bounceLeft = (boxWidth*scale)/2 - containerWidth/2;
        this.bounceRight = containerWidth/2 - (boxWidth*scale)/2;
        this.bounceTop = (boxHeight*scale)/2 - containerHeight/2;
        this.bounceBottom = containerHeight/2 - (boxHeight*scale)/2;
    }

    _onPanHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {

            let x = this._boxInfo.x + event.nativeEvent.translationX;
            let y = this._boxInfo.y + event.nativeEvent.translationY;

            if (x < this.bounceLeft) x = this.bounceLeft;
            else if (x > this.bounceRight) x = this.bounceRight;

            if (y < this.bounceTop) y = this.bounceTop;
            else if (y > this.bounceBottom) y = this.bounceBottom;

            this._boxInfo.x = x;
            this._boxInfo.y = y;

            console.log('_onHandlerStateChange: ', event.nativeEvent, this._boxInfo, this.bounceLeft, this.bounceRight, this.bounceTop, this.bounceBottom);

            this._translateX.setOffset(this._boxInfo.x);
            this._translateX.setValue(0);
            this._translateY.setOffset(this._boxInfo.y);
            this._translateY.setValue(0);
        }
    };

    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let scale = this._boxInfo.scale * event.nativeEvent.scale;
            if (scale < 1) scale = 1;
            if (scale > 1.5) scale = 1.5;

            this._calculateBounce(scale);

            this._boxInfo.scale = scale;

            console.log('_onPinchHandlerStateChange: ', scale, event.nativeEvent, this._boxInfo);

            this._baseScale.setValue(this._boxInfo.scale);
            this._pinchScale.setValue(1);
        }
    };
}

const styles = StyleSheet.create({
    horizontalPan: {
        backgroundColor: '#f7c7c2',
        height: windowHeight,
        width: windowWidth,
        justifyContent: 'center',
        marginVertical: 10,
    },
    box: {
        width: boxWidth,
        height: boxHeight,
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: boxWidth/2
    },
});