import {Dimensions, StyleSheet} from 'react-native';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_LARGE
} from "../../resources/dimens";
import {COLOR_LINE} from "../../resources/colors";
import {AppConfig} from "../../common/config";

export const CircleSuccessSize = Dimensions.get('window').height * 0.17;

export const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 16,
        left: 0,
        padding: DIMENSION_PADDING_MEDIUM
    },
    congratulationTextContainer: {
        position: 'absolute',
        top: 36,
        left: 48,
        right: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleSuccess: {
        width: CircleSuccessSize,
        height: CircleSuccessSize,
        position: 'absolute',
        bottom: -CircleSuccessSize/2,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: CircleSuccessSize/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topRectOfBookingDetail: {
        marginTop: DIMENSION_PADDING_TINY,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        borderWidth: 1,
        borderColor: COLOR_LINE,
        borderBottomWidth: 0,
        borderTopStartRadius: DIMENSION_RADIUS_LARGE,
        borderTopEndRadius: DIMENSION_RADIUS_LARGE,
        alignItems: 'center'
    },
    bookingDetailDialog: {
        height: Dimensions.get('window').height*.85,
        borderTopLeftRadius: DIMENSION_RADIUS_LARGE,
        borderTopRightRadius: DIMENSION_RADIUS_LARGE,
        backgroundColor: 'white',
        zIndex: 10
    },
    countDownContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 32,
        zIndex: 12
    },
    countDownPopupContent: {
        borderRadius: DIMENSION_RADIUS_LARGE,
        backgroundColor: 'white'
    },
    textTimeCountDown: {
        color: '#EF863B',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: DIMENSION_PADDING_SMALL
    }
})