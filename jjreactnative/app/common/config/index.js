import {Dimensions, Platform} from "react-native";
import {fromJS} from 'immutable';

const ios = Platform.OS === 'ios';
export const AppConfig = {
    ios: ios,
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    headerHeight: ios ? 44 : 56,
    ANDROID_NOTIFICATION_CHANNEL_ID: 'JAMJA',
    firebaseConfig: fromJS({})
};