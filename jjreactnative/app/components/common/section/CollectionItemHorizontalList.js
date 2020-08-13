import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../../resources/colors";
import JJIcon from "../../common/JJIcon";
import {BaseComponent} from "../../common/BaseComponent";
import {StringUtil} from '../../../utils/string-util'
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {textWhiteShadow} from '../../../resources/styles'
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

export default class CollectionItemHorizontalList extends BaseComponent {

    render() {

        let {collection} = this.props;

        return (
            <TouchableOpacity style={{height: 135, width: 180, marginLeft: DIMENSION_PADDING_MEDIUM}} onPress={this._onPressed}>
                <FastImage
                    style={styles.image}
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(collection.get('thumb'), 180, 0))}
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

                <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, alignItems: 'flex-end', padding: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{flexDirection: 'column', width: 100}}>
                        <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_CONTENT, color: '#EDEDED'}]}>
                            {collection.get('deal_count')} khuyến mãi
                        </Text>
                        <Text style={[textWhiteShadow, {fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}]}
                              numberOfLines={3}
                              uppercase={true}>
                            {collection.get('title')}
                        </Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: DIMENSION_BUTTON_MEDIUM, paddingTop: DIMENSION_PADDING_SMALL}}
                                      onPress={this._onSavePressed}>
                        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: collection.get('is_save', false) ? COLOR_PRIMARY : '#ffffff', textAlign: 'right'}}>
                            <JJIcon name={'bookmark_o'} size={14} color={collection.get('is_save', false) ? COLOR_PRIMARY : '#ffffff'} />
                            {' ' + StringUtil.numberFormat(collection.get('save_count', 0))}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    _onPressed = () => {
        !!this.props.onPressed && this.props.onPressed(this.props.collection);
    }

    _onSavePressed = () => {
        if (!!this.props.onSaveClicked) this.props.onSaveClicked(this.props.collection);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.collection !== undefined && this.props.collection === undefined) return true;
        if (nextProps.collection === undefined) return false;
        if (this.props.collection === undefined) return false;
        if (nextProps.collection.get('id') !== this.props.collection.get('id')) return true;
        if (nextProps.collection.get('is_save') !== this.props.collection.get('is_save')) return true;
        if (nextProps.collection.get('save_count') !== this.props.collection.get('save_count')) return true;
        if (nextProps.collection.get('deal_count') !== this.props.collection.get('deal_count')) return true;
        return false;
    }
}

CollectionItemHorizontalList.propTypes = {
    collection: PropTypes.any,
    onSaveClicked: PropTypes.any,
    onPressed: PropTypes.any
}

const styles = StyleSheet.create({
    image: {
        height: 135,
        width: 180,
        borderRadius: DIMENSION_RADIUS_LARGE,
        borderColor: COLOR_GRAY_BG
    }
})