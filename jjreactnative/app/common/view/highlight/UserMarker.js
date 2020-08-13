import React from 'react';
import {View} from 'react-native';

import {styles} from './styles';
import {BasePureComponent} from "../../base/BasePureComponent";

export default class UserMarker extends BasePureComponent {

    render() {

        return (
            <View style={styles.userMarkerCircle3}>
                <View style={styles.userMarkerCircle2}>
                    <View style={styles.userMarkerCircle1}/>
                </View>
            </View>
        )
    }
}