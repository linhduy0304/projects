import React from 'react'
import PropTypes from 'prop-types'
import {View} from "react-native";
import {Text} from "native-base";
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_LARGE,
} from "../../../resources/dimens";

export default class IOSNotificationGuideItem extends BasePureComponent {

    render() {

        const {image, imageSize, fontSize, brand, message} = this.props;

        return (
            <View
                style={{
                    marginLeft: DIMENSION_PADDING_MEDIUM,
                    marginRight: DIMENSION_PADDING_MEDIUM,
                    marginBottom: DIMENSION_PADDING_LARGE,
                    padding: DIMENSION_PADDING_SMALL,
                    borderRadius: DIMENSION_RADIUS_LARGE,
                    borderColor: '#FFCACA',
                    borderWidth: 1,
                    flexDirection: 'row',
                    backgroundColor: '#FBA0A9',
                    alignItems: 'center'
                }}>

                <View
                    style={{
                        borderRadius: DIMENSION_RADIUS_LARGE,
                        borderWidth: 1,
                        borderColor: 'white',
                        backgroundColor: 'white',
                        width: imageSize,
                        height: imageSize,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                    <FastImage
                        source={image}
                        style={{width: imageSize}}
                        resizeMode={FastImage.resizeMode.cover}/>

                </View>

                <View
                    style={{
                        paddingLeft: DIMENSION_PADDING_SMALL,
                        flex: 1
                    }}>
                    <Text style={{color: 'white', fontSize}}>
                        <Text style={{color: 'white', fontSize, fontWeight: 'bold'}}>JAM</Text>JA.VN
                    </Text>
                    <Text style={{color: 'white', fontSize}}>
                        <Text style={{color: 'white', fontSize, fontWeight: 'bold'}}>{brand}</Text>{message}
                    </Text>
                </View>
            </View>
        )
    }
}

IOSNotificationGuideItem.propTypes = {
    image: PropTypes.any,
    imageSize: PropTypes.any,
    fontSize: PropTypes.any,
    brand: PropTypes.any,
    message: PropTypes.any,
}