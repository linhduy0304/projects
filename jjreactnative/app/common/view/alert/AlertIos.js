import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseComponent } from '../../base/BaseComponent';
import { AppConfig } from '../../config';
import Text from '../text/JJText';
import PropTypes from 'prop-types';

export default class AlertIos extends BaseComponent {
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
                        <Text style={styles.cancel}>{textCancel}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressOk} style={styles.ctOk}>
                        <Text style={[styles.cancel, { fontWeight: 'bold' }]}>{textOk}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

AlertIos.defaultProps = {
    title: 'Thông báo',
    content: '',
    textCancel: 'Huỷ',
    textOk: 'Ok',
};

AlertIos.propTypes = {
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
        color: '#007AFF'
    },
    content: {
        color: '#030303',
        lineHeight: 20,
        marginHorizontal: 15,
        marginTop: 9,
        textAlign:'center'
    },
    title: {
        fontSize: 18,
        marginTop: 16,
        color: '#030303',
        textAlign: 'center'
    },
    ctOk: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    ctAction: {
        flexDirection: 'row',
        height: 42,
        borderTopColor: 'rgba(77,77,77,0.1)',
        borderTopWidth: 1.5,
        marginTop: 32,
    },
    ctModal: {
        backgroundColor: '#FCFCFC',
        width: AppConfig.windowWidth - 100,
        borderRadius: 12
    }
});


