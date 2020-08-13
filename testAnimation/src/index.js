import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Animated, Easing, Dimensions } from 'react-native';
const VirtualizedListAnimated = Animated.createAnimatedComponent(FlatList);
const width = Dimensions.get('window').width;
const BUTTON_SIZE_HIDDEN = 50;
import LinearGradient from 'react-native-linear-gradient';
import ScrollButton from './ScrollButton';
import ListTimeLine from './ListTimeLine';
import ScrollHeader from './ScrollHeader';
class App extends Component {
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <ScrollHeader /> */}
                <ListTimeLine/>
                {/* <ScrollButton /> */}
            </View>
        );
    }
}

export default App;
