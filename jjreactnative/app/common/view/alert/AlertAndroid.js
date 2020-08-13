import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseComponent } from '../../base/BaseComponent';
import { AppConfig } from '../../config';
import Text from '../text/JJText';
import PropTypes from 'prop-types';

export default class AlertAndroid extends BaseComponent {
    
    _onPressCancel = () => {
        this.props.onPressCancel();
    };

    _onPressOk = () => {
        this.props.onPressOk();
    };

    render() {
        const { content, title, textCancel, textOk } = this.props;
        return (
            <View style={styles.ctModal}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
                <View style={styles.ctAction}>
                    <TouchableOpacity onPress={this._onPressCancel} style={styles.ctOk}>
                        <Text style={styles.cancel}>{textCancel.toUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressOk} style={styles.ctOk}>
                        <Text style={styles.cancel}>{textOk.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

AlertAndroid.defaultProps = {
    title: 'Thông báo',
    content: '',
    textCancel: 'Huỷ',
    textOk: 'Ok',
};

AlertAndroid.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    textCancel: PropTypes.string,
    textOk: PropTypes.string,
    onPressCancel: PropTypes.func,
    onPressOk: PropTypes.func,
};

const styles = StyleSheet.create({
    cancel: {
        fontSize: 17,
        color: '#02a499',
        fontWeight: 'bold'
    },
    content: {
        color: '#030303',
        fontSize: 18,
        lineHeight: 24,
        marginHorizontal: 20,
        marginTop: 9
    },
    title: {
        fontSize: 22,
        marginTop: 16,
        color: '#030303',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    ctOk: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    ctAction: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 50,
        marginTop: 20,
    },
    ctModal: {
        backgroundColor: '#FCFCFC',
        width: AppConfig.windowWidth - 55,
        borderRadius: 2
    }
});


