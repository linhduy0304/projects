import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {COLOR_LINE, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import PropTypes from "prop-types";
import BookingHighlight from "../highlight/BookingHighlight";

export default class RowFormBookingHighlight extends BasePureComponent {

    render() {

        return (
            <View style={{marginTop: DIMENSION_PADDING_SMALL}}>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.label}>
                        Ưu đãi
                    </Text>

                    <BookingHighlight
                        bookingHighlight={this.props.bookingHighlight}
                        promoCodeHighlight={this.props.promoCodeHighlight}
                        promoCodeType={this.props.promoCodeType}/>

                </View>
                <View style={styles.line}/>
            </View>
        )
    }
}

RowFormBookingHighlight.propTypes = {
    style: PropTypes.any,
    bookingHighlight: PropTypes.string,
    promoCodeHighlight: PropTypes.string,
    promoCodeType: PropTypes.string
};

const styles = StyleSheet.create({
    label: {
        justifyContent: 'flex-start',
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: COLOR_LINE,
        marginTop: DIMENSION_PADDING_SMALL
    }
});