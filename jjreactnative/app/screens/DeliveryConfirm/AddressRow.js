import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_LARGE } from '../../resources/dimens';
import { COLOR_TEXT_GRAY } from '../../resources/colors';
import JJIcon from '../../common/view/icon/JJIcon';
import { getErrorMessage } from '../../utils/text-message';
import Alert from '../../common/view/alert/Alert';

export default class AddressRow extends Component {
    chooseLocation = async () => {
        try {
            const detail = await this.props.fetchDetails(this.props.item.place_id);
            this.props.onPress(this.props.item.description, detail.geometry.location.lat, detail.geometry.location.lng);
        } catch (error) {
            this.refs.alert.show('Thông báo', getErrorMessage(error), [
                {
                    title: 'OK',
                    isHighlight: true,
                    onPress: () => {}
                }
            ]);
        }
    };

    onPress = () => {
        Keyboard.dismiss();
        this.chooseLocation();
    };

    render() {
        return (
            <TouchableOpacity style={styles.constainer} onPress={this.onPress}>
                <JJIcon name="locate_o" size={20} color={COLOR_TEXT_GRAY} />
                <View style={{ marginLeft: DIMENSION_PADDING_LARGE, flex: 1 }}>
                    <Text style={{}} numberOfLines={3}>
                        {this.props.item.description}
                    </Text>
                </View>
                <Alert ref={'alert'} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        paddingVertical: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
        flex: 1
    }
});
