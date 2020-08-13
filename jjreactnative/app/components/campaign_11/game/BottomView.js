import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from "react-native";
import FastImage from 'react-native-fast-image'

import FadeInView from "../../common/view/FadeInView";
import {SFUFont} from "../sfu-font-util";
import {BaseComponent} from "../../common/BaseComponent";
import NotiBadge from './NotiBadge';

const {width} = Dimensions.get('window');
const SCALABLE = width / 375;
const TUT_HEIGHT = SCALABLE * 75;
const TUT_WIDTH = SCALABLE * 124;

export default class BottomView extends BaseComponent {

    render() {

        return (
            <FadeInView
                style={{
                    position: 'absolute',
                    bottom: this.props.sizeStyle.size_8,
                    left: this.props.sizeStyle.size_16,
                    right: this.props.sizeStyle.size_16
                }}>
                <View style={styles.bottomView}>
                    <View
                        style={{
                            flexDirection: 'column',
                            height: TUT_HEIGHT,
                            width: TUT_WIDTH,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        <FastImage
                            source={require('../../../resources/game/background_more_turn.png')}
                            style={{
                                width: TUT_WIDTH,
                                height: TUT_HEIGHT
                            }}
                            resizeMode={FastImage.resizeMode.stretch}/>

                        <View style={{position: 'absolute'}}>
                            <Text
                                style={{
                                    ...SFUFont.demi,
                                    fontSize: this.props.sizeStyle.size_12,
                                    color: 'white'
                                }}>
                                SỐ LƯỢT: {this.props.turnCount}
                            </Text>

                            <TouchableOpacity
                                style={{
                                    marginTop: 3
                                }}
                                activeOpacity={0.8}
                                onPress={this.props.onGetMoreTurnClicked}>

                                <Text
                                    style={{
                                        ...SFUFont.demi,
                                        fontSize: this.props.sizeStyle.size_12,
                                        color: 'white'
                                    }}>
                                    Thêm lượt?
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <View style={{marginRight: this.props.sizeStyle.size_8}}>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.props.onOpenNewActivityClicked}>
                                <FastImage
                                    source={require('../../../resources/game/button_noti.png')}
                                    style={{
                                        width: 53,
                                        height: 53
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}/>
                            </TouchableOpacity>

                            {
                                !!this.props.newActivityCount &&
                                this.props.newActivityCount > 0 &&
                                <NotiBadge count={this.props.newActivityCount}/>
                            }
                        </View>

                        <View style={{marginRight: this.props.sizeStyle.size_8}}>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.props.onOpenGiftListClicked}>
                                <FastImage
                                    source={require('../../../resources/game/button_gift.png')}
                                    style={{
                                        width: 53,
                                        height: 53
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}/>
                            </TouchableOpacity>

                            {
                                !!this.props.newGiftCount &&
                                this.props.newGiftCount > 0 &&
                                <NotiBadge count={this.props.newGiftCount}/>
                            }
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.props.onOpenGameIntroClicked}>
                            <FastImage
                                source={require('../../../resources/game/button_intro.png')}
                                style={{
                                    width: 53,
                                    height: 53
                                }}
                                resizeMode={FastImage.resizeMode.contain}/>
                        </TouchableOpacity>

                    </View>
                </View>

            </FadeInView>
        )
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.turnCount !== this.props.turnCount) return true;
        if (nextProps.newActivityCount !== this.props.newActivityCount) return true;
        if (nextProps.newGiftCount !== this.props.newGiftCount) return true;

        return false;
    }
}

const styles = StyleSheet.create({
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
});

BottomView.propTypes = {
    scalable: PropTypes.any,
    sizeStyle: PropTypes.any,
    turnCount: PropTypes.any,
    newActivityCount: PropTypes.any,
    newGiftCount: PropTypes.any,
    onGetMoreTurnClicked: PropTypes.any,
    onOpenNewActivityClicked: PropTypes.any,
    onOpenGiftListClicked: PropTypes.any,
    onOpenGameIntroClicked: PropTypes.any
};