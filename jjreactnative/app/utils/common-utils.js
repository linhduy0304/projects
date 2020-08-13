import {Dimensions, Linking, NativeModules, Platform} from 'react-native';
import {StringUtil} from './string-util'
import moment from "moment/min/moment-with-locales";
import {DEAL_TYPE_EXCLUSIVE} from "../const";
import QueryString from "query-string";
import {NativeCommon} from '../common/native/NativeCommon';
moment.locale('vi');

function clearNetworkCookie() {
    try {
        NativeModules.Networking.clearCookies((...props) => {
            console.log('*********clearCookies', ...props);
        })
    } catch(error) {
        console.log('clearNetworkCookie:error', error)
    }
}

function getDetailTagForFilter(filters, tagToAppend) {
    if (filters === undefined || filters === null) {
        if (!!tagToAppend) {
            try {
                if (Array.isArray(tagToAppend)) {
                    return JSON.stringify(tagToAppend);
                } else {
                    return JSON.stringify([tagToAppend]);
                }
            } catch (e) {
                console.log(e);
            }
        }
        return undefined;
    }

    let detailTags = filters
        .filter((item, index) => {
            return item.get('selectedCount', 0) > 0;
        })
        .map((item, index) => {
            let detail = {};
            detail.tag_type = item.get('type');
            detail.tags = item.get('tags')
                .filter((tag, i) => !!tag.get('selected', false))
                .map((tag, i) => tag.get('key'))
                .toJS()
                .join();
            return detail;
        });
    detailTags = detailTags.toJS();
    if (!!tagToAppend) {
        console.log('getDetailTagForFilter', filters, tagToAppend);
        try {
            if (Array.isArray(tagToAppend)) {
                detailTags.push(...tagToAppend);
            } else {
                detailTags.push(tagToAppend);
            }
        } catch (e) {
            console.log(e);
        }
    }
    return JSON.stringify(detailTags);
}

export const isIphoneX = () => {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
    return Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT));
};

export const isIphoneXSMax = () => {
    const X_WIDTH = 414;
    const X_HEIGHT = 896;
    const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
    return Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT));
};

export const isIphoneBunnyEar = () => {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    const XSM_WIDTH = 414;
    const XSM_HEIGHT = 896;

    const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
    return Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT) ||
            (D_HEIGHT === XSM_WIDTH && D_WIDTH === XSM_HEIGHT) ||
            (D_HEIGHT === XSM_HEIGHT && D_WIDTH === XSM_WIDTH));
}

export const getPaddingTopBar = () => {
    if (isIphoneBunnyEar()) return 44;
    else if (Platform.OS === 'ios') return 20;
    else return 0;
}

function getBrandTags(tags) {
    try {
        if (StringUtil.isEmpty(tags)) return '';
        if (typeof tags !== 'object' || tags.length < 1) return '';
        const tagCategory = tags.filter((tag, index) => !!tag.type && tag.type.toLowerCase() === 'danh mục');
        if (tagCategory.length < 1) return '';
        return tagCategory[0].label;
    } catch (error) {
        console.log(error);
        return '';
    }
}

function isValidSetReminder(deal_type, check_in_time, end_sale_time) {
    if (typeof check_in_time !== 'number') {
        check_in_time = moment.utc(check_in_time).local()
    }
    const currentTime = moment();

    if (DEAL_TYPE_EXCLUSIVE === deal_type) {
        const timeToCheck = moment.utc(end_sale_time).local();

        const diff = timeToCheck.diff(currentTime, 'minutes');
        return diff > 3 * 60;
    } else {
        const timeToCheck = moment.unix(check_in_time).local();

        const diff = timeToCheck.diff(currentTime, 'minutes');
        return diff >= 15;
    }
}

function isNetworkConnectionError(error) {
    try {
        if (StringUtil.isEmpty(error)) return false;
        return error.name === 'TypeError' && error.message === 'Network request failed';
    } catch (e) {
        console.log(e);
        return false;
    }
}

function openLink(navigation, link) {
    try {
        if (StringUtil.isEmpty(link) || !navigation) return false;

        console.log('common-util:openLink:', link);

        if (link.indexOf('https://itunes.apple.com') >= 0 || link.indexOf('https://play.google.com') >= 0)
        {
            Linking.canOpenURL(link).then(supported => {
                if (supported) {
                    Linking.openURL(link);
                } else {
                    console.log("Not supported");
                }
            });
            return;
        }

        if (link.indexOf('.page.link/') > 0 && Platform.OS !== 'ios') {

            Linking.canOpenURL(link).then(supported => {
                if (!supported) {
                    NativeCommon.openUrl(link);
                } else {
                    return Linking.openURL(link);
                }
            }).catch(err => NativeCommon.openUrl(link));
            return;
        }

        if (link.indexOf('http') >= 0 ||
            link.indexOf('https') >= 0 ||
            link.indexOf('.page.link/') > 0) {
            NativeCommon.openUrl(link);
            return;
        }

        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                navigation.push('InAppWebView', {url: link})
            } else {
                return Linking.openURL(link);
            }
        }).catch(err => navigation.push('InAppWebView', {url: link}));
    } catch (e) {
        console.log(e);
    }
}

function openOutAppBrowser(link) {
    try {
        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                console.log('Cannot open out app browser');
            } else {
                return Linking.openURL(link);
            }
        }).catch(err => console.log(err));
    } catch (e) {
        console.log(e);
    }
}

function isSupportDeepLink(link) {
    try {
        if (StringUtil.isEmpty(link)) return false;

        const indexOfHttp = link.indexOf('http');
        if (indexOfHttp >= 0 && indexOfHttp < 3) return true;

        const indexOfJamjaLinks = link.indexOf('jamjalinks://');
        if (indexOfJamjaLinks >= 0 && indexOfJamjaLinks < 3) return true;

        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function hasChangeUrl(first, last) {
    try {
        const firstLink = QueryString.parseUrl(first);
        const secondLink = QueryString.parseUrl(last);

        if (firstLink.url !== secondLink.url) return true;
        if (StringUtil.isEmpty(firstLink.query) && StringUtil.isEmpty(secondLink.query)) return false;
        if (StringUtil.isEmpty(firstLink.query)) return true;
        if (StringUtil.isEmpty(secondLink.query)) return true;
        if (Object.keys(firstLink.query).length !== Object.keys(secondLink.query).length) return true;

        const firstKeys = Object.keys(firstLink.query);

        for (let i = 0; i < firstKeys.length; i++) {
            if (firstLink.query[firstKeys[i]] !== secondLink.query[firstKeys[i]]) return true;
        }
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function generateUrlDeepLink(link, origin) {
    try {
        let org = origin;
        if (StringUtil.isEmpty(org)) org = 'https://jamja.vn/';

        if (StringUtil.isEmpty(link)) return org;

        return StringUtil.addParamsToUrl(org, {deeplink: encodeURIComponent(link)});
    } catch (e) {
        console.log(e);
        return 'https://jamja.vn/';
    }
}

function dealSlotUnit(hint_text) {
    if (!hint_text) return '';
    if (hint_text.toLowerCase().indexOf('số') > -1) {
        return hint_text.toLowerCase().replace('số', '');
    }
    return hint_text.trim();
}

function generateRandomId(prefix) {
    try {
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
    }
    catch (e) {
        console.debug(e);
    }
    return '';
}

const CommonUtil = {
    clearNetworkCookie,
    getDetailTagForFilter,
    isIphoneX,
    getBrandTags,
    isValidSetReminder,
    isNetworkConnectionError,
    openLink,
    isIphoneXSMax,
    isIphoneBunnyEar,
    getPaddingTopBar,
    isSupportDeepLink,
    hasChangeUrl,
    openOutAppBrowser,
    generateUrlDeepLink,
    dealSlotUnit,
    generateRandomId
};

exports.CommonUtil = CommonUtil;