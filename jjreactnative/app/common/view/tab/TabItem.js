import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";

export default class TabItem extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={0.7}
                style={this.props.style}>

                {this.props.children}
            </TouchableOpacity>
        )
    }
}

TabItem.propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
    onPress: PropTypes.any
}