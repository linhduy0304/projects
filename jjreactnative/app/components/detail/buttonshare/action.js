export const SET_CURRENT_DEAL_TO_SHARE = "SET_CURRENT_DEAL_TO_SHARE";

export const setCurrentDealToShare = (deal) => {
    return {
        type: SET_CURRENT_DEAL_TO_SHARE,
        deal,
    }
}