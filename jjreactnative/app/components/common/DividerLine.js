import React from 'react';
import { View, StyleSheet } from 'react-native';
import {COLOR_LINE} from "../../resources/colors";

const DividerLine = (props) => (
    <View style={[styles.tittle, props.style]} />
)

const styles = StyleSheet.create({
    tittle: {
        backgroundColor: COLOR_LINE,
        height: 1,
    }
});

export default DividerLine;