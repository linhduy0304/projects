import {StyleSheet} from 'react-native';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY, DIMENSION_RADIUS_LARGE,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import {AppConfig} from "../../common/config";
import {COLOR_PRIMARY} from "../../resources/colors";

export const styles = StyleSheet.create({
    menuSelectedContainer: {
        padding: DIMENSION_PADDING_MEDIUM,
        flexDirection: 'row'
    },
    menuSelectedContentLayout: {
        flex: 1,
        minHeight: 64,
        marginLeft: DIMENSION_PADDING_SMALL,
        marginRight: DIMENSION_PADDING_SMALL
    },
    menuSelectedQuantity: {
        borderRadius: 4,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 0.5,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#22C300',
        marginTop: DIMENSION_PADDING_TINY,
        marginBottom: DIMENSION_PADDING_SMALL,
    },
    menuImage: {
        width: 64,
        height: 64,
        borderRadius: DIMENSION_RADIUS_MEDIUM
    },
    menuSelectedPriceLayout: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#dcdcdc'
    },
    updateContactDialogContainer: {
        width: '90%',
        height: AppConfig.windowHeight*0.6,
        position: 'relative',
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    updateContactDialogContent: {
        backgroundColor: 'white',
        borderRadius: DIMENSION_RADIUS_MEDIUM
    },
    updateContactDialogError: {
        color: COLOR_PRIMARY,
        fontSize: 10,
        fontStyle: 'italic',
        marginLeft: 4
    },
    textNoticeShippingAddress: {
        color: COLOR_PRIMARY,
        fontStyle: 'italic',
        fontSize: DIMENSION_TEXT_SUB,
        marginTop: DIMENSION_PADDING_SMALL
    }
});