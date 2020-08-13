import React from 'react'
import PropTypes from 'prop-types'

import {BasePureComponent} from "../../common/BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {DIMENSION_BUTTON_SMALL, DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";
import {Text} from "native-base";
import {TouchableOpacity} from "react-native";

export default class TrendingItem extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                style={{
                    borderColor: COLOR_PRIMARY,
                    borderWidth: 1,
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    margin: 8,
                    height: DIMENSION_BUTTON_SMALL,
                    justifyContent: 'center'
                }}
                onPress={this._onPress}>
                <Text style={{color: COLOR_PRIMARY, paddingLeft: 8, paddingRight: 8}}>
                    {this.props.keyword}
                </Text>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        if (!!this.props.onPress) this.props.onPress(this.props.keyword);
    }
}

TrendingItem.propTypes = {
    onPress: PropTypes.any,
    keyword: PropTypes.any
}