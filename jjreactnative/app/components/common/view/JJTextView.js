import React from 'react'
import {BaseComponent} from "../BaseComponent";
import PropTypes from "prop-types";
import {Platform, requireNativeComponent, Text} from "react-native";

const ios = Platform.OS === 'ios';
class JJTextView extends BaseComponent {


    render() {

        console.log('JJTextView:render', this.props);

        return (
            <JJTextViewNative
                {...this.props}>
                {this.props.children}
            </JJTextViewNative>
        )
    }
}


JJTextView.propTypes = Text.propTypes;

const JJTextViewNative = requireNativeComponent(`JJTextView`, !!ios ? JJTextView : undefined);

module.exports = JJTextView;
