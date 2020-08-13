import Intl from "intl";
import {ObjectUtil} from './object-utils'

let formatDecimal;

function getNumberFormat() {
    if (!formatDecimal) formatDecimal = new Intl.NumberFormat('vi', { style: 'decimal', maximumFractionDigits: 3});
    return formatDecimal;
}

function isEmpty(val) {
    return val === undefined || val === null || val === '';
}

function isBlank(val) {
    if (isEmpty(val)) return true;
    if (typeof val === 'number') {
        return false;
    }
    if (typeof val === 'object') {
        return true;
    }
    return val.replace(/\s/g, "").length === 0;
}

function numberFormat(number) {
    try {
        if (number === undefined || number === null) return 0;
        if (Number.isNaN(number)) return number;
        if (number/1000 > 1 && number/1000 < 1000) {
            return numberFixed(number/1000, 0).toLocaleString('vi', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + 'K'
        } else if (number/1000000 > 1 && number/1000000 < 1000) {
            return numberFixed(number/1000000, 0).toLocaleString('vi', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + 'M'
        } else {
            return number
        }
    }
    catch (e) {
        console.debug(e);
    }
    return number;
}

function numberWithCommas(x) {
    if (x === undefined || x === null) return 0 + 'đ';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
}

function addParamsToUrl(url, params) {
    if (isEmpty(url)) return '';
    if (isEmpty(params)) return url;
    if (url.indexOf('?') < 0) {
        url += '?';
    }
    ObjectUtil.forEach(params, (key, value) => {
        if (url.indexOf(key) < 0) {
            if (!url.endsWith('?')) {
                url += '&';
            }
            url += `${key}=${value}`;
        }
    });
    return url;
}

function addSizeToImageUrl(url, w, h) {
    if (isBlank(url)) return 'https://jamja.vn/static/black-friday/images/JAMJA-logo-icon.png';
    let start = false;
    if (url.indexOf('?') < 0) {
        start = true;
    }
    if (!w || w === 0) {
        h = h*2;
        url += `${start ? '?' : '&'}h=${h.toFixed(0)}`;
    }
    else if (!h || h === 0) {
        w = w*2;
        url += `${start ? '?' : '&'}w=${w.toFixed(0)}`;
    }
    else {
        h = h*2;
        w = w*2;
        url += `${start ? '?' : '&'}w=${w.toFixed(0)}&h=${h.toFixed(0)}`;
    }

    // console.log('addSizeToImageUrl', url)
    return url;
}

function isValidPhoneNumber(phone){
    try {
        if (phone === undefined || phone === null || phone === '') return false;
        return phone.length > 8 && phone.length < 13;
    } catch (e) {
        console.log(e);
    }
    return false;
}

function isValidName(text){
    try {
        return !StringUtil.isBlank(text) && text.length > 1 && text.length < 200;
    }
    catch (e) {
        console.log(e);
        return true;
    }
    return false;
}

function isValidNumber(validateNumber){
    if(StringUtil.isBlank(validateNumber)) return false;
    const regexNumber = /[\D]/g ;
    if(regexNumber.test(validateNumber)){
        return false;
    }
    return true;
}

function numberFixed(number, digits) {
    if (number === undefined || number === null) return 0;
    if (Number.isNaN(number)) return number;
    return number.toFixed(digits);
}

function numberWithoutCurrency(x) {
    if (x === undefined || x === null) return 0;
    return (x + '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function unicodeToLatin(text) {
    if (isEmpty(text)) return text;
    let str = text;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,"");
    str = str.replace(/ + /g,"");
    str = str.trim();
    return str;
}

function textFormat(text) {
    if (StringUtil.isEmpty(text)) return '';

    if (typeof text !== 'string') text += '';

    let str = text.toLowerCase();
    return str.replace(/[^0-9a-z_]/g, '_');
}

function trimText(text) {
    if (StringUtil.isEmpty(text)) return '';
    if (typeof text !== 'string') text = text + '';
    return text.trim();
}

function encodeURL(text) {
    if (StringUtil.isEmpty(text)) return '';
    if (typeof text !== 'string') text = text + '';
    return encodeURIComponent(text);
}

function beautyNumber(number) {
    try {
        if (!number) return 0;
        return getNumberFormat().format(number);
    }
    catch (e) {
        console.debug(e);
    }
    return 0;
}

export const StringUtil = {
    isEmpty,
    isBlank,
    numberFormat,
    numberWithCommas,
    addParamsToUrl,
    addSizeToImageUrl,
    isValidPhoneNumber,
    isValidName,
    isValidNumber,
    numberFixed,
    numberWithoutCurrency,
    unicodeToLatin,
    textFormat,
    trimText,
    encodeURL,
    beautyNumber
};