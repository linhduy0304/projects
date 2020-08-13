import { Image, TouchableHighlight, View, TouchableOpacity, Dimensions, Platform, PixelRatio } from "react-native";
import { Text } from 'native-base';
import React, { Component, PureComponent } from "react";

import PropTypes from 'prop-types'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";
import {BasePureComponent} from "../BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";

const { width } = Dimensions.get('window');

export default class ItemLoadMoreHorizontalList extends BasePureComponent {

    render() {
        return (
            <View style={{
                marginLeft: DIMENSION_PADDING_MEDIUM,
                paddingRight: DIMENSION_PADDING_MEDIUM,
                flex: 1,
                width: width - 52,
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                }}>

                    <TouchableHighlight
                        style={{
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            height: DIMENSION_BUTTON_MEDIUM,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            borderColor: COLOR_PRIMARY,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        underlayColor='white'
                        onPress={this.props.onViewMoreClicked}>

                        <Text style={{
                            fontSize: DIMENSION_TEXT_HEADER,
                            color: COLOR_PRIMARY,
                            fontWeight: 'bold'
                        }}>
                            XEM THÊM
                        </Text>
                    </TouchableHighlight >
                </View>
            </View>
        )
    }
}

ItemLoadMoreHorizontalList.propTypes = {
    onViewMoreClicked: PropTypes.any,
    navigation: PropTypes.any
}
