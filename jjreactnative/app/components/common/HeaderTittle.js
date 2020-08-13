import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { COLOR_PRIMARY } from '../../resources/colors';

const HeaderTitle = (props) => (
    <Text style={[styles.tittle, props.style]}>
        {props.children}
    </Text>
)

const styles = StyleSheet.create({
    tittle: {
        color: COLOR_PRIMARY,
        fontWeight: 'bold',
        fontSize: 17,
    }
});

export default HeaderTitle;