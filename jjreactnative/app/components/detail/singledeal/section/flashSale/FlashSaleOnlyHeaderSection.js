import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

import FlashSaleCountDownHeader from './FlashSaleCountDownHeader';
import {BasePureComponent} from "../../../../../common/base/BasePureComponent";
import {
    DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import {COLOR_LINE, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";

export default class FlashSaleOnlyHeaderSection extends BasePureComponent {

    render() {

        return (
            <View style={styles.container}>
                <FlashSaleCountDownHeader
                    time={this.props.time}
                    numberUnit={this.props.numberUnit}
                    totalNumber={this.props.totalNumber}
                    availableNumber={this.props.availableNumber}
                    highlight={this.props.highlight}
                    active={this.props.active}
                    hasTime={false}
                    onTimeOut={this.props.onTimeOut}/>

                <Text style={styles.labelUseCode}>
                    Hãy sử dụng mã để tiếp tục săn khuyến mãi!
                </Text>
            </View>
        )
    }

}

FlashSaleOnlyHeaderSection.propTypes = {
    active: PropTypes.bool,
    time: PropTypes.any,
    availableNumber: PropTypes.number,
    totalNumber: PropTypes.number,
    numberUnit: PropTypes.string,
    highlight: PropTypes.string,
    onTimeOut: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        marginTop: DIMENSION_PADDING_LARGE,
        marginLeft: DIMENSION_PADDING_SMALL,
        marginRight: DIMENSION_PADDING_SMALL,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_LINE,
        backgroundColor: 'white'
    },
    labelUseCode: {
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_INACTIVE,
        textAlign: 'center',
        padding: DIMENSION_PADDING_MEDIUM
    }
});