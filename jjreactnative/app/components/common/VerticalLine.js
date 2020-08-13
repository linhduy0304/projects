import React from 'react';
import { View, StyleSheet } from 'react-native';

const VerticalLine = (props) => (
    <View style={[styles.tittle, props.style]} />
)

const styles = StyleSheet.create({
    tittle: {
        backgroundColor: '#e8e8e8',
        width: 1,
    }
});

export default VerticalLine;