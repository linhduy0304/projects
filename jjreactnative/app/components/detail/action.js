export const LIKE_DEAL = "LIKE_DEAL";
export const DISLIKE_DEAL = "DISLIKE_DEAL";
export const SAVE_DEAL = "SAVE_DEAL";
export const CHECKIN_DEAL = "CHECKIN_DEAL";
export const FOLLOW_BRAND = "FOLLOW_BRAND";
export const SHARE_DEAL = "SHARE_DEAL";

export const UPDATE_LIKE_DEAL_STATUS = "UPDATE_LIKE_DEAL_STATUS";
export const UPDATE_SAVE_DEAL_STATUS = "UPDATE_SAVE_DEAL_STATUS";
export const UPDATE_CHECKIN_DEAL_STATUS = "UPDATE_CHECKIN_DEAL_STATUS";
export const UPDATE_FOLLOW_BRAND_STATUS = "UPDATE_FOLLOW_BRAND_STATUS";
export const UPDATE_SHARE_DEAL_STATUS = "UPDATE_SHARE_DEAL_STATUS";

export const likeDeal = (slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) => {
    return {
        type: LIKE_DEAL,
        slug,
        up_vote_count,
        is_vote_up,
        down_vote_count,
        is_vote_down
    }
}

export const dislikeDeal = (slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) => {
    return {
        type: DISLIKE_DEAL,
        slug,
        up_vote_count,
        is_vote_up,
        down_vote_count,
        is_vote_down
    }
}

export const saveDeal = (id, is_save, save_count) => {
    return {
        type: SAVE_DEAL,
        id,
        is_save,
        save_count
    }
}

export const checkInDeal = (slug, check_in_id, checked_in, check_in_count) => {
    return {
        type: CHECKIN_DEAL,
        slug,
        check_in_id,
        checked_in,
        check_in_count
    }
}

export const followBrand = (brand_id, following) => {
    return {
        type: FOLLOW_BRAND,
        brand_id,
        following
    }
}

export const shareDeal = (slug, share_count) => {
    return {
        type: SHARE_DEAL,
        slug,
        share_count
    }
}

export const updateLikeDealStatus = (slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) => {
    return {
        type: UPDATE_LIKE_DEAL_STATUS,
        slug,
        up_vote_count,
        is_vote_up,
        down_vote_count,
        is_vote_down
    }
}

export const updateSaveDealStatus = (id, is_save, save_count) => {
    return {
        type: UPDATE_SAVE_DEAL_STATUS,
        id,
        is_save,
        save_count
    }
}

export const updateCheckInStatus = (slug, check_in_id, checked_in, check_in_count) => {
    return {
        type: UPDATE_CHECKIN_DEAL_STATUS,
        slug,
        check_in_id,
        checked_in,
        check_in_count
    }
}

export const updateFollowBrandStatus = (brand_id, following) => {
    return {
        type: UPDATE_FOLLOW_BRAND_STATUS,
        brand_id,
        following
    }
}

export const updateShareDealStatus = (slug, share_count) => {
    return {
        type: UPDATE_SHARE_DEAL_STATUS,
        slug,
        share_count
    }
}
