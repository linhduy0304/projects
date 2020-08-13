import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';

import { BasePureComponent } from '../../base/BasePureComponent';
import { COLOR_PRIMARY, COLOR_TEXT_BLACK_1 } from '../../../resources/colors';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from '../../../resources/dimens';
import JJIcon from '../icon/JJIcon';

export default class SectionHeader extends BasePureComponent {
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {/*content*/}
                <View style={[styles.contentLayout, this.props.contentLayout]}>
                    <TouchableOpacity
                        style={[styles.titleButton, { flex: !!this.props.subTitle ? 0 : 1 }]}
                        onPress={this.props.onTitlePressed}
                        disabled={!this.props.onTitlePressed}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.title, this.props.textStyle]}>{this.props.title}</Text>
                    </TouchableOpacity>

                    {!!this.props.subTitle && <Text style={[this.props.subTitleStyle]}>{this.props.subTitle}</Text>}

                    {!!this.props.rightTitle && (
                        <TouchableOpacity
                            style={styles.rightTitleButton}
                            onPress={this.props.onRightTitlePressed}
                            disabled={!this.props.onRightTitlePressed}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.rightTitleText}>{this.props.rightTitle}</Text>
                            <JJIcon style={{ marginTop: 3 }} name={'chevron_right_o'} color={COLOR_PRIMARY} size={8} />
                        </TouchableOpacity>
                    )}
                </View>

                {/*line*/}
                <View style={[styles.bottomLine, { backgroundColor: this.props.lineStyle }]} />
            </View>
        );
    }
}

SectionHeader.propTypes = {
    style: PropTypes.any,
    title: PropTypes.string,
    textStyle: PropTypes.any,
    rightTitle: PropTypes.string,
    onTitlePressed: PropTypes.func,
    onRightTitlePressed: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    contentLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleButton: {
        flex: 1,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_SMALL
    },
    title: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_HEADER,
        fontWeight: 'bold'
    },
    rightTitleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: DIMENSION_PADDING_TINY,
        paddingBottom: DIMENSION_PADDING_TINY,
        paddingLeft: DIMENSION_PADDING_SMALL
    },
    rightTitleText: {
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_CONTENT,
        marginRight: DIMENSION_PADDING_TINY
    },
    bottomLine: {
        width: '20%',
        height: 2,
        backgroundColor: COLOR_PRIMARY
    }
});
