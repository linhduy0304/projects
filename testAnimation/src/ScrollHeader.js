import React, { Component } from 'react';
//import react in our code.
import { Image, StyleSheet, View, Animated, Text, Platform, FlatList, Dimensions, Easing } from 'react-native';
//import all the components we are going to use.

const Header_Maximum_Height = 200;
//Max Height of the Header
const Header_Minimum_Height = 50;
const width = Dimensions.get('window').width;

//Min Height of the Header
export default class ScrollHeader extends Component {
    scrollYPosition = 0;
    constructor() {
        super();
        this.AnimatedHeaderValue = new Animated.Value(0);
        this.AnimatedButtonValue = new Animated.Value(0);
    }

    _startHide = () => {
        if (this.currentVisibleState === 'hide') return;
        try {
            console.log('hide');
            if (!!this.startAnim) this.startAnim.stop();
            this.currentVisibleState = 'hide';
            this.stopAnim = Animated.timing(this.AnimatedButtonValue, {
                toValue: 50,
                easing: Easing.linear(),
                duration: 200,
                useNativeDriver: true
            });
            this.stopAnim.start();
        } catch (e) {
            console.log(e);
        }
    };

    _startShow = () => {
        if (this.currentVisibleState === 'show') return;
        try {
            console.log('show');
            if (!!this.stopAnim) this.stopAnim.stop();
            this.currentVisibleState = 'show';
            this.startAnim = Animated.timing(this.AnimatedButtonValue, {
                toValue: 0,
                easing: Easing.linear(),
                duration: 200,
                useNativeDriver: true
            });
            this.startAnim.start();
        } catch (e) {
            console.log(e);
        }
    };

    _onTabDiscoveryScrollable = e => {
        try {
            const cal = e.nativeEvent.contentOffset.y - this.scrollYPosition;
            this.scrollYPosition = e.nativeEvent.contentOffset.y;
            if (cal === 0) {
                return;
            }
            if (cal > 0) this._startHide();
            else this._startShow();
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
            outputRange: ['red', '#00BCD4'],
            extrapolate: 'clamp'
        });
        const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
            outputRange: [Header_Maximum_Height, Header_Minimum_Height],
            extrapolate: 'clamp'
        });
        const opacity = this.AnimatedHeaderValue.interpolate({
            inputRange: [1, 80],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        const translate = this.AnimatedButtonValue.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 30]
            // extrapolate: 'clamp'
        });

        const opacityText = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        const top = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, 80],
            outputRange: [50, 15],
            extrapolate: 'clamp'
        });

        const fontSize = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, 80],
            outputRange: [50, 15],
            extrapolate: 'clamp'
        });
        const left = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, 80],
            outputRange: [50, 15],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.MainContainer}>
                <FlatList
                    scrollEventThrottle={16}
                    data={['', '', '', '', '', '', '', '', '', '', '', '']}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: this.AnimatedHeaderValue
                                    }
                                }
                            }
                        ],
                        {
                            listener: this._onTabDiscoveryScrollable
                        }
                    )}
                    renderItem={item => <Text style={{ marginVertical: 50 }}>dasfasfd</Text>}
                    bounces={false}
                />

                <Animated.View
                    style={[
                        styles.Header,
                        {
                            height: AnimateHeaderHeight,
                            backgroundColor: AnimateHeaderBackgroundColor
                        }
                    ]}
                >
                    <Animated.View style={{ opacity }}>
                        <Animated.Image
                            style={{ height: 100, width: 100, borderRadius: 50 }}
                            source={{
                                uri:
                                    'https://scontent.fhan1-1.fna.fbcdn.net/v/t1.0-1/p320x320/50565960_1914434462019650_1225408002668888064_n.jpg?_nc_cat=107&_nc_oc=AQndsoVkj5ek4O2cN9Ok4RJoxkWFUQw2P91fGp-XGadO5WgeIQxmurEUQLEAKiDbu28&_nc_ht=scontent.fhan1-1.fna&oh=efd9426203ba100b624658506107b717&oe=5DD85214'
                            }}
                        />
                        <Animated.Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize,
                                position: 'absolute',
                                left
                            }}
                        >
                            ddddsa
                        </Animated.Text>
                    </Animated.View>
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,

                        transform: [
                            {
                                translateX: translate
                            }
                        ]
                    }}
                >
                    <View style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
                        <Text>dddd</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 20 : 0
    },
    Header: {
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        width,
        top: Platform.OS == 'ios' ? 20 : 0
    },
    HeaderInsideText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    },
    TextViewStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        margin: 5,
        padding: 7
    }
});
