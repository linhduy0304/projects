import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Animated, Easing, Dimensions } from 'react-native';
const VirtualizedListAnimated = Animated.createAnimatedComponent(FlatList);
const width = Dimensions.get('window').width;
const BUTTON_SIZE_HIDDEN = 50;
import LinearGradient from 'react-native-linear-gradient';
class ScrollButton extends Component {
    scrollYPosition = 0;
    translateY = new Animated.Value(50);
    scrollY = new Animated.Value(0);
    currentVisibleState = 'hide';
    mounted = false;
    constructor(props) {
        super(props);

        this.state = {
            yEnd: 0,
            data: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20'
            ]
        };
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    _onTabDiscoveryScrollable = e => {
        try {
            const cal = e.nativeEvent.contentOffset.y - this.scrollYPosition;
            if (cal >= 0) this._startHide();
            else this._startShow();

            this.scrollYPosition = e.nativeEvent.contentOffset.y;
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { data } = this.state;
        const translate = this.translateY.interpolate({
            inputRange: [0, BUTTON_SIZE_HIDDEN],
            outputRange: [0, BUTTON_SIZE_HIDDEN]
        });

        const toolbarBackgroundOpacity = this.scrollY.interpolate({
            inputRange: [0, 500],
            outputRange: [0, 1]
        });

        const toolbarOpacity = this.scrollY.interpolate({
            inputRange: [-22, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const toolbarTranslateY = this.scrollY.interpolate({
            inputRange: [-24, 0],
            outputRange: [-39, 0],
            extrapolate: 'clamp'
        });
        const marginTop = this.scrollY.interpolate({
            inputRange: [0, 500],
            outputRange: [0, 200]
        });
        console.log(this.scrollY)
        return (
            <View style={{ flex: 1 }}>
                {/* <LinearGradient colors={['#bb1092', '#e85484', '#830d66']} start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 0 }}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
                    <Text>ddddd</Text>
                </LinearGradient> */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        opacity: toolbarOpacity,
                        transform: [
                            { translateY: toolbarTranslateY }
                        ]
                    }}
                >
                    <Animated.View style={{backgroundColor: 'blue'}}>
                        <Text style={{fontSize: 20}}>dddd</Text>
                        <Text style={{fontSize: 20}}>dddd</Text><Text style={{fontSize: 20}}>dddd</Text><Text style={{fontSize: 20}}>dddd</Text>
                    </Animated.View>
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 10,
                        transform: [
                            {
                                translateY: translate
                            }
                        ]
                    }}
                >
                    <TouchableOpacity style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', height: 50, width }}>
                        <Text>dddd</Text>
                    </TouchableOpacity>
                </Animated.View>
                <VirtualizedListAnimated
                    data={data}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: this.scrollY
                                    }
                                }
                            }
                        ],
                        {
                            useNativeDriver: true,
                            listener: this._onTabDiscoveryScrollable
                        }
                    )}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `____${index}`}
                />
            </View>
        );
    }

    _startHide = () => {
        if (!this.mounted || this.currentVisibleState === 'hide') return;
        console.log('hide');
        try {
            if (!!this.startAnim) this.startAnim.stop();
            this.currentVisibleState = 'hide';
            this.stopAnim = Animated.timing(this.translateY, {
                toValue: BUTTON_SIZE_HIDDEN,
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
        if (!this.mounted || this.currentVisibleState === 'show') return;
        try {
            console.log('show');

            if (!!this.stopAnim) this.stopAnim.stop();
            this.currentVisibleState = 'show';
            this.startAnim = Animated.timing(this.translateY, {
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

    
    _renderItem = ({ item }) => {
        return <Text style={{ marginVertical: 20, textAlign: 'center' }}>{item}</Text>;
    };
}

export default ScrollButton;
