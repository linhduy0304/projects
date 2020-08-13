import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import React  from 'react';
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from '../../../../resources/colors';
import HeaderSection from '../../../common/HeaderSection';
import {
    DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {StringUtil} from '../../../../utils/string-util'
import {BaseComponent} from "../../../common/BaseComponent";
import {buildImageSource, IMAGE_INTERNET} from "../../../../utils/image-util";

export default class ProductSection extends BaseComponent {

    render() {
        console.log('ProductSection:render', this.props);
        const productCount = this.props.product.getIn(['meta', 'total_count']);
        if (productCount < 1) return;
        return (
            <View style={{ backgroundColor: 'white' }}>
                {/* Title */}
                <HeaderSection
                    customTitle={() => {
                        return (
                            <Text style={{ fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER }}>
                                Sản phẩm giảm giá
                                <Text style={{ color: COLOR_TEXT_INACTIVE }}>
                                    ({productCount})
                                </Text>
                            </Text>
                        )
                    }}
                    onShowAll={productCount > 10 ? this._onShowAll : undefined}
                />
                {/* Description */}
                <ScrollView showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={{ backgroundColor: 'white', paddingTop: DIMENSION_PADDING_MEDIUM, paddingBottom: DIMENSION_PADDING_MEDIUM}}>
                    {
                        this.props.product.get('objects', []).map((product, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('SaleProductDetail', { position: i, products: this.props.product.get('objects').toJS() })
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        paddingRight: DIMENSION_PADDING_MEDIUM,
                                        paddingLeft: i === 0 ? DIMENSION_PADDING_MEDIUM:0
                                    }} key={'product_' + i}
                                >
                                    <View style={{width: 144}}>
                                        <View style={styles.imageBackground}>
                                            <FastImage
                                                style={styles.imageBackground}
                                                resizeMode={FastImage.resizeMode.cover}
                                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(product.getIn(['images', 0, 'link'], ''), 144))}/>
                                            {
                                                productCount > 10 && i === 9 &&
                                                <View style={styles.backgroundOverlayItemCount}>
                                                    <Text style={styles.textViewOverlayLastItem}>
                                                        +{productCount - 10}
                                                    </Text>
                                                </View>
                                            }
                                        </View>

                                        <View style={{ marginTop: 8 }}>
                                            <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                                                  numberOfLines={1}>
                                                {product.get('title', '')}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: COLOR_TEXT_INACTIVE, textDecorationLine: 'line-through', fontSize: DIMENSION_TEXT_SUB }}>
                                                    {StringUtil.numberWithCommas(product.get('original_price', 0))}
                                                </Text>
                                                <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT }}>
                                                    {StringUtil.numberWithCommas(product.get('discounted_price', 0))}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                {/* Bottom space */}
                <View style={{ backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE }}/>

            </View >
        )
    }

    _onShowAll = () => {
        this.props.navigation.navigate('AllSaleProduct', { dSlug: this.props.dealSlug })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.product !== undefined && this.props.product === undefined;
    }
}

ProductSection.propTypes = {
    dealSlug: PropTypes.string,
    deal: PropTypes.object,
    product: PropTypes.object,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    imageBackground: {
        height: 144,
        width: '100%',
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 0.1,
        overflow: 'hidden'

    },
    backgroundOverlayItemCount: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textViewOverlayLastItem: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
});


