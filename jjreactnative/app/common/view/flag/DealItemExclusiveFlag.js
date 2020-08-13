import React from 'react'
import {View, StyleSheet} from "react-native";
import {
    DIMENSION_RADIUS_MEDIUM,
} from "../../../resources/dimens";
import JJIcon from "../icon/JJIcon";
import {BasePureComponent} from "../../base/BasePureComponent";

export default class DealItemExclusiveFlag extends BasePureComponent {

    render() {

        return (
            <View style={styles.container}>
                <JJIcon name={'exclusive__o'} size={16} color={'white'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 24,
        width: 24,
        backgroundColor: '#e73948E6',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    }
});