import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { COLOR_PRIMARY } from '../../resources/colors';
import JJIcon from './JJIcon';
import {DIMENSION_PADDING_TINY, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";

type Props = {
    onPress?: PropTypes.func,
    text?: PropTypes.string
}

class ShowAllButton extends Component<Props> {
    render() {
        return (
            <TouchableOpacity
                style={{
                    paddingTop: DIMENSION_PADDING_TINY,
                    paddingBottom: DIMENSION_PADDING_TINY,
                    paddingLeft: DIMENSION_PADDING_TINY,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={this.props.onPress}
            >
                <Text style={{ color: COLOR_PRIMARY, marginRight: DIMENSION_PADDING_TINY, fontSize: DIMENSION_TEXT_CONTENT }}>
                    {this.props.text ? this.props.text : 'Xem tất cả'}
                </Text>
                <JJIcon style={{ marginTop: 3 }}
                        name={'chevron_right_o'}
                        color={COLOR_PRIMARY}
                        size={8} />
            </TouchableOpacity>
        );
    }
}

export default ShowAllButton;
