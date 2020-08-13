import React from "react";
import { Text } from 'native-base';
import { TouchableHighlight, View} from "react-native";
import FastImage from 'react-native-fast-image'

import DividerLine from './DividerLine';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import PropTypes from 'prop-types'
import {StringUtil} from '../../utils/string-util'
import {BaseComponent} from "./BaseComponent";
import JJIcon from "./JJIcon";
import {AnalyticsUtil} from "./analytics/analytics";
import {ObjectUtil} from "../../utils/object-utils";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

export default class ExclusiveDealItem extends BaseComponent {

    render() {
        if (!this.props.deal) return null;
        let imageUrl = '';
        if (this.props.deal) {
            if (!!this.props.deal.images && this.props.deal.images.length > 0) {
                imageUrl = this.props.deal.images[0].link;
            }
        }


        return (
            <TouchableHighlight underlayColor='white' onPress={this._onPress}>
                <View>
                    <View style={{ backgroundColor: 'white', flex: 1, padding: DIMENSION_PADDING_MEDIUM, flexDirection: 'row' }}>

                        {/* ImageView */}
                        <View style={{ height: 96, width: 126, borderRadius: DIMENSION_RADIUS_MEDIUM, overflow: 'hidden' }}>

                            <FastImage
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    borderRadius: DIMENSION_RADIUS_MEDIUM
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(imageUrl, 126))}/>

                            <View style={{
                                flexDirection: 'row',
                                height: 24,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                borderTopRightRadius: DIMENSION_RADIUS_MEDIUM,
                                maxWidth: 126
                            }}>

                                <View style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 10,
                                    borderTopWidth: 24,
                                    borderLeftColor: 'transparent',
                                    borderTopColor: 'rgba(231, 57 ,72 , 0.8)',
                                    borderRightWidth: DIMENSION_PADDING_TINY,
                                    borderRightColor: 'rgba(231, 57 ,72 , 0.8)'
                                }} />
                                <View style={{
                                    height: 24,
                                    paddingRight: DIMENSION_PADDING_SMALL,
                                    backgroundColor: 'rgba(231, 57 ,72 , 0.8)',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: DIMENSION_TEXT_CONTENT
                                        }}
                                        numberOfLines={1}
                                        uppercase={true}>
                                        {this.props.deal.highlight_title}
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: DIMENSION_PADDING_SMALL }}>
                            <Text style={{ color: COLOR_TEXT_INACTIVE, marginTop: DIMENSION_PADDING_TINY, marginBottom: 2, fontSize: DIMENSION_TEXT_CONTENT }}>
                                {this.props.deal.brand ? this.props.deal.brand.brand_name : ''}
                            </Text>
                            <Text
                                style={{ fontWeight: 'bold', fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, marginBottom: 2 }}
                                numberOfLines={2}>
                                {this.props.deal.title}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <JJIcon name={"bookmark_o"}
                                        size={DIMENSION_TEXT_SUB}
                                        color={COLOR_TEXT_INACTIVE} />
                                <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, marginLeft: DIMENSION_PADDING_TINY }}>
                                    {this.props.deal.save_count}
                                </Text>
                            </View>
                        </View>

                    </View>

                    {
                        !this.props.isLastItem &&
                        <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
                    }
                </View>
            </TouchableHighlight >
        )
    }

    _onPress = () => {
        this.props.navigation.navigate({
            routeName: 'DealDetail',
            params: {
                deal: this.props.deal,
                source_deal_detail: this.props.path
            },
            key: this.props.deal.id
        });

        AnalyticsUtil.logDealCellOpenToDealDetail(
            this.props.path,
            ObjectUtil.getValue(this.props.deal, '', ['slug']),
            ObjectUtil.getValue(this.props.deal, '', ['brand', 'brand_slug']),
            ObjectUtil.getValue(this.props.deal, '', ['deal_type']),
            'small'
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.deal !== undefined && this.props.deal === undefined) return true;
        if (nextProps.deal === undefined) return false;
        if (this.props.deal === undefined) return false;
        if (nextProps.deal.id !== this.props.deal.id) return true;
        if (nextProps.deal.save_count !== this.props.deal.save_count) return true;
        return false;
    }
}

ExclusiveDealItem.propTypes = {
    deal: PropTypes.object,
    path: PropTypes.any,
    navigation: PropTypes.object,
    isLastItem: PropTypes.bool
}
