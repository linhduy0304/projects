import {StyleSheet} from 'react-native';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
} from "../../../resources/dimens";
import {COLOR_LINE} from "../../../resources/colors";

export const styles = StyleSheet.create({
    buttonFillerWithSubTitleContainer: {
        flexDirection: 'row',
        height: DIMENSION_BUTTON_MEDIUM,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM
    },
    buttonStickBottom: {
        backgroundColor: 'white',
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        borderTopWidth: 1,
        borderTopColor: COLOR_LINE
    }
})