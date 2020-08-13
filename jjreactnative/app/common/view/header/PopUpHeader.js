import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { BasePureComponent } from '../../base/BasePureComponent';
import {COLOR_LINE, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from '../../../resources/colors';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_HEADER
} from '../../../resources/dimens';
import JJIcon from '../icon/JJIcon';
import Text from '../text/JJText';

const headerHeigh = 56;

export default class PopUpHeader extends BasePureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            height: headerHeigh,
            width: headerHeigh,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={this.props.onClose}
        >
          <JJIcon style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }} name={'x_o'} size={18} color={COLOR_TEXT_INACTIVE}/>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>
            {this.props.mainText}
          </Text>
        </View>
        <View style={styles.bottomLine}/>
      </View>
    );
  }
}

PopUpHeader.propTypes = {
    mainText: PropTypes.string,
    onClose: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: DIMENSION_RADIUS_LARGE,
        borderTopLeftRadius: DIMENSION_RADIUS_LARGE
    },
    content: {
        flex: 1,
        height: headerHeigh,
        marginRight: headerHeigh,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_HEADER,
        marginBottom: Platform.OS === 'ios' ? 4 : 0,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomLine: {
        backgroundColor: COLOR_LINE,
        height: 0.8,
        position: 'absolute',
        bottom: 0,
        left: DIMENSION_PADDING_MEDIUM,
        right: DIMENSION_PADDING_MEDIUM
    }
});
