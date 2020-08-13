import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

import {COLOR_PRIMARY} from "../../../resources/colors";
import JJIcon from "../../common/JJIcon";
import {BaseComponent} from "../../common/BaseComponent";
import {StringUtil} from '../../../utils/string-util'
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

export default class CollectionSavedItem extends BaseComponent {

    constructor() {
        super()
    }

    render() {

        let {collection} = this.props;
        if (collection === undefined || collection === null) return null;

        return (
            <TouchableOpacity style={{height: 135, width: 180}} onPress={this._onPressed}>
                <FastImage
                    style={styles.image}
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(collection.thumb, 180, 0))}
                    resizeMode={FastImage.resizeMode.cover}/>

                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.75)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 0.5, y: 0.0 }}
                    style={{
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        position: 'absolute',
                        height: 135,
                        width: 180,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        top: 0,
                    }} />

                <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, padding: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{flexDirection: 'column', width: 100}}>
                        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: '#EDEDED'}}>
                            {collection.deal_count} khuyến mãi
                        </Text>
                        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: '#ffffff', fontWeight: 'bold'}} numberOfLines={3}>
                            {collection.title}
                        </Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: DIMENSION_BUTTON_MEDIUM}}
                                      onPress={() => this.props.onUnSaveClicked(this.props.collection)}>
                        <View style={{width: 0.1, height: 0.1}}/>
                        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_PRIMARY, textAlign: 'right'}}>
                            <JJIcon name={'bookmark_o'} size={14} color={COLOR_PRIMARY} />
                            {' ' + StringUtil.numberFormat(collection.save_count)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    _onPressed = () => {
        if (this.props.collection === undefined || this.props.collection === null) return;

        const baseLogParams = {
            collection: this.props.collection.slug
        };

        AnalyticsUtil.logNormalEvent(
            'saved_list_open_collection_detail',
            baseLogParams,
            'collection'
        );

        this.props.navigation.navigate('CollectionDetail', {
            "collection": this.props.collection,
            "cslug": this.props.collection.slug
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.collection !== undefined && this.props.collection === undefined) return true;
        if (nextProps.collection === undefined || nextProps.collection === null) return false;
        if (this.props.collection === undefined || this.props.collection === null) return false;
        if (nextProps.collection.id !== this.props.collection.id) return true;
        return false;
    }
}

CollectionSavedItem.propTypes = {
    collection: PropTypes.object,
    navigation: PropTypes.object,
    onUnSaveClicked: PropTypes.func
}

const styles = StyleSheet.create({
    image: {
        height: 135,
        width: 180,
        borderWidth: 0.1,
        borderRadius: DIMENSION_RADIUS_MEDIUM
    }
})