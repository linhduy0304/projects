import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {BaseComponent} from "../base/BaseComponent";
import JJHeader from "../../components/common/JJHeader";
import {COLOR_TEXT_INACTIVE} from "../../resources/colors";

export default class ModalComponent extends BaseComponent {


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={{
                        flex: 1
                    }}
                    activeOpacity={0.9}
                    onPress={this.props.onClosePressed}/>

                <View style={styles.content}>
                    <JJHeader
                        title={this.props.title}
                        leftIcon={'x_o'}
                        leftIconColor={COLOR_TEXT_INACTIVE}
                        removeStatusBar={true}
                        onGoBackAction={this.props.onClosePressed}
                        overrideGoBack={true}
                    />
                    {this.props.children}
                </View>
            </View>
        )
    }
}

ModalComponent.propTypes = {
    onClosePressed: PropTypes.func,
    title: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        elevation: 2,
        shadowColor: '#fff',
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 2,
            width: 2
        },
        shadowRadius: 1
    },
    content: {
        width: '100%',
        height: '60%',
        backgroundColor: 'white',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderColor: 'white',
        borderWidth: 1
    }
});