import React from 'react';
import {Keyboard, KeyboardAvoidingView, View} from 'react-native';
import PropTypes from 'prop-types';
import {AppConfig} from "../config";
import {BaseComponent} from "../base/BaseComponent";
import {ObjectUtil} from "../../utils/object-utils";

const V = !!AppConfig.ios ? View : KeyboardAvoidingView;

export default class ViewWithKeyboard extends BaseComponent {

    render() {
        return (
            <V style={[this.props.style, {paddingBottom: !!AppConfig.ios ? ObjectUtil.getValue(this, 0, ['state', 'viewBottomPadding']) : 0}]}>
                {this.props.children}
            </V>
        )
    }

    _onKeyboardWillShow = e => {
        if (!this.mounted || !this.enablePaddingKeyboard || ObjectUtil.getValue(e, 0, ['endCoordinates', 'height']) <= 0) return;
        this.setState({
            viewBottomPadding: ObjectUtil.getValue(e, 0, ['endCoordinates', 'height'])
        })
    }

    _onKeyboardDidShow = e => {
        if (!this.mounted || !this.enablePaddingKeyboard) return;
        this.setState({
            viewBottomPadding: ObjectUtil.getValue(e, 0, ['endCoordinates', 'height'])
        })
    }

    _onKeyboardWillHide = () => {
        if (!this.mounted || !this.enablePaddingKeyboard || !ObjectUtil.getValue(this, undefined, ['state', 'viewBottomPadding'])) return;
        this.setState({
            viewBottomPadding: 0
        })
    }

    _onKeyboardDidHide = e => {
        if (!this.mounted || !this.enablePaddingKeyboard || !ObjectUtil.getValue(this, undefined, ['state', 'viewBottomPadding'])) return;
        this.setState({
            viewBottomPadding: 0
        })
    }

    _startHandleKeyboard = () => {
        this.enablePaddingKeyboard = true;
        Keyboard.addListener('keyboardWillShow', this._onKeyboardWillShow);
        Keyboard.addListener('keyboardDidShow', this._onKeyboardDidShow);
        Keyboard.addListener('keyboardWillHide', this._onKeyboardWillHide);
        Keyboard.addListener('keyboardDidHide', this._onKeyboardDidHide);
    }

    _stopHandleKeyboard = () => {
        try {
            if (!!this.enablePaddingKeyboard) return;
            Keyboard.removeListener('keyboardWillShow', this._onKeyboardWillShow);
            Keyboard.removeListener('keyboardDidShow', this._onKeyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', this._onKeyboardWillHide);
            Keyboard.removeListener('keyboardDidHide', this._onKeyboardDidHide);
            this.enablePaddingKeyboard = false;
        }
        catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        !!AppConfig.ios && this._startHandleKeyboard();
    }

    componentWillUnmount() {
        this._stopHandleKeyboard();
        super.componentWillUnmount();
    }
}

ViewWithKeyboard.propTypes = {
    children: PropTypes.any,
    style: PropTypes.any
}