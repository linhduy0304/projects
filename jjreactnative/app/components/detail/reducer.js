import {fromJS} from 'immutable'
import {
    UPDATE_LIKE_DEAL_STATUS,
    UPDATE_CHECKIN_DEAL_STATUS,
    UPDATE_SAVE_DEAL_STATUS,
    UPDATE_FOLLOW_BRAND_STATUS,
    UPDATE_SHARE_DEAL_STATUS
} from './action';

const initState = fromJS({
    action: undefined,
    slug: undefined,
    id: undefined,
    brand_id: undefined,

    up_vote_count: 0,
    is_vote_up: false,
    down_vote_count: 0,
    is_vote_down: false,

    check_in_id: undefined,
    checked_in: false,
    check_in_count: 0,

    is_save: false,
    save_count: 0,

    following: false,

    share_count: 0
});

const dealActionReducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_LIKE_DEAL_STATUS:
            return state
                .updateIn(['action'], () => 'like')
                .updateIn(['slug'], ()=> action.slug)
                .updateIn(['up_vote_count'], () => action.up_vote_count)
                .updateIn(['is_vote_up'], () => action.is_vote_up)
                .updateIn(['down_vote_count'], () => action.down_vote_count)
                .updateIn(['is_vote_down'], () => action.is_vote_down);

        case UPDATE_SAVE_DEAL_STATUS:
            return state
                .updateIn(['action'], () => 'save')
                .updateIn(['id'], ()=> action.id)
                .updateIn(['is_save'], () => action.is_save)
                .updateIn(['save_count'], () => action.save_count);

        case UPDATE_CHECKIN_DEAL_STATUS:
            return state
                .updateIn(['action'], () => 'check_in')
                .updateIn(['slug'], ()=> action.slug)
                .updateIn(['check_in_id'], () => action.check_in_id)
                .updateIn(['checked_in'], () => action.checked_in)
                .updateIn(['check_in_count'], () => action.check_in_count);

        case UPDATE_FOLLOW_BRAND_STATUS:
            return state
                .updateIn(['action'], () => 'follow_brand')
                .updateIn(['brand_id'], ()=> action.brand_id)
                .updateIn(['following'], () => action.following);

        case UPDATE_SHARE_DEAL_STATUS:
            return state
                .updateIn(['action'], () => 'share')
                .updateIn(['slug'], ()=> action.slug)
                .updateIn(['share_count'], () => action.share_count);
        default:
            return initState;
    }
}

export default dealActionReducer;