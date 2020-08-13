import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BasePureComponent } from '../../common/base/BasePureComponent';
import JJIcon from '../../common/view/icon/JJIcon';
import { COLOR_PRIMARY } from '../../resources/colors';
import { DIMENSION_RADIUS_MEDIUM } from '../../resources/dimens';
import Text from '../../common/view/text/JJText';

export default class ExclusiveHighlight extends BasePureComponent {
    render() {
        return (
            <View style={{
                    position: 'absolute',
                    top: 14,
                    left: 14
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.ctLabel}>
                        <JJIcon name={'exclusive__o'} size={12} color={'white'} />
                        <Text style={{
                                color: '#fff',
                                fontSize: 8,
                                fontWeight: 'bold',
                            }}>
                            JAMJA
                        </Text>
                    </View>
                    <View style={styles.ctTriangleRight}/>
                </View>
                <View style={styles.ctTriangleBottom}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ctLabel: {
        backgroundColor: COLOR_PRIMARY,
        flexDirection: 'row',
        borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
        borderTopLeftRadius: DIMENSION_RADIUS_MEDIUM,
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4
    },
    ctTriangleRight: {
        width: 0,
        height: 0,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#C32534'
    },
    ctTriangleBottom: {
        width: 0,
        height: 0,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: '#C32534'
    }
});
