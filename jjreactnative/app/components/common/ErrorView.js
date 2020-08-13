
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import { COLOR_PRIMARY } from '../../resources/colors';

const ErrorView = (props) => (

    <View style={styles.container}>
        <Text style={styles.label}>
            {props.error_message ? props.error_message : 'Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!'}
        </Text>
        <TouchableOpacity
            onPress={props.onTryAgain}
            style={styles.button}>
            <Text style={{ color: 'white' }}>THỬ LẠI</Text>
        </TouchableOpacity>
    </View>
)

ErrorView.propTypes = {
    error_message: PropTypes.any,
    onTryAgain: PropTypes.any
}

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
    button: {
        marginTop: 16,
        padding: 16,
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 5
    }
});

export default ErrorView;