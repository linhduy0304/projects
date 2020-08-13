import {
    LOCATION_CHANGED,
    PROVINCE_CHANGED,
    FETCH_LOCATION_SUPPORT_SUCCESS
} from './action';
import {fromJS} from 'immutable'

import {fetcherConfig} from '../../api/fetcher'
import {AnalyticsUtil} from '../../components/common/analytics/analytics';

const initState = fromJS({
    province: undefined,
    location: undefined,
    locationSupport: undefined
});

const locationReducer = (state = initState, action) => {
    switch (action.type) {
        case PROVINCE_CHANGED:
            console.log('PROVINCE_CHANGED', action);
            fetcherConfig.setProvince(() => action.province.id);
            AnalyticsUtil.setProvince(action.province.id);
            return state.updateIn(['province'], () => fromJS(action.province));

        case LOCATION_CHANGED:
            console.log('LOCATION_CHANGED', action);
            const location = {
                latitude: action.latitude,
                longitude: action.longitude
            };
            fetcherConfig.setLocation(() => location);
            return state.updateIn(['location'], () => fromJS(location));

        case FETCH_LOCATION_SUPPORT_SUCCESS:
            return state.updateIn(['locationSupport'], () => fromJS(action.provinces));
        default:
            return state;
    }
}

export default locationReducer;