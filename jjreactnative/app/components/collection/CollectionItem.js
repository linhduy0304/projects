import { TouchableHighlight, View, Dimensions } from "react-native";
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import SaveCollectionButton from "../common/savecollectionbutton/SaveCollectionButton";
import {BaseComponent} from "../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER,
} from "../../resources/dimens";
import {StringUtil} from '../../utils/string-util'
import {textWhiteShadow} from "../../resources/styles";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

const { width } = Dimensions.get('window');

export default class CollectionItem extends BaseComponent {

    _goToCollectionDetail = () => {
        this.props.navigation.navigate('CollectionDetail', {collection: this.props.collection})
    }

    render() {
        const image = !!this.props.collection.thumb ? this.props.collection.thumb : '';
        return (
            <TouchableHighlight underlayColor='white'
                                onPress={this._goToCollectionDetail}
                                style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_MEDIUM}}>
                {/* ImageView */}
                <View style={{
                    flex: 1,
                    height: (width - 16) / 2,
                    borderRadius: DIMENSION_RADIUS_LARGE,
                }}>
                    <FastImage
                        style={{
                            flex: 1,
                            borderRadius: DIMENSION_RADIUS_LARGE,
                        }}
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(image, width))}
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
                        left: DIMENSION_PADDING_MEDIUM,
                        bottom: DIMENSION_PADDING_MEDIUM,
                        right: 80,
                    }}>
                        <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_CONTENT}]}>
                            {this.props.collection.deal_count} khuyến mãi
                        </Text>
                        <Text style={[textWhiteShadow, {fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER}]}
                              numberOfLines={3}
                              uppercase={true}>
                            {this.props.collection.title}
                        </Text>
                    </View>

                    {/* Save count */}
                    <SaveCollectionButton
                        style={{
                            position: 'absolute',
                            right: DIMENSION_PADDING_SMALL,
                            bottom: DIMENSION_PADDING_SMALL
                        }}
                        navigation={this.props.navigation}
                        item={this.props.collection} />

                </View>
            </TouchableHighlight >
        )
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

CollectionItem.propTypes = {
    collection: PropTypes.any,
    navigation: PropTypes.any
}