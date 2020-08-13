import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Platform, Keyboard } from 'react-native';
import { COLOR_TEXT_GRAY } from '../../resources/colors';
import JJIcon from '../../common/view/icon/JJIcon';
import { Spinner } from 'native-base';
import Text from '../../common/view/text/JJText';
import { styles } from './style';
import Alert from '../../common/view/alert/Alert';

export default class PromotionInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotionCode: '',
            isGettingCode: false
        };
    }

    onPressApply = () => {
        if (this.state.promotionCode.match(/[\W]/)) {
            // Alert.alert('Lỗi', 'Mã giảm thêm không tồn tại');
            this.refs.alert.show('Lỗi', 'Mã giảm thêm không tồn tại', [
                {
                    title: 'OK',
                    isHighlight: true,
                    onPress: () => {}
                }
            ]);
        } else {
            if (this.state.promotionCode.trim().length !== 0) {
                Keyboard.dismiss();
                this.props.getCode(this.state.promotionCode.trim());
            }
        }
    };

    renderApplyButton = () => {
        if (this.props.isGettingCode) {
            return (
                <View style={[styles.applyPromotionBtn, { width: 80, paddingVertical: 14 }]}>
                    <Spinner color={'#ffffff'} size={Platform.OS === 'ios' ? 1 : 'small'} />
                </View>
            );
        } else if (!!this.props.code.id) {
            return;
        }

        return (
            <TouchableOpacity style={styles.applyPromotionBtn} onPress={this.onPressApply}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Áp dụng</Text>
            </TouchableOpacity>
        );
    };

    clearALl = () => {
        this.setState({
            promotionCode: ''
        });
        this.props.clearPromoCode();
    };

    renderCodeSection = () => {
        if (!!this.props.code.id) {
            return (
                <View style={styles.promotionLayout}>
                    <Text style={{ color: '#22C300', fontSize: 14 }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.props.code.name}</Text> đã kích hoạt
                    </Text>
                    <JJIcon name="chevron_right_o" size={10} color={'#22C300'} />
                </View>
            );
        } else {
            return (
                <TextInput
                    style={styles.promotionInput}
                    underlineColorAndroid="transparent"
                    onChangeText={this._onChangeText}
                    value={this.state.promotionCode}
                    multiline={false}
                    placeholder="Nhập mã giảm thêm (nếu có)"
                    autoCapitalize="characters"
                />
            );
        }
    };

    _onChangeText = text => {
        let newtext = text.replace(/[^A-Z0-9]/ig, "")
        this.setState({promotionCode: newtext.toUpperCase()})
    }

    render() {
        const {promotionCode} = this.state;
        return (
            <View style={styles.promotionSection}>
                <View style={{ flex: 1, position: 'relative' }}>
                    {this.renderCodeSection()}
                    {!!this.props.code.id && (
                        <TouchableOpacity style={{ position: 'absolute', top: 13, right: 16 }} onPress={this.clearALl}>
                            <JJIcon name="x_circle_o" size={16} color={COLOR_TEXT_GRAY} />
                        </TouchableOpacity>
                    )}
                </View>

                {!!promotionCode && promotionCode !== '' && this.renderApplyButton()}
                <Alert ref={'alert'} />
            </View>
        );
    }
}
