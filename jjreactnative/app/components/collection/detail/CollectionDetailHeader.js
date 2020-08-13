import React from 'react'
import PropTypes from 'prop-types'
import {Dimensions, TouchableOpacity, View, ScrollView} from "react-native";
import {Text} from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../../common/BaseComponent";
import {StringUtil} from '../../../utils/string-util'
import SaveCollectionButton from '../../common/savecollectionbutton/SaveCollectionButton';
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT,
} from "../../../resources/dimens";
import JJIcon from '../../common/JJIcon'
import {COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const width = Dimensions.get("window").width;

export default class CollectionDetailHeader extends BaseComponent {

    constructor() {
        super();
        this.state = {
            numberLinesOfDescription: 2
        }
    }

    render() {
        if (this.props.collection === undefined || this.props.collection === null) return null;

        const isCollapseDesc = this.state.numberLinesOfDescription === 2;
        let gradientColors = ['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.0)'];
        if (!isCollapseDesc) {
            gradientColors = ['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)'];
        }

        return (
            <View style={{width: width, height: width/2}}>
                <FastImage
                    style={{width: '100%', height: width/2}}
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.collection.cover_full, width))}
                    resizeMode={FastImage.resizeMode.cover}/>

                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 0.5, y: 0.0 }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        top: 0
                    }} />

                <ScrollView style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    maxHeight: width/2 - DIMENSION_PADDING_SMALL - DIMENSION_TEXT_CONTENT,
                    bottom: DIMENSION_PADDING_SMALL + DIMENSION_TEXT_CONTENT,
                    paddingLeft: DIMENSION_PADDING_SMALL,
                    paddingRight: DIMENSION_PADDING_SMALL
                }}
                            >
                    <SaveCollectionButton
                        navigation={this.props.navigation}
                        item={this.props.collection}/>

                    <Text style={{color: 'white', fontSize: DIMENSION_TEXT_CONTENT, paddingLeft: DIMENSION_PADDING_SMALL, paddingRight: DIMENSION_PADDING_SMALL}}
                          numberOfLines={this.state.numberLinesOfDescription}
                          onLayout={this._onTextLayout}>

                        {this.props.collection.desc}
                    </Text>
                </ScrollView>
                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: 0,
                    left: DIMENSION_PADDING_MEDIUM,
                    right: DIMENSION_PADDING_MEDIUM,
                    padding: DIMENSION_PADDING_SMALL
                }} onPress={this._onExpandDescriptionClicked}>
                    <JJIcon name={`chevron_${isCollapseDesc ? 'down' : 'up'}_o`}
                            size={16}
                            color={COLOR_TEXT_INACTIVE}
                            style={{textAlign: 'center'}}/>
                </TouchableOpacity>
            </View>
        )
    }

    _onTextLayout = e => {
        // const layout = e.nativeEvent.layout;
        // this.textDescriptionHeight = layout.height;
    }

    _onExpandDescriptionClicked = () => {
        this.setState({
            numberLinesOfDescription: this.state.numberLinesOfDescription === 2 ? undefined : 2
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.collection !== undefined && this.props.collection === undefined) return true;
        if (nextProps.collection === undefined) return false;
        if (this.props.collection === undefined) return false;
        if (nextProps.collection.id !== this.props.collection.id) return true;
        if (nextProps.collection.is_save !== this.props.collection.is_save) return true;
        if (nextProps.collection.save_count !== this.props.collection.save_count) return true;
        if (this.state.numberLinesOfDescription !== nextState.numberLinesOfDescription) return true;
        return false;
    }
}

CollectionDetailHeader.propTypes = {
    collection: PropTypes.any,
    navigation: PropTypes.any
}