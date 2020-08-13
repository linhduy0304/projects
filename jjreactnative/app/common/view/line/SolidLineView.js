import React from 'react';
import {View} from 'react-native';
import {BasePureComponent} from "../../base/BasePureComponent";
import {styles} from './styles';

export default class SolidLineView extends BasePureComponent {
    render() {
        return (
            <View style={[styles.solidLine, this.props.style]}/>
        )
    }
}