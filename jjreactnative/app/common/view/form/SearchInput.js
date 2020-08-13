import React from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../base/BaseComponent";
import {DIMENSION_PADDING_SMALL} from "../../../resources/dimens";
import JJIcon from "../icon/JJIcon";
import {COLOR_TEXT_HINT_2, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {styles} from "./styles";
import JJTextInput from './JJTextInput';
import {StringUtil} from '../../../utils/string-util';

export default class SearchInput extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            input: props.value
        }
    }

    render() {

        return (
            <View style={[styles.searchInputContainer, this.props.style]}>

                <JJIcon
                    name={'search'}
                    color={COLOR_TEXT_INACTIVE}
                    size={16}/>

                <JJTextInput
                    style={styles.searchInput}
                    placeholder={this.props.placeHolder}
                    underlineColorAndroid='transparent'
                    multiline={false}
                    autoCorrect={false}
                    value={this.state.input}
                    placeholderTextColor={COLOR_TEXT_HINT_2}
                    returnKeyLabel={'Tìm kiếm'}
                    returnKeyType={'search'}
                    autoCapitalize={'none'}
                    onChangeText={this._onTextChanged}
                    editable={!this.props.isLoading && !this.props.disable}
                    onSubmitEditing={this._onSubmitPress}
                />

                {
                    !!this.props.isLoading &&
                    <ActivityIndicator
                        size={'small'}
                        animating={true}/>
                }

                {
                    !this.props.isLoading &&
                    !StringUtil.isEmpty(this.state.input) &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{padding: DIMENSION_PADDING_SMALL}}
                        onPress={this._onClearPress}>

                        <JJIcon
                            name={'x_circle_o'}
                            color={COLOR_TEXT_INACTIVE}
                            size={16}/>

                    </TouchableOpacity>
                }

            </View>
        )
    }

    _onTextChanged = text => {
        this.setState({
            input: text
        });
    }

    _onSubmitPress = () => {
        if (!!this.props.disable) return;
        !!this.props.onSubmit && this.props.onSubmit(this.state.input);
    }

    _onClearPress = () => {
        if (!!this.props.disable) return;
        this.setState({
            input: undefined
        });
        !!this.props.onClear && this.props.onClear();
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (nextState.input !== this.state.input) return true;
        if (nextProps.isLoading !== this.props.isLoading) return true;
        if (nextProps.placeHolder !== this.props.placeHolder) return true;
        if (nextProps.disable !== this.props.disable) return true;
        return false;
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.value !== this.state.input) {
            this.setState({
                input: nextProps.value
            })
        }
    }
}

SearchInput.propTypes = {
    style: PropTypes.any,
    placeHolder: PropTypes.string,
    isLoading: PropTypes.bool,
    value: PropTypes.string,
    disable: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func
}