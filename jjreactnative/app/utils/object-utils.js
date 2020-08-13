import {StringUtil} from './string-util'
import {Map, fromJS} from 'immutable'

function nextPathAttr(path) {
    if (!isNaN(path)) {
        return {
            attr: path,
            nextPath: null,
        };
    }
    if (path.startsWith("[")) {
        let indexOf = path.indexOf("]");
        if (indexOf === -1) {
            throw "Unclosed [";
        }
        return {
            attr: JSON.parse(path.substring(1, indexOf)),
            nextPath: path.substring(indexOf + 1).replace(/^\./,""),
        };
    } else {
        let match = /[.\[]/.exec(path);
        if (match == null) {
            return {
                attr: path,
                nextPath: "",
            };
        }

        return {
            attr: path.substring(0, match.index),
            nextPath: path.substring(match.index).replace(/^\./,""),
        };
    }
}

function updatePath(object, path, value) {

    if (StringUtil.isEmpty(path)) {
        return value;
    }

    let {attr, nextPath} = nextPathAttr(path);

    if (Array.isArray(object)) {
        let clone = object.slice(0);
        clone[attr] = updatePath(object && object[attr], nextPath, value);
        return clone;
    } else {
        return Object.assign({}, object, {[attr]: updatePath(object && object[attr], nextPath, value)});
    }

}

function mapValuesToList(obj, fn) {
    let ret = [];

    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            ret.push(fn(obj[k], k));
        }
    }

    return ret;
}

function forEach(obj, fn) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            let interrupted = fn(k, obj[k]);
            if (interrupted) {
                return;
            }
        }
    }
}

function mapCouponToDeal(deal, coupon) {

    let couponHighlight = coupon.get('coupon_highlight');
    if (StringUtil.isEmpty(couponHighlight)) {
        couponHighlight = coupon.getIn(['deal', 'coupon_highlight']);
    }

    deal = deal.updateIn(['booking_email'], () => coupon.get('email'))
        .updateIn(['booking_slot'], () => coupon.get('slot_count'))
        .updateIn(['booking_store'], () => coupon.getIn(['store', 'address']))
        .updateIn(['booking_username'], () => coupon.get('user_name'))
        .updateIn(['check_in_time'], () => coupon.get('check_in_time'))
        .updateIn(['cancel_time'], () => coupon.get('cancel_time'))
        .updateIn(['code'], () => coupon.get('code'))
        .updateIn(['code_status'], () => coupon.get('status'))
        .updateIn(['coupon_highlight'], () => couponHighlight)
        .updateIn(['coupon_id'], () => coupon.get('id'))
        .updateIn(['promocode_applied'], () => coupon.get('promocode'))
        .updateIn(['redeem_url'], () => coupon.get('redeem_url'));

    return deal;
}

function createBaseCouponFromDeal(deal) {
    if (!Map.isMap(deal)) deal = fromJS(deal);
    let coupon = Map({});

    return coupon.updateIn(['id'], () => deal.get('coupon_id'))
        .updateIn(['code'], () => deal.get('code'))
        .updateIn(['status'], () => deal.get('code_status'))
        .updateIn(['coupon_highlight'], () => deal.get('coupon_highlight'))
        .updateIn(['check_in_time'], () => deal.get('check_in_time'))
        .updateIn(['cancel_time'], () => deal.get('cancel_time'))
        .updateIn(['booking_note'], () => deal.get('booking_note'))
        .updateIn(['booking_survey'], () => deal.get('booking_survey'))
        // .updateIn(['email'], () => deal.get('check_in_time', 0))
        // .updateIn(['phone_number'], () => deal.get('check_in_time', 0))
        .updateIn(['promocode'], () => deal.get('promocode_applied'))
        .updateIn(['redeem_destination_url'], () => deal.get('redeem_destination_url'))
        .updateIn(['redeem_url'], () => deal.get('redeem_url'))
        // .updateIn(['result_message'], () => deal.get('check_in_time', 0))
        // .updateIn(['result_title'], () => deal.get('check_in_time', 0))
        .updateIn(['slot_count'], () => deal.get('booking_slot'))
        .updateIn(['store'], () => deal.get('stores') ? deal.get('stores').size > 0 ? deal.get('stores').get(0) : undefined : undefined)
        .updateIn(['user_name'], () => deal.get('booking_username'))
        .updateIn(['deal'], () => deal);
}

function removeBookingInfoInDeal(deal) {
    return deal.updateIn(['is_get'], () => false)
        .deleteIn(['booking_email'])
        .deleteIn(['booking_slot'])
        .deleteIn(['booking_store'])
        .deleteIn(['booking_username'])
        .deleteIn(['check_in_time'])
        .deleteIn(['cancel_time'])
        .deleteIn(['code'])
        .deleteIn(['code_status'])
        .deleteIn(['coupon_highlight'])
        .deleteIn(['coupon_id'])
        .deleteIn(['promocode_applied'])
        .deleteIn(['redeem_url']);
}

function hasValueObject(o) {
    return o !== undefined && o !== null;
}

function getValue(data, defaultValue, paths) {
    try {
        if (data === undefined || data === null) {
            return defaultValue;
        }

        let value = data;

        paths.map((p) => {
            value = value[p];
        });
        if (!value) {
            return defaultValue;
        }
        return value;

    } catch (e) {
        return defaultValue;
    }
}

function hasValue(data, paths) {
    try {
        if (data === undefined || data === null) {
            return false;
        }

        let value = data;

        paths.map((p) => {
            value = value[p];
        });
        return value !== undefined && value !== null;

    } catch (e) {
        return false;
    }
}

function copyObject(obj) {
    try {
        if (StringUtil.isEmpty(obj)) return obj;
        if (typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) {
            let results = [];
            for (let i = 0; i < obj.length; i++) {
                results.push(copyObject(obj[i]));
            }
            return results;
        }
        const keys = Object.keys(obj);
        let result = {};
        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = copyObject(obj[keys[i]]);
        }
        return result;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

function copyObjectByAssign(obj) {
    try {
        return Object.assign({}, obj);
    }
    catch (e) {
        console.log(e);
        return {};
    }
}

function copyArrayByAssign(arrays) {
    try {
        return Object.assign([], arrays);
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

function removeUndefined(object) {
    try {
        const newObject = {};
        for (let k in object) {
            if (object.hasOwnProperty(k) && (object[k] !== undefined && object[k] !== null)) {
                newObject[k] = object[k];
            }
        }
        return newObject;
    }
    catch (e) {
        console.log(e);
    }
    return object;
}

function isExists(value) {
    return value !== undefined && value !== null;
}

const ObjectUtil = {
    forEach,
    updatePath,
    mapValuesToList,
    mapCouponToDeal,
    removeBookingInfoInDeal,
    createBaseCouponFromDeal,
    hasValueObject,
    getValue,
    hasValue,
    copyObject,
    copyObjectByAssign,
    copyArrayByAssign,
    removeUndefined,
    isExists
};

exports.ObjectUtil = ObjectUtil;
