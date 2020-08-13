import { call, put, take } from "redux-saga/effects";
import {
    LIKE_DEAL,
    DISLIKE_DEAL,
    SAVE_DEAL,
    CHECKIN_DEAL,
    FOLLOW_BRAND,
    SHARE_DEAL,
    updateLikeDealStatus,
    updateSaveDealStatus,
    updateCheckInStatus,
    updateFollowBrandStatus,
    updateShareDealStatus
} from './action';
import {dealApi} from "../../api/deal-api";
import {brandApi} from "../../api/brand-api";

function* likeDeal(slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) {
    try {
        const newUpCount = up_vote_count + 1;
        let newDownCount = down_vote_count;

        if (is_vote_down) {
            newDownCount = newDownCount <= 0 ? 0 : newDownCount - 1;
        }

        yield put(updateLikeDealStatus(slug, newUpCount, true, newDownCount, false));

        let result = yield dealApi.voteDeal(slug, 'up_vote');
        console.log('like_deal:result', result);

        if (!result || !!result.error || !!result.error_message) {
            yield put(updateLikeDealStatus(slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down));
        }
    } catch (error) {
        console.log('like_deal:error', error);

        yield put(updateLikeDealStatus(slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down));
    }
}

export function* watchLikeDeal() {
    while (true) {
        const { slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down } = yield take(LIKE_DEAL);
        yield call(likeDeal, slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down);
    }
}

function* disLikeDeal(slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) {
    try {
        const newDownCount = down_vote_count + 1;
        let newUpCount = up_vote_count;

        if (is_vote_up) {
            newUpCount = newUpCount <= 0 ? 0 : newUpCount - 1;
        }

        yield put(updateLikeDealStatus(slug, newUpCount, false, newDownCount, true));

        let result = yield dealApi.voteDeal(slug, 'down_vote');
        console.log('dislike_deal:result', result);

        if (!result || !!result.error || !!result.error_message) {
            yield put(updateLikeDealStatus(slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down));
        }
    } catch (error) {
        console.log('dislike_deal:error', error);

        yield put(updateLikeDealStatus(slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down));
    }
}

export function* watchDisLikeDeal() {
    while (true) {
        const { slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down } = yield take(DISLIKE_DEAL);
        yield call(disLikeDeal, slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down);
    }
}

function* saveDeal(id, is_save, save_count) {
    try {
        let newSaveCount = save_count;

        if (is_save) newSaveCount = newSaveCount <= 0 ? 0 : newSaveCount - 1;
        else newSaveCount = newSaveCount + 1;

        yield put(updateSaveDealStatus(id, !is_save, newSaveCount));

        let result = yield dealApi.saveDeal(id);
        console.log('save_deal:result', result);

        if (!result || !!result.error || !!result.error_message) {
            yield put(updateSaveDealStatus(id, is_save, save_count));
        }
    } catch (error) {
        console.log('save_deal:error', error);

        yield put(updateSaveDealStatus(id, is_save, save_count));
    }
}

export function* watchSaveDeal() {
    while (true) {
        const { id, is_save, save_count } = yield take(SAVE_DEAL);
        yield call(saveDeal, id, is_save, save_count);
    }
}

function* checkInDeal(slug, check_in_id, checked_in, check_in_count) {
    try {
        if (checked_in && !check_in_id) return;

        let newCheckInCount = check_in_count;

        if (checked_in) {
            newCheckInCount = newCheckInCount <= 0 ? 0 : newCheckInCount - 1;
        }
        else {
            newCheckInCount = newCheckInCount + 1;
        }

        if (checked_in) {
            yield put(updateCheckInStatus(slug, undefined, false, newCheckInCount));

            const result = yield dealApi.deleteCheckinDeal(check_in_id);
            console.log('delete_check_in_deal:result', result);

            if (!result || !!result.error || !!result.error_message) {
                yield put(updateCheckInStatus(slug, check_in_id, checked_in, check_in_count));
            }
            return;
        }

        yield put(updateCheckInStatus(slug, undefined, true, newCheckInCount));
        const result = yield dealApi.checkinDeal(slug);
        console.log('check_in_deal:result', result);

        if (!result || !!result.error || !!result.error_message) {
            yield put(updateCheckInStatus(slug, check_in_id, checked_in, check_in_count));
        }
        else {
            yield put(updateCheckInStatus(slug, result.id, true, newCheckInCount));
        }
    } catch (error) {
        console.log('check_in_deal:error', error);

        yield put(updateCheckInStatus(slug, check_in_id, checked_in, check_in_count));
    }
}

export function* watchCheckInDeal() {
    while (true) {
        const { slug, check_in_id, checked_in, check_in_count } = yield take(CHECKIN_DEAL);
        yield call(checkInDeal, slug, check_in_id, checked_in, check_in_count);
    }
}

function* followBrand(brand_id, following) {
    try {
        yield put(updateFollowBrandStatus(brand_id, !following));

        let result = yield brandApi.follow(brand_id);
        console.log('follow_brand:result', result);

        if (!result || !!result.error || !!result.error_message) {
            yield put(updateFollowBrandStatus(brand_id, following));
        }
    } catch (error) {
        console.log('follow_brand:error', error);

        yield put(updateFollowBrandStatus(brand_id, following));
    }
}

export function* watchFollowBrand() {
    while (true) {
        const { brand_id, following } = yield take(FOLLOW_BRAND);
        yield call(followBrand, brand_id, following);
    }
}


function* shareDeal(slug, share_count) {
    try {
        if (share_count >= 0) {
            yield put(updateShareDealStatus(slug, share_count + 1));
        }

        let result = yield dealApi.voteDeal(slug, 'share');
        console.log('share_deal:result', result);

        // if (!result || !!result.error || !!result.error_message) {
        //     if (share_count >= 0) {
        //         yield put(updateShareDealStatus(slug, share_count));
        //     }
        // }
    } catch (error) {
        console.log('share_deal:error', error);

        // if (share_count >= 0) {
        //     yield put(updateShareDealStatus(slug, share_count));
        // }
    }
}

export function* watchShareDeal() {
    while (true) {
        const { slug, share_count } = yield take(SHARE_DEAL);
        yield call(shareDeal, slug, share_count);
    }
}