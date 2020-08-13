import { TouchableHighlight, View, Dimensions } from "react-native";
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_LARGE, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from "../../resources/dimens";
import {StringUtil} from '../../utils/string-util'
import {textWhiteShadow} from "../../resources/styles";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

const { width } = Dimensions.get("window");

export default class ShoppingMallItem extends BaseComponent {

    render() {
        return (
            <TouchableHighlight
                underlayColor='white'
                onPress={this._onPress}>

                <View style={{
                    height: width / 2,
                    marginLeft: DIMENSION_PADDING_MEDIUM,
                    marginRight: DIMENSION_PADDING_MEDIUM,
                    borderRadius: DIMENSION_RADIUS_LARGE
                }}>

                    <FastImage
                        style={{
                            position: 'absolute',
                            borderRadius: DIMENSION_RADIUS_LARGE,
                            width: '100%',
                            height: '100%',
                        }}
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.mall.cover_img, width))}
                        resizeMode={FastImage.resizeMode.cover}/>

                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.0)']}
                        start={{ x: 0.5, y: 1.0 }}
                        end={{ x: 0.5, y: 0.0 }}
                        style={{
                            borderRadius: 8,
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: '50%',
                        }} />

                    <View style={{
                        position: 'absolute',
                        bottom: DIMENSION_PADDING_MEDIUM,
                        left: DIMENSION_PADDING_MEDIUM,
                        backgroundColor: 'transparent'
                    }}>
                        <Text style={[textWhiteShadow, { fontSize: DIMENSION_TEXT_CONTENT }]}>
                            {`${this.props.mall.deal_count} khuyến mãi`}
                        </Text>
                        <Text style={[textWhiteShadow, { fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }]}
                              uppercase={true}>
                            {this.props.mall.name}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }

    _onPress = () => {
        this.props.navigation.navigate('ShoppingMallDetail', { 'mall': this.props.mall })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.mall && this.props.mall === undefined) return true;
        if (nextProps.mall === undefined && this.props.mall === undefined) return false;
        if (nextProps.mall.id !== this.props.mall.id) return true;
        if (nextProps.mall.deal_count !== this.props.mall.deal_count) return true;
        return false;
    }
}

ShoppingMallItem.propTypes = {
    mall: PropTypes.any,
    navigation: PropTypes.any
}
