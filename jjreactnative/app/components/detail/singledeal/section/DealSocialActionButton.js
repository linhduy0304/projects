import React from 'react'
import PropTypes from 'prop-types'
import {Text} from "native-base";
import {TouchableOpacity, View} from "react-native";

import {BaseComponent} from "../../../common/BaseComponent";
import JJIcon from "../../../common/JJIcon";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {COLOR_TEXT_INACTIVE} from "../../../../resources/colors";
import {StringUtil} from '../../../../utils/string-util'

export default class DealSocialActionButton extends BaseComponent {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}
                              style={{alignItems: 'center', padding: DIMENSION_PADDING_TINY}}>

                <View style={{flexDirection: 'row', padding: DIMENSION_PADDING_SMALL}}>
                    <JJIcon name={this.props.icon}
                            size={DIMENSION_TEXT_HEADER}
                            color={this.props.color} />

                    <Text style={{fontSize: DIMENSION_TEXT_SUB, color: this.props.color, marginLeft: DIMENSION_PADDING_TINY}}>
                        {StringUtil.numberFormat(this.props.count)}
                    </Text>
                </View>

                <Text style={{fontSize: DIMENSION_TEXT_SUB, color: COLOR_TEXT_INACTIVE, marginTop: DIMENSION_PADDING_TINY}}>
                    {this.props.label}
                </Text>
            </TouchableOpacity>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.count !== this.props.count) return true;
        if (nextProps.color !== this.props.color) return true;
        return false;
    }
}

DealSocialActionButton.propTypes = {
    icon: PropTypes.any,
    count: PropTypes.any,
    label: PropTypes.any,
    color: PropTypes.any,
    onPress: PropTypes.any
}