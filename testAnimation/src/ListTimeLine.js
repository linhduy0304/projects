import React, { Component } from 'react';
import { View, Text, FlatList, VirtualizedList, StatusBar, Animated, Easing, Dimensions } from 'react-native';
const VirtualizedListAnimated = Animated.createAnimatedComponent(VirtualizedList);
const width = Dimensions.get('window').width;
const BUTTON_SIZE_HIDDEN = 50;
import LinearGradient from 'react-native-linear-gradient';
import Item from './Item';
class ListTimeLine extends Component {
    scrollYPosition = 0;
    translateY = new Animated.Value(50);
    scrollY = new Animated.Value(0);
    currentVisibleState = 'hide';
    mounted = false;

    feedPost;
    showTitle = new Animated.Value(0);

    constructor(props) {
        super(props);

        this.state = {
            indexActive: 0,
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

    _onScrollHandle = info => {
        // console.log(info);
        if (info && info.viewableItems && info.viewableItems.length > 1) {
            this.setState({ indexActive: info.viewableItems[0].index });
            this._showTitle();
        }
    };

    _showTitle = () => {
        this.state.showBottomCTA = true;
        if (this.bottomCTATranslationTiming) this.bottomCTATranslationTiming.stop();
        this.bottomCTATranslationTiming = Animated.timing(this.showTitle, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };

    _getItem = (data, index) => {
        return data[index];
    };

    _getItemCount = data => (!!data ? data.length : 0);

    render() {
        const { data, indexActive } = this.state;
        const translateY = this.showTitle.interpolate({
            inputRange: [0, 1],
            outputRange: [72, 0]
        });

        return (
            <View
                ref={view => {
                    this.feedPost = view;
                }}
                style={{ flex: 1, flexDirection: 'row', paddingTop: 50 }}
            >
                <View style={{ width: 2, backgroundColor: 'blue', height: 10000, position: 'absolute', left: 60 }} />
                <Animated.View
                    style={[
                        {
                            backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            top: 40,
                            left: 40,
                            paddingHorizontal: 20,
                            position: 'absolute',
                            zIndex: 100
                        },
                        {
                            transform: [{ translateY }]
                        }
                    ]}
                >
                    <Text>{indexActive}</Text>
                </Animated.View>
                <VirtualizedListAnimated
                    data={data}
                    onViewableItemsChanged={this._onScrollHandle}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `____${index}`}
                    getItem={this._getItem}
                    getItemCount={this._getItemCount}
                    onViewableItemsChanged={this._onScrollHandle}
                    onScroll={this.onScroll}
                />
            </View>
        );
    }

    onScroll = event => {
        console.log(event.nativeEvent.contentOffset.y);
    };

    onLayout = e => {
        this.feedPost.measure((fx, fy, width, height, px, py) => {
            console.log(fx, fy, width, height, px, py);
        });
    };

    _renderItem = ({ item, index }) => {
        return (
            <View onLayout={this.onLayout}>
                <Text style={{ marginVertical: 20 }}>ddddddd</Text>
            </View>
        );
    };
}

export default ListTimeLine;
