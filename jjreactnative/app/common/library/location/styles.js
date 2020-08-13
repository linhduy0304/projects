import {StyleSheet} from 'react-native';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_LARGE} from "../../../resources/dimens";

export const styles = StyleSheet.create({
    requestLocationPopupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32
    },
    requestLocationPopupContent: {
        padding: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_LARGE,
        backgroundColor: 'white'
    },
    requestLocationPopupTitle: {
        fontWeight: 'bold',
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_SMALL,
        alignSelf: 'center',
        textAlign: 'center'
    }
})