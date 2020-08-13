import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {PROMOCODE_UPGRADE} from "../../../const";

export default class BookingHighlight extends BasePureComponent {

    render() {

        if (!this.props.promoCodeHighlight || !this.props.promoCodeType) {
            return (
                <Text style={[{ textAlign: this.props.textAlign }, this.props.style, styles.text]}>
                    {this.props.bookingHighlight}
                </Text>
            )
        }

        if (PROMOCODE_UPGRADE === this.props.promoCodeType) {

            return (
                <Text style={[{ textAlign: this.props.textAlign }, this.props.style, styles.text]}>
                    {this.props.bookingHighlight + ' & ' + this.props.promoCodeHighlight}
                </Text>
            )
        }

        return (
            <View style={[{ justifyContent: this.props.viewAlign }, styles.container, this.props.style]}>
                <Text style={styles.textLineThrough}>
                    {this.props.bookingHighlight}
                </Text>
                <Text style={styles.text}>
                    {' ' + this.props.promoCodeHighlight}
                </Text>
            </View>
        )
    }

}

BookingHighlight.propTypes = {
    style: PropTypes.any,
    textAlign: PropTypes.any,
    viewAlign: PropTypes.any,
    bookingHighlight: PropTypes.string,
    promoCodeHighlight: PropTypes.string,
    promoCodeType: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_PRIMARY
    },
    textLineThrough: {
        color: COLOR_TEXT_INACTIVE,
        textDecorationLine: 'line-through',
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold'
    }
});