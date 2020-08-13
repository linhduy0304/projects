import React from 'react'
import {StyleSheet} from 'react-native';
import {Spinner} from 'native-base'

import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import FadeInView from '../../common/view/FadeInView'
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import Text from '../../../common/view/text/JJText';

export default class SplashLoadingView extends BasePureComponent {

    render() {
        return (
            <FadeInView style={styles.container}>
                <Text style={styles.text}>
                    JAM<Text style={styles.text2}>JA</Text>
                </Text>
                <Spinner color={COLOR_PRIMARY}/>
            </FadeInView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 36,
        color: COLOR_PRIMARY,
        margin: DIMENSION_PADDING_MEDIUM,
        textAlign: 'center'
    },
    text2: {
        fontWeight: 'normal',
        fontSize: 36,
        color: COLOR_PRIMARY
    }
});