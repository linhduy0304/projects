
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {COLOR_PRIMARY} from "../../resources/colors";
import {Spinner} from "native-base";

const LoadingView = (props) => (

    <View style={styles.container}>
        <Spinner color={COLOR_PRIMARY} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressing: {
        padding: 20,
        position: 'absolute',
    },
});

export default LoadingView;