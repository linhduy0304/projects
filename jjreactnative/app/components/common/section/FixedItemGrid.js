
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import FastImage from 'react-native-fast-image'

import PropTypes from 'prop-types'
import {StringUtil} from "../../../utils/string-util";
import {
    DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_X,
    DIMENSION_TEXT_HEADER_XX
} from "../../../resources/dimens";
import {BaseComponent} from "../BaseComponent";
import {textWhiteShadow} from '../../../resources/styles'
import {AnalyticsUtil} from "../analytics/analytics";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";
import DealTypeFlag from "../../../common/view/flag/DealTypeFlag";

export default class FixedItemGrid extends BaseComponent {

    render() {
        const deal = this.props.deal;
        if (!!!deal) return null;
        let image = deal.getIn(['images', 0, 'link'], '');
        const brand_name = deal.getIn(['brand', 'brand_name'], '');
        const highlight = deal.get('highlight_title', '');

        let imageSize = !!this.props.width ? this.props.width * 1.5 : 0;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.goToDealDetail}
                style={{width: this.props.width, backgroundColor: 'transparent'}}>
                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: DIMENSION_RADIUS_MEDIUM
                    }}>

                    <FastImage
                        style={styles.image}
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(image, imageSize))}
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
                            top: '50%',
                            borderBottomLeftRadius: DIMENSION_RADIUS_MEDIUM,
                            borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
                        }}/>

                    <View style={{
                        position: 'absolute',
                        bottom: DIMENSION_PADDING_SMALL,
                        left: DIMENSION_PADDING_SMALL,
                        right: DIMENSION_PADDING_SMALL,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'
                    }}>

                        <DealTypeFlag
                            deal_type={deal.get('deal_type')}
                            isDelivery={deal.get('use_delivery', false)}/>

                        <Text numberOfLines={1}
                              style={[textWhiteShadow, {fontSize: !!this.props.smallItem ? DIMENSION_TEXT_CONTENT : DIMENSION_TEXT_HEADER}]}>
                            {brand_name}
                        </Text>

                        <Text numberOfLines={1}
                              uppercase={true}
                              style={[textWhiteShadow, {fontSize: !!this.props.smallItem ? DIMENSION_TEXT_HEADER_X : DIMENSION_TEXT_HEADER_XX, fontWeight: 'bold'}]}>
                            {highlight}
                        </Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    goToDealDetail = () => {
        if (this.props.deal.get('slug') !== undefined) {
            this.props.navigation.push('DealDetail', { "deal": this.props.deal.toJS(), source_deal_detail: this.props.path });
            AnalyticsUtil.logDealCellOpenToDealDetail(
                this.props.path,
                this.props.deal.get('slug', ''),
                this.props.deal.getIn(['brand', 'brand_slug'], ''),
                this.props.deal.get('deal_type', ''),
                'hot'
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.width !== this.props.width) return true;
        if (!!nextProps.deal && this.props.deal === undefined) return true;
        if (nextProps.deal === undefined && this.props.deal === undefined) return false;
        if (nextProps.deal.get('id') !== this.props.deal.get('id')) return true;
        if (nextProps.deal.get('is_following') !== this.props.deal.get('is_following')) return true;
        if (nextProps.deal.get('is_saved') !== this.props.deal.get('is_saved')) return true;
        if (nextProps.deal.getIn(['images', 0, 'link'], '') !== this.props.deal.getIn(['images', 0, 'link'], '')) return true;
        return false;
    }
}

FixedItemGrid.propTypes = {
    width: PropTypes.number,
    deal: PropTypes.any,
    path: PropTypes.any,
    navigation: PropTypes.any,
    smallItem: PropTypes.any
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: DIMENSION_RADIUS_MEDIUM
    }
});
