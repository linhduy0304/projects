import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { View, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import EventItem from './EventItem'
import {BaseComponent} from "../BaseComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";

const { width } = Dimensions.get('window');
let height = width * 0.25;

class Event extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }

        if (height < 95) height = 95;
    }

    render() {
        const { entries } = this.props;
        if (!entries || entries.size < 1) return null;

        if (entries.size === 1) this.state.activeIndex = 0;

        return (
            <View>
                {
                    this._renderSlider(entries)
                }

                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: DIMENSION_RADIUS_MEDIUM,
                    borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
                    position: 'absolute',
                    top: -2,
                    left: 16,
                    paddingLeft: DIMENSION_PADDING_TINY,
                    paddingRight: DIMENSION_PADDING_TINY,
                    paddingBottom: 1,
                    paddingTop: 0
                }}>
                    <Text style={{
                        padding: 0,
                        fontSize: 10,
                        color: entries.getIn([this.state.activeIndex, 'bg_color'], COLOR_PRIMARY),
                        backgroundColor: 'transparent',
                    }}>
                        Đang diễn ra...
                    </Text>
                </View>
            </View>
        )
    }

    _renderSlider = (entries) => {
        if (entries.size === 1) {
            return this._renderItem({item: entries.get(0).toJS()});
        }
        return (
            <View>
                <Carousel
                    firstItem={0}
                    autoplay={true}
                    loop={true}
                    inactiveSlideScale={1.0}
                    inactiveSlideOpacity={0.8}
                    data={entries.toJS()}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={this._onSnapToItem}
                />
                <Pagination
                    dotsLength={entries.size}
                    activeDotIndex={this.state.activeIndex}
                    containerStyle={{
                        position: 'absolute',
                        top: 8,
                        right: 16,
                        paddingTop: 0,
                        paddingRight: 0,
                    }}
                    dotContainerStyle={{
                        marginLeft: 2,
                        marginRight: 2,
                    }}
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    inactiveDotStyle={{
                        borderColor: 'white',
                        borderWidth: 1,
                        backgroundColor: 'transparent'
                    }}
                    inactiveDotOpacity={1.0}
                    inactiveDotScale={1.0}
                />
            </View>
        )
    }

    _onSnapToItem = (index) => this.setState({activeIndex: index});

    _renderItem = ({ item, index }) => <EventItem event={item}
                                                  width={width}
                                                  height={height}
                                                  navigation={this.props.navigation}/>;

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.entries && this.props.entries === undefined) return true;
        if (nextProps.entries === undefined) return false;
        if (!nextProps.entries.equals(this.props.entries)) return true;
        if (nextState.activeIndex !== this.state.activeIndex) return true;
        return false;
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state.homeReducer.get('events'),
    }
};

export default connect(mapStateToProps)(Event);

