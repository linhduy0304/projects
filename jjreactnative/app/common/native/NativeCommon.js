import {DeviceEventEmitter, NativeModules, Platform, NativeEventEmitter, Linking} from 'react-native';
import {StringUtil} from "../../utils/string-util";

const ios = Platform.OS === 'ios';
const Controller = NativeModules.CommonManager;
const iosEmitter = !!ios ? new NativeEventEmitter(Controller) : undefined;

const CommonManager = {

    openUrl(url) {
        try {
            if (!!Controller) {
                console.debug('CommonManager:openUrl:', url);
                if (
                    url.indexOf('https://itunes.apple.com') < 0 &&
                    url.indexOf('https://play.google.com') < 0 &&
                    (url.indexOf('http') >= 0 || url.indexOf('jamjalinks') >= 0)
                ) {
                    Controller.openUrl(url);
                }
                else {
                    Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            Linking.openURL(url);
                        } else {
                            console.log("Not supported");
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    addListener(callback) {
        try {
            if (!callback) return;

            console.log('Controller.EVEN', Controller.EVENT);

            if (!ios) {
                DeviceEventEmitter.addListener(Controller.EVENT, callback);
            }
            else if (!!iosEmitter){
                iosEmitter.addListener(Controller.EVENT, callback);
            }
        } catch (e) {
            console.log(e);
        }
    },

    removeListener(callback) {
        try {
            if (!callback) return;
            if (!ios) {
                DeviceEventEmitter.removeListener(Controller.EVENT, callback);
            }
            else if (!!iosEmitter){
                iosEmitter.removeListener(Controller.EVENT, callback);
            }
        } catch (e) {
            console.log(e);
        }
    },

    openImagePreview(images, pos) {
        try {
            if (!images) return;
            if (!ios) {
                let list = images.map(img => img.link);
                Controller.openImagePreview(list, pos);
            }
        } catch (e) {

        }
    },

    playVideo(videoId) {
        try {
            console.log('play_video:', videoId, Controller);
            if (StringUtil.isEmpty(videoId)) return;
            if (!Controller || !Controller.playVideo) return;
            Controller.playVideo(videoId);
        } catch (e) {
            console.log(e);
        }
    },

    initCompleted() {
        try {
            if (!Controller || !Controller.initCompleted) return;
            Controller.initCompleted();
        } catch (e) {
            console.log(e);
        }
    }
}

exports.NativeCommon = CommonManager;