import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


import {BasePureComponent} from "../../base/BasePureComponent";
import Text from '../text/JJText';
import {styles} from './styles';
import {COLOR_PRIMARY} from "../../../resources/colors";

export default class AlertButton extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                style={styles.alertButton}
                activeOpacity={0.8}
                onPress={this._onPress}>
                <Text style={[styles.titleAlertButton, {fontWeight: !!this.props.isHighlight ? 'bold' : 'normal', color: this.props.color}]}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        !!this.props.onClose && this.props.onClose(this.props.onPress);
    }
}

AlertButton.defaultProps = {
    color: COLOR_PRIMARY
}

AlertButton.propTypes = {
    title: PropTypes.string,
    isHighlight: PropTypes.bool,
    color: PropTypes.any,
    isLastButton: PropTypes.bool,
    onPress: PropTypes.func,
    onClose: PropTypes.func
}