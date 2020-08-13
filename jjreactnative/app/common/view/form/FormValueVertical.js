import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from "prop-types";

import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";

export default class FormValueVertical extends BasePureComponent {

    render() {

        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.label}>
                    {this.props.label} {!!this.props.subLabel && <Text style={styles.subLabel}>{this.props.subLabel}</Text>}
                </Text>

                <Text style={[styles.value, { color: !!this.props.valueColor ? this.props.valueColor: COLOR_TEXT_BLACK_1, fontWeight: !!this.props.valueWeight ? this.props.valueWeight : undefined}]}>
                    {`${this.props.value} đ`}
                </Text>

            </View>
        )
    }
}

FormValueVertical.propTypes = {
    style: PropTypes.any,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    value: PropTypes.any,
    valueColor: PropTypes.any,
    valueWeight: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        justifyContent: 'flex-start',
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    subLabel: {
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold'
    },
    value: {
        fontSize: DIMENSION_TEXT_CONTENT,
        textAlign: 'right',
        flex: 1
    }
});