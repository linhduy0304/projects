import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from "prop-types";

import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import JJIcon from '../../../common/view/icon/JJIcon';

export default class FormInfoVertical extends BasePureComponent {

    render() {

        return (
            <View style={[this.props.style, styles.container, !!this.props.removeDivider ? undefined : styles.bottomBorder]}>

                {
                    !!this.props.icon &&
                    <View>
                        <JJIcon
                            name={this.props.icon}
                            color={COLOR_TEXT_INACTIVE}
                            size={DIMENSION_TEXT_CONTENT}/>
                    </View>
                }

                <View style={[styles.labelLayout, {marginLeft: !!this.props.icon ? DIMENSION_PADDING_SMALL : 0}]}>
                    <Text style={styles.label}>
                        {this.props.label}
                    </Text>

                    {
                        typeof this.props.value === 'string' &&
                        <Text style={{ color: !!this.props.valueColor ? this.props.valueColor: COLOR_TEXT_BLACK_1, fontWeight: !!this.props.valueWeight ? this.props.valueWeight : undefined}}>
                            {this.props.value}
                        </Text>
                    }

                    {
                        typeof this.props.value === 'object' && this.props.value
                    }

                </View>

            </View>
        )
    }
}

FormInfoVertical.propTypes = {
    style: PropTypes.any,
    icon: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    valueColor: PropTypes.any,
    valueWeight: PropTypes.any,
    removeDivider: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    labelLayout: {
        flexDirection: 'column'
    },
    label: {
        color: COLOR_TEXT_INACTIVE,
        marginBottom: DIMENSION_PADDING_SMALL
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR_LINE
    }
});