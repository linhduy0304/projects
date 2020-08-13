import {StyleSheet} from 'react-native';
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE_DISABLE} from "../../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";

export const styles = StyleSheet.create({
    emptyListItemContainer: {
        flex: 1,
        backgroundColor: COLOR_GRAY_BG,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyListItemText: {
        color: COLOR_TEXT_INACTIVE_DISABLE,
        padding: DIMENSION_PADDING_MEDIUM
    },
    updateNoticeContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: DIMENSION_PADDING_MEDIUM
    },
    updateNoticeContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
        padding: DIMENSION_PADDING_MEDIUM
    },
    updateNoticeButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    updateNoticeAllowButton: {
        height: 40,
        backgroundColor: '#22C300',
        borderRadius: 4,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateNoticeCancelButton: {
        height: 40,
        backgroundColor: 'transparent',
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltipLayout: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 8,
        marginBottom: 24
    },
});