import {View} from 'react-native';
import React  from 'react';

import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_LARGE} from "../../../resources/dimens";
import {COLOR_TEXT_HINT} from "../../../resources/colors";
import {BasePureComponent} from "../BasePureComponent";

export default class CollectionHorizontalListPlaceholder extends BasePureComponent {

    render() {
        return (
            <View style={{padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_SMALL}}>
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

                <View style={{flexDirection: 'row'}}>

                    <View
                        style={{
                            height: 135,
                            width: 180,
                            marginTop: DIMENSION_PADDING_MEDIUM,
                            backgroundColor: COLOR_TEXT_HINT,
                            borderRadius: DIMENSION_RADIUS_LARGE
                        }}/>

                    <View
                        style={{
                            height: 135,
                            width: 180,
                            marginLeft: DIMENSION_PADDING_MEDIUM,
                            marginTop: DIMENSION_PADDING_MEDIUM,
                            backgroundColor: COLOR_TEXT_HINT,
                            borderRadius: DIMENSION_RADIUS_LARGE
                        }}/>

                </View>
            </View>
        )
    }
}