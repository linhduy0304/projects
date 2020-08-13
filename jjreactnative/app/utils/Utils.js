import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export const isIphoneX = () => {
    return (
        Platform.OS === 'ios' && (height === 812 || width === 812)
    );
}

export function groupFilterTags(detail_tag) {
    let group_tags = {};
    for (let i = 0; i < detail_tag.length; i++) {
        let tag_type = detail_tag[i].tag_type;
        if (!group_tags[tag_type]) {
            group_tags[tag_type] = [];
        }
        group_tags[tag_type].push(detail_tag[i].tags);
    }
    let resultArray = [];
    for (let tag_type in group_tags) {
        resultArray.push({ tag_type: tag_type, tags: group_tags[tag_type].join() });
    }
    return resultArray
}

export function getQRCodeUrl(text, size) {
    return 'https://chart.googleapis.com/chart?cht=qr&chld=L%7C0&chs=' + size + '&h=' + size + '&chl=' + text;
    // return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${text}`;
}

export function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function removeCouponAlarm() {

}

export function concatFilterDuplicate(list1, list2) {
    const set = new Set(list1.map(item => item.id));
    const filterList2 = [];
    const length = list2.length;
    for (let i = 0; i < length; i++) {
        if (!set.has(list2[i].id)) {
            filterList2.push(list2[i]);
        }
    }
    return list1.concat(filterList2);
}

export const isValidEmail = email => {
    const reg = /^([a-z\d.])+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(email) && email.indexOf(".") !== 0 && !(/\.{2,}/g).test(email)){
        return true;
    }
    return false;
};