import React from 'react'
import PropTypes from 'prop-types'
import {Dimensions, TouchableOpacity, View} from "react-native";
import {Text} from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../common/BaseComponent";
import {StringUtil} from '../../utils/string-util'
import SaveCollectionButton from '../common/savecollectionbutton/SaveCollectionButton';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER_XX} from "../../resources/dimens";
import {textWhiteShadow} from '../../resources/styles'
import {AnalyticsUtil} from "../common/analytics/analytics";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

const width = Dimensions.get("window").width;

export default class CollectionTrendingItem extends BaseComponent {

    render() {
        if (this.props.collection === undefined || this.props.collection === null) return null;

        return (
            <TouchableOpacity onPress={this._onGoToCollectionDetail}
                              activeOpacity={0.9}
                              style={{width: this.props.width, height: this.props.height}}>
                <View style={{flex: 1}}>
                    <FastImage
                        style={{width: '100%', height: width / 2}}
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.collection.thumb, width))}
                        resizeMode={FastImage.resizeMode.cover}/>

                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.0)']}
                        start={{x: 0.5, y: 1.0}}
                        end={{x: 0.5, y: 0.0}}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: '50%'
                        }}/>

                    <SaveCollectionButton
                        style={{
                            position: 'absolute',
                            right: DIMENSION_PADDING_MEDIUM,
                            bottom: DIMENSION_PADDING_MEDIUM
                        }}
                        navigation={this.props.navigation}
                        item={this.props.collection}/>

                    <View style={{
                        position: 'absolute',
                        bottom: DIMENSION_PADDING_MEDIUM,
                        left: DIMENSION_PADDING_MEDIUM,
                        right: 80,
                    }}>
                        <Text
                            style={[
                                textWhiteShadow, {
                                    fontSize: DIMENSION_TEXT_HEADER_XX,
                                    fontWeight: 'bold',
                                }]}>
                            {this.props.collection.title}
                        </Text>

                        <Text
                            style={[textWhiteShadow, {
                                fontSize: DIMENSION_TEXT_CONTENT
                            }]}>
                            {this.props.collection.deal_count} khuyến mãi
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onGoToCollectionDetail = () => {
        if (!this.props.collection) return;

        const baseLogParams = {
            collection: this.props.collection.slug
        };

        AnalyticsUtil.logNormalEvent(
            'trending_open_collection_detail',
            baseLogParams,
            'collection'
        );
        this.props.navigation.navigate('CollectionDetail', {collection: this.props.collection})
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.collection !== undefined && this.props.collection === undefined) return true;
        if (nextProps.collection === undefined) return false;
        if (this.props.collection === undefined) return false;
        if (nextProps.collection.id !== this.props.collection.id) return true;
        if (nextProps.collection.is_save !== this.props.collection.is_save) return true;
        if (nextProps.collection.save_count !== this.props.collection.save_count) return true;
        if (nextProps.collection.deal_count !== this.props.collection.deal_count) return true;
        return false;
    }
}

CollectionTrendingItem.propTypes = {
    collection: PropTypes.any,
    navigation: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any
}