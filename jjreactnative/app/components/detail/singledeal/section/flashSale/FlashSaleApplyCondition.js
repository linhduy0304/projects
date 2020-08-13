import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../../../../resources/colors";
import {BaseComponent} from "../../../../../common/base/BaseComponent";

export default class FlashSaleApplyCondition extends BaseComponent {

    render() {

        if (!this.props.conditions || this.props.conditions.size < 1) return null;

        return (
            <View>
                {
                    this.props.conditions.map((condition, index) => {
                        if (!condition || condition.length < 1) return null;
                        if (index > 0 && !this.props.isExpanded) return null;
                        return (
                            <View style={styles.container} key={`fs_condition_${index}`}>
                                <Text style={styles.labelTitle}>
                                    Lưu ý Flash sale:
                                </Text>
                                <Text style={styles.textContent}>
                                    {condition}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (!!nextProps.conditions && !nextProps.conditions.equals(this.props.conditions)) return true;
        if (nextProps.isExpanded !== this.props.isExpanded) return true;
        return false;
    }
}

FlashSaleApplyCondition.propTypes = {
    conditions: PropTypes.object,
    isExpanded: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        padding: DIMENSION_PADDING_SMALL,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderColor: '#FFBBCC',
        borderWidth: 1,
        backgroundColor: 'rgba(231, 57, 72, 0.1)',
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM
    },
    labelTitle: {
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold',
        color: COLOR_TEXT_BLACK_1
    },
    textContent: {
        marginTop: DIMENSION_PADDING_TINY,
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1
    }
});