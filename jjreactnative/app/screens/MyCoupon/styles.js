import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_GRAY_BG} from '../../resources/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 14
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ededed'
    },
    image: {
        height: 128,
        width: 124,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
    },
    backgroundHighlight: {
        position: 'absolute',
        top: 0,
        width: 124,
        borderTopLeftRadius: 4,
        borderColor: '#ededed',
        justifyContent: 'center',
        padding: 5,
        alignItems: 'center',
        flexDirection: 'column'
    },
    dealStatusInfo: {
        fontSize: 10,
        color: '#ffffff',
        borderRadius: 4,
        borderColor: '#ffffff',
        overflow: 'hidden',
        marginTop: 2,
        width: 44,
        padding: 2,
        textAlign: 'center'
    },
    rightContent: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 8,
        paddingLeft: 16,
        paddingBottom: 4,
        paddingRight: 16
    },
    imageRender: {
        position: 'absolute',
        top: -1.5,
        left: 117,
        width: 20,
        height: 39
    },
    qrCode: {
        position: 'absolute',
        bottom: 8,
        right: 16,
        width: 48,
        height: 48,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    couponHighlightRed: {
        color: COLOR_PRIMARY,
        fontSize: 14
    },
    brandName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#454545',
        paddingRight: 16,
        lineHeight: 18
    },
    textTime: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#999999',
        lineHeight: 16
    },
    statusLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    txtDealStatus: {
        fontSize: 10,
        color: '#4bc731',
        borderRadius: 4,
        borderColor: '#4bc731',
        borderWidth: 1,
        overflow: 'hidden',
        marginTop: 2,
        padding: 2,
        width: 50,
        textAlign: 'center'
    },

    containerEmpty: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLOR_GRAY_BG
    },
    text: {
        fontSize: 14,
        color: '#454545',
        textAlign: 'center'
    },

    txtGetCode: {
        color: COLOR_PRIMARY,
        fontSize: 14
    }
});
