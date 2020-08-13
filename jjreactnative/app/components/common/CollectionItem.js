import React from "react";
import { Text } from 'native-base';
import { TouchableHighlight, View } from "react-native";
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import DividerLine from './DividerLine';
import {
    DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import JJIcon from '../common/JJIcon'
import {StringUtil} from '../../utils/string-util'
import {BaseComponent} from "./BaseComponent";
import {AnalyticsUtil} from "./analytics/analytics";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

export default class CollectionItem extends BaseComponent {

    render() {
        return (
            <TouchableHighlight underlayColor='white' onPress={this._onPress}>
                <View>
                    <View style={{ backgroundColor: 'white', flex: 1, padding: 16, flexDirection: 'row' }}>

                        {/* ImageView */}
                        <View style={{ height: 96, width: 126 }}>
                            <FastImage
                                style={{ flex: 1, borderRadius: DIMENSION_RADIUS_MEDIUM }}
                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.collection.thumb, 126))}
                                resizeMode={FastImage.resizeMode.cover}/>
                        </View>

                        <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: DIMENSION_PADDING_SMALL }}>
                            <Text style={{ color: COLOR_TEXT_INACTIVE, marginTop: DIMENSION_PADDING_TINY, marginBottom: 2, fontSize: DIMENSION_TEXT_CONTENT }}>
                                {this.props.collection.deal_count} khuyến mãi
                            </Text>
                            <Text
                                style={{ fontWeight: 'bold', marginBottom: DIMENSION_PADDING_TINY, fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1 }}
                                numberOfLines={2}>
                                {this.props.collection.title}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <JJIcon name={"bookmark_o"}
                                        size={DIMENSION_TEXT_SUB}
                                        color={COLOR_TEXT_INACTIVE} />
                                <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, marginLeft: DIMENSION_PADDING_TINY }}>
                                    {this.props.collection.save_count}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <DividerLine style={{marginLeft: 16, marginRight: 16}}/>
                </View>
            </TouchableHighlight >
        )
    }

    _onPress = () => {
        if (!this.props.collection) return;

        const baseLogParams = {
            collection: this.props.collection.slug
        };

        AnalyticsUtil.logNormalEvent(
            `${this.props.path}open_collection_detail`,
            baseLogParams,
            'tab_booking'
        );

        this.props.navigation.push('CollectionDetail', {
            "collection": this.props.collection,
            "cslug": this.props.collection.slug
        })
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.collection !== undefined && this.props.collection === undefined) return true;
        if (nextProps.collection === undefined) return false;
        if (this.props.collection === undefined) return false;
        if (nextProps.collection.id !== this.props.collection.id) return true;
        if (nextProps.collection.is_save !== this.props.collection.is_save) return true;
        return false;
    }
}

CollectionItem.propTypes = {
    path: PropTypes.any,
    navigation: PropTypes.object,
    collection: PropTypes.object
}
