import {View, TouchableOpacity, StyleSheet} from "react-native";
import { Text } from 'native-base';
import React from "react";
import FastImage from 'react-native-fast-image'

import DividerLine from './DividerLine';
import FollowButton from "./FollowButton";
import HighLightView from "./HighLightView";
import SaveDealButton from "./SaveDealButton";
import PropTypes from 'prop-types'
import {BaseComponent} from "./BaseComponent";
import {StringUtil} from "../../utils/string-util";
import {
    DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import DealTypeTitle from "./DealTypeTitle";
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import DealItemRateView from './DealItemRateView'
import DealItemChosenTagView from './DealItemChosenTagView'
import {ObjectUtil} from '../../utils/object-utils'
import {AnalyticsUtil} from "./analytics/analytics";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";
import DeliveryFlag from '../../common/view/flag/DeliveryFlag';

export default class SmallDealItem extends BaseComponent {

    render() {
        if (this.props.item !== undefined) {
            const { item } = this.props;
            let photoUrl = (!!item.images && item.images.length > 0) ? item.images[0].thumbnail : '';
            let brandLogo = ObjectUtil.getValue(item, '', ['brand', 'image']);
            let highlight_title = ObjectUtil.getValue(item, '', ['highlight_title']);
            let address = ObjectUtil.getValue(item, '', ['store']);
            return (
                <TouchableOpacity activeOpacity={0.9} onPress={this._goToDealDetail} style={{ width: this.props.width - 8 }}>
                    <View style={{ backgroundColor: 'white' }}>
                        {/* Header View*/}
                        <View style={{ height: 30, justifyContent: 'center' }} >
                            <TouchableOpacity
                                onPress={this.goToBrandDetail}
                                style={{
                                    width: 30,
                                    height: 20,
                                    position: 'absolute',
                                    alignSelf: 'center'
                                }}>
                                <FastImage
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(brandLogo, 30))}
                                    resizeMode={FastImage.resizeMode.contain}/>
                            </TouchableOpacity>
                            <FollowButton
                                navigation={this.props.navigation}
                                deal={item}
                                iconSize={14}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </View>

                        {/* Divider */}
                        <DividerLine />

                        <View>
                            <View style={{ height: this.props.width / 2, }}>

                                {/* ImageView */}
                                <FastImage
                                    style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
                                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(photoUrl, this.props.width - 8))}
                                    resizeMode={FastImage.resizeMode.cover}/>

                                {/* Highlight */}
                                <HighLightView
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                    height={24}
                                    contentWeight={'bold'}
                                    contentText={highlight_title}
                                    contentFontSize={DIMENSION_TEXT_CONTENT}
                                    uppercase={true}
                                />

                                {
                                    !!item.use_delivery &&
                                    <DeliveryFlag
                                        size={'small'}
                                        style={styles.deliveryFlag}/>
                                }

                                <DealItemChosenTagView visible={!!this.props.item.is_cm_choice} smallDeal={true}/>
                            </View>

                            {/* Header Divider */}
                            <DividerLine />

                            {/* Title */}
                            <View style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                paddingRight: DIMENSION_PADDING_SMALL,
                                paddingLeft: DIMENSION_PADDING_SMALL,
                                paddingTop: DIMENSION_PADDING_SMALL,
                                height: 56
                            }}>
                                <DealTypeTitle dealType={item.deal_type}/>
                                <Text style={{ flex: 1, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}
                                      numberOfLines={2}>
                                    {`                  ${item.title}`}
                                </Text>
                            </View>
                        </View>

                        {/* Header Divider */}
                        <DividerLine style={{marginLeft: DIMENSION_PADDING_SMALL, marginRight: DIMENSION_PADDING_SMALL}}/>

                        <View style={{
                            paddingRight: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_SMALL,
                            paddingLeft: DIMENSION_PADDING_SMALL,
                            paddingTop: DIMENSION_PADDING_SMALL }}>
                            {/* Deals save/rate info */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* Save count */}
                                <SaveDealButton navigation={this.props.navigation}
                                                deal={item} />
                                {/* Rate count */}
                                <DealItemRateView
                                    rate={this.props.item.rating}
                                    count={this.props.item.rate_count}/>
                            </View>
                            {/* Address */}
                            <Text style={{ color: COLOR_TEXT_INACTIVE, marginTop: DIMENSION_PADDING_TINY, fontSize: DIMENSION_TEXT_SUB }}
                                  numberOfLines={1}
                                  ellipsizeMode={'tail'}>
                                {address}
                            </Text>
                        </View>

                    </View>

                </TouchableOpacity>
            )
        } else {
            return null
        }
    }

    _goToDealDetail = () => {
        const deal = this.props.item
        if (deal.id === undefined) {
            deal.id = deal.deal_id
        }
        this.props.navigation.navigate({
            routeName: 'DealDetail',
            params: {
                deal: deal,
                source_deal_detail: this.props.path
            },
            key: deal.id
        });

        AnalyticsUtil.logDealCellOpenToDealDetail(
            this.props.path,
            ObjectUtil.getValue(deal, '', ['slug']),
            ObjectUtil.getValue(deal, '', ['brand', 'brand_slug']),
            ObjectUtil.getValue(deal, '', ['deal_type']),
            'small'
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
                'small'
            )
        }
    }

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

SmallDealItem.propTypes = {
    width: PropTypes.any,
    item: PropTypes.object,
    path: PropTypes.any,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    deliveryFlag: {
        position: 'absolute',
        top: DIMENSION_PADDING_SMALL,
        left: DIMENSION_PADDING_SMALL
    }
});

