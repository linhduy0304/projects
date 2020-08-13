import React from 'react';
import {TextInput} from 'react-native';
import {BasePureComponent} from "../../base/BasePureComponent";
import {defaultTextStyle} from '../../../resources/styles';
import {COLOR_TEXT_HINT} from "../../../resources/colors";

export default class JJTextInput extends BasePureComponent {

    render() {
        return (
            <TextInput {...this.props} style={[defaultTextStyle, this.props.style]}/>
        )
    }
}

JJTextInput.defaultProps = {
    ...TextInput.defaultProps,
    underlineColorAndroid: 'transparent',
    placeholderTextColor: COLOR_TEXT_HINT,
    autoCorrect: false,
    style: defaultTextStyle
};
JJTextInput.propTypes = TextInput.propTypes;