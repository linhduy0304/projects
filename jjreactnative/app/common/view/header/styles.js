import {StyleSheet} from 'react-native';
import {COLOR_LINE} from "../../../resources/colors";
import {AppConfig} from '../../config';
import {DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER} from "../../../resources/dimens";

export const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLOR_LINE,
        alignItems: 'center',
        paddingBottom: 4
    },
    buttonBack: {
        width: AppConfig.headerHeight,
        height: AppConfig.headerHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSubTitle: {
        color: '#8F8F8F',
        textAlign: 'center',
        fontSize: DIMENSION_TEXT_CONTENT,
        marginBottom: 2
    },
    textTitle: {
        textAlign: 'center',
        fontSize: DIMENSION_TEXT_HEADER,
        fontWeight: 'bold'
    }
});
