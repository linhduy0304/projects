import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from "prop-types";

import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import JJIcon from '../../../common/view/icon/JJIcon';

export default class FormInfoVertical extends BasePureComponent {

    render() {

        return (
            <View style={[this.props.style, styles.container]}>

                <View style={styles.labelLayout}>
                    {
                        !!this.props.icon &&
                        <JJIcon
                            name={this.props.icon}
                            color={COLOR_TEXT_INACTIVE}
                            size={DIMENSION_TEXT_CONTENT}/>
                    }

                    <Text style={[styles.label, {marginLeft: !!this.props.icon ? DIMENSION_PADDING_SMALL : 0}]}>
                        {this.props.label} {!!this.props.subLabel && <Text style={styles.subLabel}>{this.props.subLabel}</Text>}
                    </Text>
                </View>

                {
                    typeof this.props.value === 'string' &&
                    <Text style={[styles.value, { color: !!this.props.valueColor ? this.props.valueColor: COLOR_TEXT_BLACK_1, fontWeight: !!this.props.valueWeight ? this.props.valueWeight : undefined}]}>
                        {this.props.value}
                    </Text>
                }

                {
                    typeof this.props.value === 'object' &&
                    <View style={styles.valueLayout}>
                        {this.props.value}
                    </View>
                }

            </View>
        )
    }
}

FormInfoVertical.propTypes = {
    style: PropTypes.any,
    icon: PropTypes.string,
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
    labelLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    valueLayout: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});