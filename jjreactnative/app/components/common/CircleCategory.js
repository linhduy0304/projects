import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import JJIcon from './JJIcon';
import {COLOR_LINE, COLOR_TEXT_BLACK_1} from '../../resources/colors';
import PropTypes from 'prop-types'
import {DIMENSION_PADDING_TINY, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";
import {BaseComponent} from "./BaseComponent";

const iconWidth = Dimensions.get("window").width / 4;

export default class CircleCategory extends BaseComponent {

    render() {
        const { name } = this.props;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={[styles.cell, this.props.style]}>
                <View style={styles.iconWrapper}>
                    <JJIcon uri={this.props.uri}
                            name={this.props.icon}
                            style={styles.icon}
                            color={this.props.color}
                            size={!!this.props.size ? this.props.size : 24} />
                </View>
                <Text numberOfLines={1}
                      style={[styles.label, {color: !!this.props.color ? this.props.color : COLOR_TEXT_BLACK_1}]}>
                    {name}
                </Text>
            </TouchableOpacity>
        );
    }

    _onPress = () => {
        if (!!this.props.onPress) this.props.onPress(this.props.item);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.icon !== this.props.icon) return true;
        if (nextProps.name !== this.props.name) return true;
        if (nextProps.uri !== this.props.uri) return true;
        if (nextProps.color !== this.props.color) return true;
        if (nextProps.size !== this.props.size) return true;
        return false;
    }
}

CircleCategory.propTypes = {
    icon: PropTypes.any,
    name: PropTypes.any,
    uri: PropTypes.any,
    color: PropTypes.any,
    size: PropTypes.any,
    onPress: PropTypes.any,
    item: PropTypes.any
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        backgroundColor: 'white',
        height: iconWidth / 1.8,
        width: iconWidth / 1.8,
        borderColor: COLOR_LINE,
        borderRadius: iconWidth / 3.6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 24,
        color: COLOR_TEXT_BLACK_1,
    },
    label: {
        marginTop: DIMENSION_PADDING_TINY,
        fontSize: DIMENSION_TEXT_CONTENT
    },
});
