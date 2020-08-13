
import {View, TouchableOpacity} from "react-native";
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'

import {StringUtil} from "../../../utils/string-util";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_HEADER, DIMENSION_TEXT_HEADER_XX,
} from "../../../resources/dimens";
import {BaseComponent} from "../BaseComponent";
import {textWhiteShadow} from '../../../resources/styles'
import {AnalyticsUtil} from "../analytics/analytics";
import {ObjectUtil} from "../../../utils/object-utils";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";
import DealTypeFlag from '../../../common/view/flag/DealTypeFlag';

export default class FixedHorizontalItem extends BaseComponent {

    render() {
        const image = !!this.props.deal.images  && this.props.deal.images.length > 0 ? this.props.deal.images[0].link : '';
        const brand_name = !!this.props.deal.brand ? this.props.deal.brand.brand_name : '';
        const highlight = !!this.props.deal.highlight_title ? this.props.deal.highlight_title : '';
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ marginLeft: DIMENSION_PADDING_MEDIUM }}
                underlayColor='white'
                onPress={this.goToDealDetail}>
                {/* ImageView */}
                <View style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: DIMENSION_RADIUS_LARGE,
                    overflow: 'hidden',
                }}>

                    <FastImage
                        style={{
                            flex: 1,
                            position: 'absolute',
                            borderRadius: DIMENSION_RADIUS_LARGE,
                            width: '100%',
                            height: '100%'
                        }}
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(image, this.props.width))}
                        resizeMode={FastImage.resizeMode.cover}/>

                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.0)']}
                        start={{ x: 0.5, y: 1.0 }}
                        end={{ x: 0.5, y: 0.0 }}
                        style={{
                            borderRadius: DIMENSION_RADIUS_LARGE,
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: '50%',
                        }} />

                    <View style={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'
                    }}>

                        <DealTypeFlag
                            style={{marginBottom: DIMENSION_PADDING_SMALL}}
                            deal_type={this.props.deal.deal_type}
                            isDelivery={this.props.deal.use_delivery}/>

                        <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_HEADER, marginTop: 2}]}
                              numberOfLines={1}>
                            {brand_name}
                        </Text>

                        <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_HEADER_XX, fontWeight: 'bold'}]}
                              numberOfLines={1}
                              uppercase={true}>
                            {highlight}
                        </Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    goToDealDetail = () => {
        const deal = this.props.deal;
        this.props.navigation.navigate('DealDetail', { "deal": deal, source_deal_detail: this.props.path });

        AnalyticsUtil.logDealCellOpenToDealDetail(
            this.props.path,
            ObjectUtil.getValue(deal, '', ['slug']),
            ObjectUtil.getValue(deal, '', ['brand', 'brand_slug']),
            ObjectUtil.getValue(deal, '', ['deal_type']),
            'horizontal_small_list'
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !!nextProps.deal && (this.props.deal === undefined || nextProps.deal.id !== this.props.deal.id)
    }
}

FixedHorizontalItem.propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    deal: PropTypes.any, //as js
    path: PropTypes.any,
    navigation: PropTypes.object,
}