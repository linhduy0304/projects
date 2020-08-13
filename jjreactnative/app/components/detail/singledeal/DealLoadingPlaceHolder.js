import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import {BasePureComponent} from "../../common/BasePureComponent";
import {COLOR_GRAY_BG_2, COLOR_PRIMARY} from "../../../resources/colors";
import {DIMENSION_PADDING_LARGE} from "../../../resources/dimens";
import {Spinner} from "native-base";

export default class DealLoadingPlaceHolder extends BasePureComponent {

    render() {

        return (
            <View style={{width: '100%', alignItems: 'center'}}>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: COLOR_GRAY_BG_2,
                        height: 150,
                        marginBottom: DIMENSION_PADDING_LARGE
                    }}/>
                <Spinner color={COLOR_PRIMARY} />
            </View>
        )
    }
}

DealLoadingPlaceHolder.propTypes = {
    loading: PropTypes.any
}