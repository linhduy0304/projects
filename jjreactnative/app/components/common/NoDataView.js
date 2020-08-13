
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { COLOR_PRIMARY } from '../../resources/colors';

const NoDataView = (props) => (

    <View style={[styles.container, props.style]}>
        <Text style={styles.label}>
            {props.message ? props.message : 'Không có dữ liệu'}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        padding: 8,
        textAlign: 'center',
    },
});

export default NoDataView;