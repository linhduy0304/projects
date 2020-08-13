import {NativeModules, Platform} from 'react-native';
const Controller = NativeModules.SoundManager;
const ios = Platform.OS === 'ios';

const Sound = {
    playBackground() {
        if (!Controller) return;
        if (!!ios) {
            Controller.play1('sound_background', true)
        }
        else {
            Controller.play('sound_background', true);
        }
    },

    playShaking() {
        // if (!Controller) return;
        // if (!!ios) {
        //     Controller.play2('shaking', false);
        // }
        // else {
        //     Controller.play('shaking', false);
        // }
    },

    playRunningGift() {
        if (!Controller) return;
        if (!!ios) {
            Controller.play3('running', false);
        }
        else {
            Controller.play('running', false);
        }
    },

    playReturnGift() {
        if (!Controller) return;
        if (!!ios) {
            Controller.play4('return_gift', false);
        }
        else {
            Controller.play('return_gift', false);
        }
    },

    resume() {
        if (!Controller) return;
        Controller.resume('resume');
    },

    pause() {
        if (!Controller) return;
        Controller.pause('pause');
    },

    release() {
        if (!Controller) return;
        Controller.release('release');
    }
}

exports.Sound = Sound;