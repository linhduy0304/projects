import {StyleSheet} from 'react-native';
import {COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../resources/colors";

export const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertContentLayoutIOS: {
        width: '85%',
        backgroundColor: '#e1e0e6',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertContentLayoutAndroid: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertTitleIOS: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24
    },
    alertTitleAndroid: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: 16,
        width: '100%',
        textAlign: 'left',
        fontWeight: 'bold',
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24
    },
    alertMessageIOS: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: 14,
        textAlign: 'center',
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_LINE
    },
    alertMessageAndroid: {
        color: COLOR_TEXT_BLACK_1,
        width: '100%',
        fontSize: 14,
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24
    },
    alertButton: {
        paddingTop: 16,
        paddingBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    titleAlertButton: {
        fontSize: 16
    }
})