import { Text } from 'native-base';
import { View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER_XX
} from "../../../resources/dimens";
import {StringUtil} from '../../../utils/string-util'
import {textWhiteShadow} from "../../../resources/styles";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const { width } = Dimensions.get('window');

export default class HeaderMallDetail extends BaseComponent {

    render() {
        if (this.props.mall === undefined || this.props.mall === null) return null;

        return (
            <View style={{width: width, height: width/2}}>
                <FastImage
                    style={{width: '100%', height: width/2}}
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.mall.get('cover_img', ''), width))}
                    resizeMode={FastImage.resizeMode.cover}/>

                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.0)']}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 0.5, y: 0.0 }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        top: '50%'
                    }} />

                <View style={{
                    position: 'absolute',
                    bottom: DIMENSION_PADDING_MEDIUM,
                    left: DIMENSION_PADDING_MEDIUM,
                    right: DIMENSION_PADDING_MEDIUM,
                }}>
                    <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_HEADER_XX, fontWeight: 'bold'}]}
                          numberOfLines={1}>
                        {this.props.mall.get('name', '')}
                    </Text>
                    <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_CONTENT, marginTop: DIMENSION_PADDING_TINY}]}>
                        {this.props.mall.get('full_address', '')}
                    </Text>
                </View>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.mall !== undefined && this.props.mall === undefined) return true;
        if (nextProps.mall === undefined) return false;
        if (this.props.mall === undefined) return false;
        if (nextProps.mall.get('id') !== this.props.mall.get('id')) return true;
        return false;
    }
}

HeaderMallDetail.propTypes = {
    mall: PropTypes.any
}
