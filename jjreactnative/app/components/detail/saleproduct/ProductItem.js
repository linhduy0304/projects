import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "../../common/BaseComponent";
import {StyleSheet, TouchableHighlight, View} from "react-native";
import FastImage from 'react-native-fast-image'
import {Text} from "native-base";

import {StringUtil} from "../../../utils/string-util";
import {DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import HighLightView from "../../common/HighLightView";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

export default class ProductItem extends BaseComponent {

    render() {

        const {item} = this.props;

        return (
            <TouchableHighlight
                underlayColor='white'
                onPress={this._onPress}
                style={[styles.cellWrapper, {
                    width: this.props.width,
                    height: this.props.height
                }]}
            >
                <View style={{ flex: 1 }}>

                    <FastImage
                        style={{ flex: 1 }}
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(item.images[0].link, 0, this.props.height))}
                        resizeMode={FastImage.resizeMode.cover}/>


                    <View style={{ marginTop: DIMENSION_PADDING_SMALL }}>
                        <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                            {item.title}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: COLOR_TEXT_INACTIVE, textDecorationLine: 'line-through', fontSize: DIMENSION_TEXT_CONTENT }}>
                                {this._numberWithCommas(item.original_price)}
                            </Text>
                            <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT  }}>
                                {this._numberWithCommas(item.discounted_price)}
                            </Text>
                        </View>
                    </View>

                    <View style={{position: 'absolute', left: 0, bottom: 66, maxWidth: this.props.width}}>
                        <HighLightView
                            height={36}
                            contentWeight={'bold'}
                            contentText={this._saleOffPercentage(item)}
                            contentFontSize={16}
                            uppercase={true} />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _numberWithCommas = (x) => {
        if (StringUtil.isBlank(x)) return '0đ';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
    }

    _saleOffPercentage = (item) => {
        if (StringUtil.isBlank(item.discounted_price) || StringUtil.isBlank(item.original_price) || item.original_price === 0) {
            return '0%'
        } else {
            return (100 - Math.floor((item.discounted_price / item.original_price) * 100)) + '%'
        }
    }

    _onPress = () => {
        if (!!this.props.onPress) {
            this.props.onPress(this.props.item, this.props.index);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item === null || nextProps.item === undefined) return false;
        if (this.props.item === null || this.props.item === undefined || this.props.item.id === nextProps.item.id) return false;
        return true;
    }
}

ProductItem.propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    item: PropTypes.any,
    index: PropTypes.any,
    onPress: PropTypes.any
}

const styles = StyleSheet.create({
    cellWrapper: {
        padding: 8,
        marginLeft: 8,
        marginTop: 8,
        backgroundColor: 'white'
    },
    tagSquare: {
        backgroundColor: 'rgba(231,57,72,0.8)',
        paddingLeft: 16,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    tagSharp: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 15,
        borderTopWidth: 30,
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(231,57,72,0.8)'
    }
});
