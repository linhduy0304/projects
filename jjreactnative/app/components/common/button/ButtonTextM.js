import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

import {BaseComponent} from "../BaseComponent";
import {DIMENSION_BUTTON_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER} from "../../../resources/dimens";
import {COLOR_TEXT_INACTIVE_DISABLE} from "../../../resources/colors";

export default class ButtonTextM extends BaseComponent {

    render() {

        return (
            <TouchableOpacity
                style={[{
                    height: DIMENSION_BUTTON_MEDIUM,
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: !!this.props.disable ? COLOR_TEXT_INACTIVE_DISABLE : this.props.backgroundColor,
                    backgroundColor: !!this.props.disable ? COLOR_TEXT_INACTIVE_DISABLE : this.props.backgroundColor
                },!!this.props.style ? {...this.props.style} : undefined]}
                activeOpacity={0.8}
                disabled={!!this.props.disable}
                onPress={this.props.onPress}>

                <Text
                    style={{
                        color: this.props.textColor,
                        fontSize: DIMENSION_TEXT_HEADER,
                        fontWeight: 'bold'
                    }}
                    uppercase={true}>

                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

ButtonTextM.propTypes = {
    style: PropTypes.any,
    disable: PropTypes.any,
    text: PropTypes.any,
    backgroundColor: PropTypes.any,
    textColor: PropTypes.any,
    onPress: PropTypes.any
}