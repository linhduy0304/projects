import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';

import { DIMENSION_RADIUS_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_MEDIUM } from '../../resources/dimens';
import { BasePureComponent } from '../../common/base/BasePureComponent';
import JJIcon from '../../common/view/icon/JJIcon';

export default class ButtonSubTitle extends BasePureComponent {
    render() {
        return (
            <TouchableOpacity
                style={styles.ctButton}
                activeOpacity={0.8}
                onPress={this.props.onPress}
            >
                <View style={{flex: 1}}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{this.props.title}</Text>

                    {!!this.props.subTitle && <Text style={{ color: '#fff' }}>{this.props.subTitle}</Text>}
                </View>
                <JJIcon name={'chevron_right_o'} size={18} color={'#fff'} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    ctButton: {
        flexDirection: 'row',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
        paddingHorizontal: DIMENSION_PADDING_MEDIUM,
        paddingVertical: DIMENSION_PADDING_SMALL,

        position: 'absolute',
        bottom: DIMENSION_PADDING_MEDIUM,
        left: DIMENSION_PADDING_MEDIUM,
        right: DIMENSION_PADDING_MEDIUM,

        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: '#22C300'
    }
});

ButtonSubTitle.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    backgroundColor: PropTypes.any,
    textColor: PropTypes.any,
    enable: PropTypes.bool,
    borderRadius: PropTypes.number, //corner radius button
    style: PropTypes.any,
    onPress: PropTypes.func
};
