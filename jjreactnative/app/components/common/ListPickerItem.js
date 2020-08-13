import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import { Text } from 'native-base';
import JJIcon from './JJIcon'
import {COLOR_TEXT_BLACK_1} from "../../resources/colors";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";

export default class ListPickerItem extends React.Component {

    render() {

        return (
            <TouchableOpacity style={{padding: DIMENSION_PADDING_MEDIUM, flexDirection: 'row'}}
                              onPress={this.props.onPress}
                              activeOpacity={0.8}>
                <Text style={{flex: 1, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                    {this.props.text}
                </Text>
                {
                    this.props.isSelected &&
                    <JJIcon color={'#4BC731'}
                            size={18}
                            name={'check_o'}/>
                }
            </TouchableOpacity>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.text !== this.props.text || nextProps.isSelected !== this.props.isSelected;
    }
}

ListPickerItem.propTypes = {
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func
}