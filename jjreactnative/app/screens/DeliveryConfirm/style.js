import { StyleSheet, Platform } from 'react-native';
import { COLOR_TEXT_GRAY, COLOR_TEXT_BLACK_1 } from '../../resources/colors';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_LARGE,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_BUTTON_SM,
    DIMENSION_TEXT_HEADER,
    DIMENSION_PADDING_TINY
} from '../../resources/dimens';

export const styles = StyleSheet.create({
    confirmButton: {
        backgroundColor: '#22C300',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6
    },
    recipeInput: {
        minHeight: 150,
        marginVertical: 14,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        alignItems: 'flex-start',
        padding: 15,
        paddingTop: 15,
        paddingRight: 9,
        textAlignVertical: 'top',
        lineHeight: 20
    },
    recipeDetailContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        shadowColor: '#979797',
        shadowOpacity: 0.3,
        shadowOffset: { height: 0.5, width: 0.5 },
        shadowRadius: 1
    },
    promotionInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        height: DIMENSION_BUTTON_SM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        flex: 1,
        marginRight: DIMENSION_PADDING_SMALL,
        color: COLOR_TEXT_BLACK_1,
        fontWeight: 'bold',
        textAlignVertical: 'top'
    },
    promotionLayout: {
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        height: DIMENSION_BUTTON_SM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        flex: 1,
        marginRight: DIMENSION_PADDING_SMALL,
        flexDirection: 'row',
        alignItems: 'center'
    },
    promotionSection: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_LARGE,
        justifyContent: 'space-around'
    },
    applyPromotionBtn: {
        backgroundColor: '#22C300',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        paddingHorizontal: Platform.OS === 'ios' ? 14 : 16,
        paddingVertical: Platform.OS === 'ios' ? 12 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        shadowColor: '#979797',
        shadowOpacity: 0.5,
        shadowOffset: { height: 0.1, width: 0.1 },
        shadowRadius: 1
    },
    locationInput: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 4,
        justifyContent: 'center'
    },
    promotionSection: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_LARGE,
        justifyContent: 'space-around'
    },
    subHeader: {
        color: COLOR_TEXT_GRAY,
        fontSize: 14,
        marginBottom: Platform.OS === 'ios' ? 4 : 0,
        textAlign: 'center'
    },
    mainHeader: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_HEADER,
        marginBottom: Platform.OS === 'ios' ? 4 : 0,
        fontWeight: 'bold'
    },
    dash: {
        width: 1,
        height: 4,
        borderRadius: 1,
        backgroundColor: COLOR_TEXT_GRAY,
        marginVertical: 2
    },
    locationSection: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowColor: '#979797',
        shadowOpacity: 0.3,
        shadowOffset: { height: 0.5, width: 0.5 },
        shadowRadius: 1,
        marginBottom: 16
    },
    swipeDown: {
        width: 40,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#979797'
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: DIMENSION_PADDING_SMALL
    },
    searchInput: {
        padding: 0,
        flex: 1,
        height: 48
    },
    ctSearch: {
        marginTop: DIMENSION_PADDING_MEDIUM,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height: 48,
        borderRadius: DIMENSION_PADDING_TINY
    },
    clearButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    openMap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    shippingPrice: {
        color: COLOR_TEXT_BLACK_1,
        fontWeight: 'bold',
        marginBottom: DIMENSION_PADDING_SMALL
    },
    //
    map: {
        flex: 1
    },
    markerFixed: {
        alignSelf: 'center',
        position: 'absolute',
        width: 25,
        height: 38,
        top: '50%',
        transform: [{ translateY: -38 }]
    },
    marker: {
        width: 25,
        height: 38
    },

    backButton: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },

    confirmAddressButton: {
        position: 'absolute',
        bottom: DIMENSION_PADDING_MEDIUM,
        left: DIMENSION_PADDING_MEDIUM,
        right: DIMENSION_PADDING_MEDIUM,
        padding: 13,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: '#22C300'
    },
    partnerContainer: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#16254E'
    },
    fee: {
        borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomLeftRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        flexDirection: 'row'
    },
    imageLogo: {
        width: 29,
        height: 20,
        marginBottom: 4,
    },
    textFee: {
        color: COLOR_TEXT_GRAY,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        marginRight: 4
    },
    txtAha: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    ctAha: {
        backgroundColor: '#16254E',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 22
    }
});
