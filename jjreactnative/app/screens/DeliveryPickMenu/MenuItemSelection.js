import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {BasePureComponent} from "../../common/base/BasePureComponent";
import JJIcon from '../../common/view/icon/JJIcon';
import Text from '../../common/view/text/JJText';
import {styles} from './styles';
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE_DISABLE} from "../../resources/colors";

export default class MenuItemSelection extends BasePureComponent {

    render() {
        return (
            <View style={styles.menuItemSelection}>
                <TouchableOpacity
                    style={styles.buttonPlusItem}
                    activeOpacity={0.8}
                    onPress={this.props.onMinus}>
                    <JJIcon
                        color={this.props.value < 1 ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1}
                        size={16}
                        name={'minus_o'}/>
                </TouchableOpacity>

                <View style={styles.itemSelectionCount}>
                    <Text style={styles.textCount}>
                        {this.props.value}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonPlusItem}
                    activeOpacity={0.8}
                    onPress={this.props.onPlus}>
                    <JJIcon
                        color={COLOR_TEXT_BLACK_1}
                        size={16}
                        name={'plus_o'}/>
                </TouchableOpacity>
            </View>
        )
    }
}

MenuItemSelection.propTypes = {
    value: PropTypes.number,
    onPlus: PropTypes.func,
    onMinus: PropTypes.func
}