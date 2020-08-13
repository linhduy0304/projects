import { View, Dimensions } from 'react-native';
import React  from 'react';

import {COLOR_TEXT_HINT} from "../../../resources/colors";
import {BasePureComponent} from "../BasePureComponent";
import {DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";

const width = Dimensions.get("window").width

export default class FixedGridPlaceholder extends BasePureComponent {

    render() {

        const smallItemWidth = width/2 - 10.5;

        return (
            <View style={{width: '100%', padding: DIMENSION_PADDING_SMALL}}>
                <View
                    style={{
                        width: '100%',
                        height: width/2,
                        backgroundColor: COLOR_TEXT_HINT,
                        borderRadius: DIMENSION_RADIUS_MEDIUM
                    }}/>
                <View
                    style={{
                        width: '100%',
                        height: width/4 - 2,
                        flexDirection: 'row',
                        marginTop: DIMENSION_PADDING_SMALL,
                        justifyContent: 'space-between'
                    }}>
                    <View
                        style={{
                            width: smallItemWidth,
                            height: '100%',
                            backgroundColor: COLOR_TEXT_HINT,
                            borderRadius: DIMENSION_RADIUS_MEDIUM
                        }}/>
                    <View
                        style={{
                            width: smallItemWidth,
                            height: '100%',
                            backgroundColor: COLOR_TEXT_HINT,
                            borderRadius: DIMENSION_RADIUS_MEDIUM
                        }}/>
                </View>
            </View>
        )
    }
}