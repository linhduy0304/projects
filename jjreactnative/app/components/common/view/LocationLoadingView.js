import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View} from 'react-native'
import {Spinner, Text} from 'native-base'

import {BasePureComponent} from "../BasePureComponent";
import FadeInView from "./FadeInView";
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_LARGE, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {ZINDEX} from "../../../NumberConstant";

export default class LocationLoadingView extends BasePureComponent {

    render() {
        return (
            <FadeInView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: ZINDEX.LOCATION_LOADING
                }}>
                <View
                    style={{
                        padding: DIMENSION_PADDING_LARGE,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: DIMENSION_RADIUS_MEDIUM
                    }}>
                    <Spinner color={COLOR_PRIMARY} />
                    <Text
                        style={{
                            fontSize: DIMENSION_TEXT_CONTENT,
                            color: COLOR_TEXT_INACTIVE,
                        }}>
                        Đang xác định vị trí...
                    </Text>
                    <TouchableOpacity
                        style={{
                            marginTop: DIMENSION_PADDING_MEDIUM,
                            paddingTop: DIMENSION_PADDING_TINY,
                            paddingBottom: DIMENSION_PADDING_TINY,
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            borderRadius: DIMENSION_RADIUS_LARGE,
                            borderColor: COLOR_TEXT_INACTIVE,
                            borderWidth: 1
                        }}
                        activeOpacity={0.8}
                        onPress={this.props.onCancelPressed}>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}>
                            Đóng
                        </Text>
                    </TouchableOpacity>
                </View>
            </FadeInView>
        )
    }
}

LocationLoadingView.propTypes = {
    onCancelPressed: PropTypes.any
}