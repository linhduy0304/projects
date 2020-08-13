export const RATE_COUPON = "RATE_COUPON";

export const rateCoupon = (rateId, rateValue, rateComment) => {
    return {
        type: RATE_COUPON,
        rateId: rateId,
        rateValue: rateValue,
        rateComment: rateComment
    }
}