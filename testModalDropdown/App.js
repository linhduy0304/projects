/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        this._button = null;
        this._buttonFrame = null;

        this.state = {
            showDropdown: false
        };
    }

    _updatePosition(callback) {
        if (this._button && this._button.measure) {
            this._button.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = { x: px, y: py, w: width, h: height };
                callback && callback();
            });
        }
    }

    _show() {
        this._updatePosition(() => {
            this.setState({
                showDropdown: true
            });
        });
    }

    _onButtonPress = () => {
        this._show();
    };

    _renderButton() {
        const { children } = this.props;

        return (
            <TouchableOpacity ref={button => (this._button = button)} onPress={this._onButtonPress}>
                {children || (
                    <View style={styles.button}>
                        <Text numberOfLines={1}>{'dddd'}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    }

    _calcPosition() {
        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const dropdownHeight = StyleSheet.flatten(styles.dropdown).height;

        const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        const rightSpace = windowWidth - this._buttonFrame.x;
        const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        const showInLeft = rightSpace >= this._buttonFrame.x;

        const positionStyle = {
            height: dropdownHeight,
            top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight)
        };

        if (showInLeft) {
            positionStyle.left = this._buttonFrame.x;
        } else {
            const dropdownWidth = -1;
            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }
            positionStyle.right = rightSpace - this._buttonFrame.w;
        }

        return positionStyle;
    }

    _onRowPress = () => {
        this.setState({
            showDropdown: false
        });
    };

    _renderItem = ({ item }) => {
        const row = <Text>{item}</Text>;
        return <TouchableOpacity onPress={this._onRowPress}>{row}</TouchableOpacity>;
    };

    _renderDropdown() {
        return (
            <FlatList
                data={['asdf']}
                renderItem={this._renderItem}
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
            />
        );
    }

    _onRequestClose = () => {
        this.setState({
            showDropdown: false
        });
    };

    _onModalPress = () => {
        this.setState({
            showDropdown: false
        });
    };

    _renderModal() {
        const { showDropdown } = this.state;
        if (showDropdown && this._buttonFrame) {
            const frameStyle = this._calcPosition();
            const animationType = 'fade';
            return (
                <Modal
                    animationType={animationType}
                    visible={true}
                    transparent={true}
                    onRequestClose={this._onRequestClose}
                    supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                >
                    <TouchableWithoutFeedback disabled={!showDropdown} onPress={this._onModalPress}>
                        <View style={styles.modal}>
                            <View style={[styles.dropdown, frameStyle]}>{this._renderDropdown()}</View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderButton()}
                {this._renderModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        height: (33 + StyleSheet.hairlineWidth) * 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgray',
        borderRadius: 2,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 20,
        paddingVertical: 50
    },
    modal: {
        flex: 1
    }
});
