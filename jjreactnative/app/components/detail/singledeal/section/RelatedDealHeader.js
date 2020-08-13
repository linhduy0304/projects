import { View } from 'react-native';
import { Text } from 'native-base';
import React, { Component } from 'react';

import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from '../../../../resources/colors';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_HEADER} from "../../../../resources/dimens";

export default class RelatedDealHeader extends React.PureComponent {

    render() {
        return (
            <View style={{ backgroundColor: COLOR_GRAY_BG, justifyContent: 'center', padding: DIMENSION_PADDING_MEDIUM }}>
                <Text style={{ fontWeight: 'bold', color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_HEADER }}>
                    Có thể bạn quan tâm
                </Text>
            </View>
        )
    }
}