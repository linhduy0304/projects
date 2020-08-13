import {StyleSheet} from 'react-native';
import {AppConfig} from '../../common/config';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_LARGE, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../resources/colors";

export const styles = StyleSheet.create({
    menuItemContainer: {
        padding: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center',
        flexDirection: 'row'
    },
    menuItemContentLayout: {
        flex: 1,
        minHeight: 64,
        marginLeft: DIMENSION_PADDING_SMALL,
        marginRight: DIMENSION_PADDING_SMALL
    },
    menuItemQuantity: {
        borderRadius: 4,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0.5,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#22C300',
        marginLeft: DIMENSION_PADDING_TINY
    },
    menuImage: {
        width: 64,
        height: 64,
        borderRadius: DIMENSION_RADIUS_MEDIUM
    },
    menuPlusIcon: {
        padding: DIMENSION_PADDING_TINY,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: '#22C300'
    },
    menuPlusButton: {
        padding: DIMENSION_PADDING_MEDIUM
    },
    pickMenuDialogContainer: {
        height: '90%',
        borderTopLeftRadius: DIMENSION_RADIUS_LARGE,
        borderTopRightRadius: DIMENSION_RADIUS_LARGE,
        backgroundColor: 'white',
        position: 'relative'
    },
    pickMenuDialogHeader: {
        flex: 1,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_MEDIUM+4
    },
    pickMenuDialogTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    menuItemSelection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: DIMENSION_PADDING_MEDIUM
    },
    buttonPlusItem: {
        padding: DIMENSION_PADDING_MEDIUM
    },
    itemSelectionCount: {
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_SMALL+2,
        paddingRight: DIMENSION_PADDING_SMALL+2,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: '#22C300'
    },
    textCount: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    discountNotice: {
        flexDirection: 'row',
        marginLeft: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center',
        marginTop: DIMENSION_PADDING_SMALL
    },
    noteInput: {
        flex: 1,
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1,
        marginTop: DIMENSION_PADDING_SMALL,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        padding: DIMENSION_PADDING_SMALL,
        textAlignVertical: 'top',
        backgroundColor: '#f5f5f5',
        borderRadius: DIMENSION_RADIUS_LARGE
    },
    subMenuListItemContainer: {
        padding: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center',
        flexDirection: 'row'
    },
    subMenuItemSelectIcon: {
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subMenuTitle: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_SMALL,
        fontWeight: 'bold',
        fontSize: 16
    }
});