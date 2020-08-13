import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGIN_USER, UPDATE_USER,
} from './action';
import {CommonUtil} from '../../utils/common-utils'

import {fetcherConfig} from '../../api/fetcher'

import {AnalyticsUtil} from '../common/analytics/analytics'
const initState = {
    isLogining: false,
    isLoginned: false,
    user: {},
}

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isLogining: true
            };
        case LOGIN_SUCCESS:
            fetcherConfig.setHeaders(() => {
                if (action.user) {
                    return {
                        "Authorization": `${action.user.token_type} ${action.user.access_token}`,
                    };
                }
                return {};
            });

            if (!!action.user) {
                AnalyticsUtil.setUser(action.user);
            }
            return {
                ...state,
                isLoginned: true,
                isLogining: false,
                user: action.user,
            };
        case LOGIN_FAIL:
            fetcherConfig.setHeaders(() => ({"Authorization": 'none'}));
            CommonUtil.clearNetworkCookie();
            return {
                ...state,
                isLoginned: false,
                isLogining: false,
                user: {},
            };
        case LOGOUT_USER_SUCCESS:
            CommonUtil.clearNetworkCookie();
            fetcherConfig.setHeaders(() => {
                return {
                    "Authorization": 'none',
                }
            });
            AnalyticsUtil.removeUser();
            return {
                ...state,
                isLoginned: false,
                user: {},
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
}

export default loginReducer;