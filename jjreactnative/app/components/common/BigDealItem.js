import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Text } from 'native-base';
import React from "react";
import FastImage from 'react-native-fast-image'

import DividerLine from './DividerLine';
import FollowButton from "./FollowButton";
import SaveDealButton from "./SaveDealButton";
import {BaseComponent} from "./BaseComponent";
import {StringUtil} from '../../utils/string-util'
import PropTypes from 'prop-types'
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import DealTypeTitle from "./DealTypeTitle";
import BigDealHighlightView from './BigDealHighlightView'
import DealItemChosenTagView from './DealItemChosenTagView'
import DealItemRateView from './DealItemRateView'
import {ObjectUtil} from '../../utils/object-utils'
import {AnalyticsUtil} from '../../components/common/analytics/analytics'
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";
import DeliveryFlag from '../../common/view/flag/DeliveryFlag';


const { width } = Dimensions.get('window');

export default class BigDealItem extends BaseComponent {

    render() {
        if (this.props.item !== undefined) {
            const { item } = this.props;
            let photoUrl = !!item.images && item.images.length > 0 ? item.images[0].thumbnail : '';
            let brandLogo = ObjectUtil.getValue(item, '', ['brand','image']);
            let address = ObjectUtil.getValue(item, '', ['store']);
            let rating = ObjectUtil.getValue(item, 0, ['rating']);
            let rate = ObjectUtil.getValue(item, 0, ['rate']);
            return (
                <TouchableOpacity activeOpacity={0.9} onPress={this._goToDealDetail}>
                    <View style={{ backgroundColor: 'white' }}>
                        {/* Header View*/}
                        <View style={{ height: 50, justifyContent: 'center' }} >
                            <TouchableOpacity
                                onPress={this.goToBrandDetail}
                                style={{
                                    width: 100,
                                    height: 30,
                                    position: 'absolute',
                                    alignSelf: 'center'
                                }}>
                                <FastImage
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(brandLogo, 100, 0))}
                                    resizeMode={FastImage.resizeMode.contain}/>
                            </TouchableOpacity>

                            <FollowButton
                                navigation={this.props.navigation}
                                deal={item}
                                iconSize={16}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    height: 50,
                                    width: 50
                                }}
                            />
                        </View>

                        {/* Divider */}
                        <DividerLine />

                        <View style={{ height: width / 2, }}>

                            {/* ImageView */}
                            <FastImage
                                style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(photoUrl, width, 0))}
                                resizeMode={FastImage.resizeMode.cover}/>

                            {/* Highlight */}
                            <BigDealHighlightView highlight={item.highlight_title}
                                                  deal_type={item.deal_type}
                                                  time={item.end_valid_time}/>

                            {
                                !!item.use_delivery &&
                                <DeliveryFlag
                                    style={styles.deliveryFlag}
                                    size={'large'}/>
                            }

                            <DealItemChosenTagView visible={!!this.props.item.is_cm_choice}/>

                        </View>

                        {/* Header Divider */}
                        <DividerLine />

                        {/* Title and CTA */}
                        <View style={{
                            backgroundColor: 'white',
                            paddingRight: DIMENSION_PADDING_SMALL,
                            paddingLeft: DIMENSION_PADDING_SMALL,
                            paddingTop: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_SMALL,
                            minHeight: DIMENSION_BUTTON_MEDIUM
                        }}>
                            <DealTypeTitle dealType={item.deal_type}/>
                            <Text style={{ flex: 1, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}
                                  numberOfLines={2}>
                                {`                  ${item.title}`}
                            </Text>
                        </View>

                        {/* Header Divider */}
                        <DividerLine />

                        <View style={{
                            paddingRight: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_MEDIUM,
                            paddingLeft: DIMENSION_PADDING_SMALL,
                            paddingTop: DIMENSION_PADDING_SMALL }}>
                            {/* Deals save/rate info */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* Save count */}
                                <SaveDealButton navigation={this.props.navigation} deal={item} />
                                {/* Rate count */}
                                <DealItemRateView
                                    rate={!!rating ? rating : rate}
                                    count={this.props.item.rate_count}/>
                            </View>
                            {/* Address */}
                            <Text style={{ marginTop: DIMENSION_PADDING_TINY, color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB }}
                                  numberOfLines={1}
                                  ellipsizeMode={'tail'}>
                                {address}
                            </Text>
                        </View>

                    </View>

                </TouchableOpacity >
            )
        } else {
            return null
        }
    }

    _goToDealDetail = () => {
        const deal = this.props.item;
        if (deal.id === undefined) {
            deal.id = deal.deal_id
        }
        this.props.navigation.push(
            'DealDetail',
            {
                deal: deal,
                source_deal_detail: this.props.path
            });

        AnalyticsUtil.logDealCellOpenToDealDetail(
            this.props.path,
            ObjectUtil.getValue(deal, '', ['slug']),
            ObjectUtil.getValue(deal, '', ['brand', 'brand_slug']),
            ObjectUtil.getValue(deal, '', ['deal_type']),
            'large'
        )
    }

    goToBrandDetail = () => {
        if (this.props.item.brand !== undefined) {
            this.props.navigation.navigate('BrandDetail', { brand: this.props.item.brand });

            AnalyticsUtil.logDealCellOpenToBrandDetail(
                this.props.path,
                ObjectUtil.getValue(this.props.item, '', ['slug']),
                ObjectUtil.getValue(this.props.item, '', ['brand', 'brand_slug']),
                ObjectUtil.getValue(this.props.item, '', ['deal_type']),
                'large'
            )
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.item && this.props.item === undefined) return true;
        if (nextProps.item === undefined && this.props.item === undefined) return false;
        if (nextProps.item.id !== this.props.item.id) return true;
        if (nextProps.item.is_following !== this.props.item.is_following) return true;
        if (nextProps.item.is_saved !== this.props.item.is_saved) return true;
        if (nextProps.item.save_count !== this.props.item.save_count) return true;
        return false;
    }
}

BigDealItem.propTypes = {
    item: PropTypes.object,
    path: PropTypes.any,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
   deliveryFlag: {
       position: 'absolute',
       top: DIMENSION_PADDING_MEDIUM,
       left: DIMENSION_PADDING_MEDIUM
   }
});


