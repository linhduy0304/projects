import { ToastAndroid, Platform } from 'react-native';
import { ToastIOS } from './ToastIOS';

const Toast = {
    showToast(message) {
        try {
            if (Platform.OS === 'ios') ToastIOS.Show({ message });
            else ToastAndroid.show(message, ToastAndroid.SHORT);
        } catch (e) {
            console.log(e);
        }
    }
};

exports.Toast = Toast;
