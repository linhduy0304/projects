import React from 'react';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from "../../common/BaseComponent";

export default class GameBackground extends BaseComponent {

    render() {

        const bottomHeight = this.props.scalable*152;

        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }}>

                <FastImage
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                    source={require('../../../resources/game/main_background.png')}
                    resizeMode={FastImage.resizeMode.cover}/>

                {
                    !this.props.hideSnowBg &&
                    <FastImage
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                        source={require('../../../resources/game/background_snow.png')}
                        resizeMode={FastImage.resizeMode.cover}/>
                }

                <FastImage
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: bottomHeight,
                        bottom: -bottomHeight/3.5,
                        left: 0,
                        right: 0
                    }}
                    source={require('../../../resources/game/snow_bottom.png')}
                    resizeMode={FastImage.resizeMode.cover}/>

            </View>
        )
    }

    shouldComponentUpdate(nextProps) {
        return false;
    }
}

GameBackground.propTypes = {
    scalable: PropTypes.any,
    hideSnowBg: PropTypes.any
}