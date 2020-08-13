import {StyleSheet} from 'react-native';
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL} from "../../resources/dimens";
import {COLOR_LINE} from "../../resources/colors";

export const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: COLOR_LINE,
        paddingTop: DIMENSION_PADDING_LARGE
    },
    bottomButton: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_SMALL,
        marginTop: DIMENSION_PADDING_SMALL
    }
});