'use strict';

import {
    Linking,
} from 'react-native';

export function LaunchURL(url) {
    Linking.canOpenURL(url).then(supported => {
        if(!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            Linking.openURL(url)
                .catch(err => {
                    if(url.includes('telprompt')) {
                        // telprompt was cancelled and Linking openURL method sees this as an error
                        // it is not a true error so ignore it to prevent apps crashing
                        // see https://github.com/anarchicknight/react-native-communications/issues/39
                    } else {
                        console.warn('openURL error', err)
                    }
                });
        }
    }).catch(err => console.warn('An unexpected error happened', err));
};
