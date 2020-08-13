import {StringUtil} from '../../utils/string-util';

export const DeepLinkPatten = {
    DEEPLINK_SCHEME: 'jamjalinks'
};

export const DeepLinkDetection = {

    isSupport(deepLink) {
        return !StringUtil.isEmpty(deepLink) && deepLink.indexOf(DeepLinkPatten.PREFIX) >= 0;
    }
};