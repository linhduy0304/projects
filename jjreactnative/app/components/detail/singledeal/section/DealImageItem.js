import React from 'react';
import PropTypes from 'prop-types'
import {Text} from "native-base";
import {TouchableOpacity, View} from "react-native";
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../../../common/BaseComponent";
import {StringUtil} from "../../../../utils/string-util";
import {COLOR_TEXT_BLACK_1} from "../../../../resources/colors";
import {DIMENSION_TEXT_HEADER} from "../../../../resources/dimens";
import {buildImageSource, IMAGE_INTERNET} from "../../../../utils/image-util";

export default class DealImageItem extends BaseComponent {

    render() {

        return (
            <TouchableOpacity
                onPress={this._onPress}
                activeOpacity={0.9}
                style={this.props.style}>
                <FastImage
                    style={{
                        flex: 1,
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                    }}
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.url, this.props.width))}
                    resizeMode={FastImage.resizeMode.cover}/>

                {
                    !!this.props.imageCount &&
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            padding: 6,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            position: 'absolute'
                        }}>
                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_HEADER,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>
                            +{this.props.imageCount}
                        </Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        this.props.onPress(this.props.position);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.url !== this.props.url) return true;
        if (nextProps.position !== this.props.position) return true;
        if (nextProps.width !== this.props.width) return true;
        return false;
    }
}

DealImageItem.propTypes = {
    url: PropTypes.any,
    imageCount: PropTypes.any,
    position: PropTypes.any,
    width: PropTypes.any,
    style: PropTypes.any,
    onPress: PropTypes.any,
}