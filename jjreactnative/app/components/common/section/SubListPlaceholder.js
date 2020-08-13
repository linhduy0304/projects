import {View, Dimensions, StyleSheet} from 'react-native';
import React  from 'react';

import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL} from "../../../resources/dimens";
import {COLOR_TEXT_HINT} from "../../../resources/colors";
import {BasePureComponent} from "../BasePureComponent";

const iconSize = Dimensions.get("window").width / 7.2;
const borderRadius = iconSize / 2;

export default class SubListPlaceholder extends BasePureComponent {

    render() {
        return (
            <View style={{padding: DIMENSION_PADDING_MEDIUM}}>
                <View
                    style={{
                        height: 16,
                        width: '50%',
                        backgroundColor: COLOR_TEXT_HINT
                    }}/>
                <View
                    style={{
                        backgroundColor: COLOR_TEXT_HINT,
                        width: 60,
                        height: 2,
                        marginTop: DIMENSION_PADDING_SMALL
                    }} />
                <View
                    style={{
                        paddingTop: DIMENSION_PADDING_MEDIUM,
                        flexDirection: 'row'
                    }}>

                    <View style={{marginRight: DIMENSION_PADDING_MEDIUM}}>
                        <View style={styles.buttonPlaceholder}/>
                        <View style={styles.textPlaceholder}/>
                    </View>

                    <View style={{marginRight: DIMENSION_PADDING_MEDIUM}}>
                        <View style={styles.buttonPlaceholder}/>
                        <View style={styles.textPlaceholder}/>
                    </View>

                    <View style={{marginRight: DIMENSION_PADDING_MEDIUM}}>
                        <View style={styles.buttonPlaceholder}/>
                        <View style={styles.textPlaceholder}/>
                    </View>

                    <View>
                        <View style={styles.buttonPlaceholder}/>
                        <View style={styles.textPlaceholder}/>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonPlaceholder: {
        width: iconSize,
        height: iconSize,
        borderRadius: borderRadius,
        backgroundColor: COLOR_TEXT_HINT
    },

    textPlaceholder: {
        width: iconSize,
        height: DIMENSION_PADDING_SMALL,
        marginTop: DIMENSION_PADDING_SMALL,
        backgroundColor: COLOR_TEXT_HINT
    }
});