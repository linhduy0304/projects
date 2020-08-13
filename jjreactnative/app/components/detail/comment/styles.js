import {StyleSheet} from 'react-native';
import {
    COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_HINT, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE, COLOR_GRAY_BG_2, COLOR_GRAY_BORDER
} from "../../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
export const styles = StyleSheet.create({
    ctInputBottom: {
        backgroundColor: COLOR_GRAY_BG,
        flexDirection: 'row',
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
    },
    ctInput: {
        backgroundColor: 'white',
        flex: 1,
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_CONTENT,
        borderColor: COLOR_LINE,
        borderWidth: 1,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
    },
    ctSend: {
        width: DIMENSION_BUTTON_MEDIUM,
        padding: DIMENSION_PADDING_TINY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctViewMore: {
        flexDirection: 'row',
        backgroundColor: COLOR_GRAY_BG_2,
        padding: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -1.5,
        marginBottom: -1.5
    }

});