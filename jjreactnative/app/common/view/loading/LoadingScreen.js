import React from 'react';
import {View} from 'react-native';
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../../resources/colors";
import {BasePureComponent} from "../../base/BasePureComponent";
import {Spinner} from "native-base";

export default class LoadingScreen extends BasePureComponent {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLOR_GRAY_BG,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>

                <Spinner color={COLOR_PRIMARY} />

            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
    }
}
