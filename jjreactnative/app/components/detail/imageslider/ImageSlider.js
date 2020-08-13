import React from 'react';
import { Text } from 'native-base';
import {View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import {DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE_DISABLE} from "../../../resources/colors";
import {getPaddingTopBar} from "../../../utils/common-utils";
import JJStatusBar from "../../common/view/JJStatusBar";

const marginTopBar = 24 + getPaddingTopBar();

export default class ImageSlider extends React.PureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
    }

    render() {

        const images = [];
        this.props.navigation.state.params.images.map((image, i) => {
            images.push({
                url: image.link,
            })
        })
        const index = this.props.navigation.state.params.position;
        return (
            <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <JJStatusBar styleColor={'dark'}/>

                <ImageViewer imageUrls={images}
                             index={index ? index : 0}
                             style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'black'}}
                             loadingRender={() => <ActivityIndicator animating={true} size={'small'} color={COLOR_PRIMARY} style={{marginTop: 150}}/>}
                             renderIndicator={this._renderImageIndicator}
                             saveToLocalByLongPress={false}/>

                <TouchableOpacity style={styles.closeButton}
                                  onPress={this._dismissSliderScreen}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE_DISABLE, backgroundColor: 'transparent', fontSize: DIMENSION_TEXT_CONTENT }}>
                        Đóng
                    </Text>
                </TouchableOpacity>

            </View >
        )
    }

    _renderImageIndicator = (currentIndex, allSize) => {
        if (currentIndex > allSize) currentIndex = allSize;
        return (
            <View style={styles.imageIndicator}>
                <Text style={{color: COLOR_TEXT_INACTIVE_DISABLE, fontSize: DIMENSION_TEXT_CONTENT}}>
                    {currentIndex}/{allSize}
                </Text>
            </View>
        )
    }

    _dismissSliderScreen = () => {
        this.props.navigation.goBack();
    }

}

const styles = StyleSheet.create({
    imageIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: DIMENSION_PADDING_SMALL + marginTopBar,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    closeButton: {
        padding: DIMENSION_PADDING_SMALL,
        position: 'absolute',
        top: marginTopBar,
        left: 10,
        justifyContent: 'center'
    },
});


