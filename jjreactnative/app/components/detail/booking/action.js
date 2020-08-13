export const COUPON_DATA_CHANGE = "COUPON_DATA_CHANGE";

export const couponChangeAction = (did, coupon) => {
    return {
        type: COUPON_DATA_CHANGE,
        did,
        coupon
    }
}