import {
    STATUS_ADMIN_CANCEL, STATUS_EXPIRED, STATUS_MERCHANT_CANCEL, STATUS_MERCHANT_REJECT, STATUS_REDEEMED,
    STATUS_REJECTED, STATUS_USER_CANCEL
} from "../const";
import {strings} from "../../locates/i18n";
import Moment from "moment/moment";
import {Map} from 'immutable'

export const couponIsValid = (status) => {
    if (STATUS_EXPIRED == status ||
        STATUS_REDEEMED == status ||
        STATUS_REJECTED == status ||
        STATUS_MERCHANT_REJECT == status ||
        STATUS_MERCHANT_CANCEL == status ||
        STATUS_USER_CANCEL == status ||
        STATUS_ADMIN_CANCEL == status) {
        return false;
    }
    return true;
}

export const couponInValidInfo = (coupon) => {
    if (coupon && Map.isMap(coupon)) coupon = coupon.toJS();
    if (!coupon || coupon.status === undefined) return '';
    let couponStatus = coupon.status;
    if (!Number.isInteger(couponStatus)) {
        couponStatus = Number.parseInt(couponStatus);
    }
    let info = null;
    switch (couponStatus) {
        case STATUS_EXPIRED:
            info = strings('coupon_invalid_info.coupon_status_expired');
            break;

        case STATUS_REDEEMED:
            info = strings('coupon_invalid_info.coupon_status_redeemed');
            if (coupon.hasOwnProperty('check_in_time') && coupon.check_in_time !== undefined && coupon.check_in_time !== null && coupon.check_in_time.length > 5) {
                info += '(' + Moment.unix(coupon.check_in_time, 'HH:mm DD/MM/YYYY').format('HH:mm, DD/MM/YYYY') + ')';
            }
            break;

        case STATUS_REJECTED:
        case STATUS_MERCHANT_REJECT:
        case STATUS_MERCHANT_CANCEL:
            info = strings('coupon_invalid_info.coupon_status_rejected');
            if (coupon.hasOwnProperty('cancel_time') && coupon.cancel_time !== undefined && coupon.cancel_time !== null && coupon.cancel_time.length > 5) {
                info += '(' + Moment.utc(coupon.cancel_time, 'HH:mm DD/MM/YYYY').format('HH:mm, DD/MM/YYYY') + ')';
            }
            break;

        case STATUS_USER_CANCEL:
            info = strings('coupon_invalid_info.coupon_cancel_by_customer');
            if (coupon.hasOwnProperty('cancel_time')&& coupon.cancel_time !== undefined && coupon.cancel_time !== null && coupon.cancel_time.length > 5) {
                info += '(' + Moment.utc(coupon.cancel_time, 'HH:mm DD/MM/YYYY').format('HH:mm, DD/MM/YYYY') + ')';
            }
            break;

        case STATUS_ADMIN_CANCEL:
            info = strings('coupon_invalid_info.coupon_status_admin_cancel');
            if (coupon.hasOwnProperty('cancel_time')&& coupon.cancel_time !== undefined && coupon.cancel_time !== null && coupon.cancel_time.length > 5) {
                info += '(' + Moment.utc(coupon.cancel_time, 'HH:mm DD/MM/YYYY').format('HH:mm, DD/MM/YYYY') + ')';
            }
            break;
    }
    return info;
}