import {View, TouchableOpacity, StyleSheet} from "react-native";
import { Text } from 'native-base';
import React from "react";
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'

import {COLOR_LINE, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import DividerLine from '../DividerLine';
import FollowButton from "../FollowButton";
import HighLightView from "../HighLightView";
import SaveDealButton from "../SaveDealButton";
import {BaseComponent} from "../BaseComponent";
import {StringUtil} from '../../../utils/string-util'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import DealTypeTitle from "../DealTypeTitle";
import DealItemChosenTagView from '../DealItemChosenTagView'
import DealItemRateView from '../DealItemRateView'
import {AnalyticsUtil} from "../analytics/analytics";
import {ObjectUtil} from "../../../utils/object-utils";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";
import DeliveryFlag from "../../../common/view/flag/DeliveryFlag";

export default class ItemHorizontalList extends BaseComponent {

    render() {
        const deal = this.props.deal;
        if (!!!deal) return null;

        let photoUrl = !!deal.images && deal.images.length > 0 ? deal.images[0].link : '';
        let brandLogo = !!deal.brand ? deal.brand.image : '';
        let highlight_title = !!deal.highlight_title ? deal.highlight_title : '';
        let address = !!deal.store ? deal.store : '';
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    marginLeft: DIMENSION_PADDING_MEDIUM,
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    width: this.props.width
                }}
                underlayColor='white'
                onPress={this.goToDealDetail}>

                <View style={{ backgroundColor: 'white', borderRadius: DIMENSION_RADIUS_MEDIUM }}>

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
                                    height: '100%'
                                }}
                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(brandLogo, 100, 0))}
                                resizeMode={FastImage.resizeMode.contain}/>

                        </TouchableOpacity>

                        <FollowButton
                            navigation={this.props.navigation}
                            deal={deal}
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

                    <View style={{ height: this.props.height}}>

                        {/* ImageView */}
                        <FastImage
                            style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
                            source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(photoUrl, this.props.width + 52, 0))}
                            resizeMode={FastImage.resizeMode.cover}/>

                        {/* Highlight */}
                        <HighLightView
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0
                            }}
                            height={32}
                            contentWeight={'bold'}
                            contentText={highlight_title}
                            contentFontSize={16}
                            uppercase={true}
                        />

                        {
                            !!deal.use_delivery &&
                            <DeliveryFlag
                                style={styles.deliveryFlag}
                                size={'small'}/>
                        }

                        <DealItemChosenTagView visible={!!deal.is_cm_choice}/>
                    </View>

                    {/* Header Divider */}
                    <DividerLine />

                    {/* Title and CTA */}
                    <View style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        paddingRight: DIMENSION_PADDING_SMALL,
                        paddingLeft: DIMENSION_PADDING_SMALL,
                        paddingTop: DIMENSION_PADDING_SMALL,
                        paddingBottom: DIMENSION_PADDING_SMALL,
                        minHeight: DIMENSION_BUTTON_MEDIUM,
                    }}>
                        <DealTypeTitle dealType={deal.deal_type}/>
                        <Text style={{ flex: 1, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}
                              numberOfLines={2}>
                            {`                  ${deal.title}`}
                        </Text>
                    </View>

                    {/* Header Divider */}
                    <View style={{marginLeft: DIMENSION_PADDING_SMALL, marginRight: DIMENSION_PADDING_SMALL, height: 1, backgroundColor: COLOR_LINE}}/>

                    <View style={{
                        paddingRight: DIMENSION_PADDING_SMALL,
                        paddingBottom: DIMENSION_PADDING_MEDIUM,
                        paddingLeft: DIMENSION_PADDING_SMALL,
                        paddingTop: DIMENSION_PADDING_SMALL
                    }}>
                        {/* Deals save/rate info */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Save count */}
                            <SaveDealButton navigation={this.props.navigation}
                                            deal={deal} />
                            {/* Rate count */}
                            <DealItemRateView
                                rate={!!deal.rating ? deal.rating : deal.rate}
                                count={deal.rate_count}/>
                        </View>
                        {/* Address */}
                        <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB, marginTop: DIMENSION_PADDING_TINY }}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}>
                            {address}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity >
        )
    }

    goToDealDetail = () => {
        const deal = this.props.deal
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
            'horizontal_large_list'
        )
    }

    goToBrandDetail = () => {
        if (!!this.props.deal.brand) {
            this.props.navigation.navigate('BrandDetail', { brand: this.props.deal.brand });

            AnalyticsUtil.logDealCellOpenToBrandDetail(
                this.props.path,
                ObjectUtil.getValue(this.props.item, '', ['slug']),
                ObjectUtil.getValue(this.props.item, '', ['brand', 'brand_slug']),
                ObjectUtil.getValue(this.props.item, '', ['deal_type']),
                'horizontal_large_list'
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deal && this.props.deal === undefined) return true;
        if (nextProps.deal === undefined && this.props.deal === undefined) return false;
        if (nextProps.deal.id !== this.props.deal.id) return true;
        if (nextProps.deal.is_following !== this.props.deal.is_following) return true;
        if (nextProps.deal.is_saved !== this.props.deal.is_saved) return true;
        return false;
    }
}

ItemHorizontalList.propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    deal: PropTypes.any,
    path: PropTypes.any,
    navigation: PropTypes.any
};

const styles = StyleSheet.create({
    deliveryFlag: {
        position: 'absolute',
        top: DIMENSION_PADDING_MEDIUM,
        left: DIMENSION_PADDING_MEDIUM
    }
});

