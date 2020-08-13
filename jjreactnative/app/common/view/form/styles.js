import {StyleSheet} from 'react-native';
import {
    DIMENSION_BUTTON_SM,
    DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../../resources/colors";

export const styles = StyleSheet.create({
    searchInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        paddingLeft: DIMENSION_PADDING_SMALL
    },
    searchInput: {
        flex: 1,
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1,
        height: DIMENSION_BUTTON_SM,
        marginLeft: DIMENSION_PADDING_SMALL,
    }
});