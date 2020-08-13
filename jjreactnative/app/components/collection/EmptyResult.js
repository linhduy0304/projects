import {BasePureComponent} from "../common/BasePureComponent";
import React from 'react'
import { Text } from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE
} from "../../resources/colors";

import JJIcon from "../common/JJIcon";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_CONTENT
} from "../../resources/dimens";

export default class EmptyResult extends BasePureComponent {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: DIMENSION_PADDING_MEDIUM}}>
                <View style={{
                    backgroundColor: 'rgba(240, 240, 240, 0.2)',
                    padding: 32,
                    borderRadius: 200,
                    borderWidth: 0.1,
                    borderColor: 'rgba(240, 240, 240, 0.2)',
                }}>
                    <View style={styles.circleNoData}>
                        <View style={styles.circleNoData}>
                            <JJIcon style={{ margin: 8 }}
                                    name={"search"}
                                    size={48}
                                    color={COLOR_TEXT_INACTIVE} />
                        </View>
                    </View>
                </View>
                <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_SMALL}}>
                    Không tìm thấy bộ sưu tập phù hợp
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    circleNoData: {
        padding: 16,
        backgroundColor: 'rgba(240, 240, 240, 0.3)',
        borderRadius: 200,
        borderWidth: 0.1,
        borderColor: 'rgba(240, 240, 240, 0.3)'
    }
})