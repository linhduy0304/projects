import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {BasePureComponent} from "../../base/BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {styles} from './styles';

export default class LoadingMore extends BasePureComponent {

    render() {

        return (
            <View style={[styles.loadingMoreContainer, this.props.style]}>
                <ActivityIndicator animating={true} color={COLOR_PRIMARY}/>
            </View>
        )
    }
}