
import React from 'react';
import {View} from 'react-native'
import {BasePureComponent} from "./BasePureComponent";
import {COLOR_PRIMARY} from "../../resources/colors";
import {Spinner} from "native-base";

export default class LoadMoreView extends BasePureComponent {
    render() {
        return (
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Spinner color={COLOR_PRIMARY} />
            </View>
        )
    }
}