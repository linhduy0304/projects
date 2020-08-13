import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import JJIcon from '../../common/JJIcon'
import PropTypes from 'prop-types'
import {DIMENSION_BUTTON_MEDIUM} from "../../../resources/dimens";
import {BasePureComponent} from "../../common/BasePureComponent";

export default class ButtonShare extends BasePureComponent {

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={this.props.onSearchPressed}
                    style={styles.button}>
                    <JJIcon name={'search'} size={18} color={COLOR_TEXT_INACTIVE} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.props.onSharePressed}
                    style={styles.button}>
                    <JJIcon name={'share_ios_o'} size={18} color={COLOR_TEXT_INACTIVE} />
                </TouchableOpacity>
            </View>
        )
    }
}

ButtonShare.propTypes = {
    onSharePressed: PropTypes.any,
    onSearchPressed: PropTypes.any
};

const styles = StyleSheet.create({
    button: {
        height: DIMENSION_BUTTON_MEDIUM,
        width: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


