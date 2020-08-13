export const IMAGE_LOCAL = 'local';
export const IMAGE_INTERNET = 'internet';

export function buildImageSource(type, source) {
    try {
        if (!source || !type) return require('../resources/images/jamja_placeholder.jpg');

        if (type === IMAGE_LOCAL && typeof source !== 'string') {
            return source;
        }
        if (source.indexOf('http') < 0) return require('../resources/images/jamja_placeholder.jpg');
        return {uri: source};
    }
    catch (e) {
        console.log(e);
    }
    return require('../resources/images/jamja_placeholder.jpg');
}

export function buildAvatarImageSource(type, source) {
    try {
        if (!source || !type) return require('../resources/images/tabmore/ic_other_avatar.png');

        if (type === IMAGE_LOCAL && typeof source !== 'string') {
            return source;
        }
        if (source.indexOf('http') < 0) return require('../resources/images/tabmore/ic_other_avatar.png');
        return {uri: source};
    }
    catch (e) {
        console.log(e);
    }
    return require('../resources/images/tabmore/ic_other_avatar.png');
}