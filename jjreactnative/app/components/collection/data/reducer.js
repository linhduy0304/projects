import {fromJS} from 'immutable'
import {
    SAVE_COLLECTION_STATUS
} from './action';

const initState = fromJS({
    action: undefined,
    slug: '',
    is_save: false,
    save_count: 0
});

const collectionActionReducer = (state = initState, action) => {
    switch (action.type) {
        case SAVE_COLLECTION_STATUS:
            return state
                .updateIn(['action'], () => 'save')
                .updateIn(['slug'], ()=> action.slug)
                .updateIn(['is_save'], () => action.is_save)
                .updateIn(['save_count'], () => action.save_count);
        default:
            return initState;
    }
}

export default collectionActionReducer;