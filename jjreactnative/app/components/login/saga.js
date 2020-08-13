import { call, put, take } from "redux-saga/effects";
import {
    LOGIN_USER,
    LOGOUT_USER,
    loginUserSuccess,
    loginUserFail,
    logoutUserSuccess,
    logoutUserFail, LOGIN_SUCCESS,
} from './action';
import {commonApi} from '../../api/common-api'
import {Toast} from "../common/alert/Toast";
import {UserDb} from '../../api/storage/UserDb'
import {ConfigDb} from '../../api/storage/ConfigDb'
import {CouponDb} from '../../api/storage/CouponDb'
import {RealmDbHelper} from '../../api/storage/RealmDbHelper'
import {AnalyticsUtil} from '../../components/common/analytics/analytics';

function* sendDeviceToken() {
    try {
        const currentOneSignalPlayer = ConfigDb.getOneSignalPlayer();
        if (!!currentOneSignalPlayer) {
            commonApi.sendDeviceTokenToServer(RealmDbHelper.copyObjectFromRealm(currentOneSignalPlayer));
        }
    } catch (e) {
        console.log(e);
    }
}

//Login user
function* loginUser(access_token, provider) {
    try {
        console.log(access_token);
        const user = provider === 'firebase_phone' ? yield commonApi.loginByPhone(access_token) : yield commonApi.login(access_token);
        console.log(user);
        if (!user || !user.id) {
            yield put(loginUserFail(user));
            Toast.showToast('Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!');
            return;
        }
        UserDb.set(user);
        CouponDb.removeAll();
        yield put(loginUserSuccess(user));
        yield call(sendDeviceToken);
    } catch (error) {
        console.log(error);
        yield put(loginUserFail(error));
    }
}

export function* watchloginUser() {
    while (true) {
        const { access_token, provider } = yield take(LOGIN_USER)
        yield call(loginUser, access_token, provider);
    }
}

export function* logoutRequest() {
    try {
        yield commonApi.logout();
    } catch (error) {
        console.log(error)
    }
}

export function* loginUserSuccessHandler(user) {
    try {
        if (!user) return;
        UserDb.set(user);
        CouponDb.removeAll();
        AnalyticsUtil.loginCompleted();

        yield call(sendDeviceToken);
    } catch (error) {
        console.log(error);
        yield put(loginUserFail(error));
    }
}

export function* watchLoginUserSuccess() {
    while (true) {
        const { user } = yield take(LOGIN_SUCCESS);
        yield call(loginUserSuccessHandler, user);
    }
}

//Logout user
function* logoutUser() {
    try {
        UserDb.remove();
        yield put(logoutUserSuccess());
        yield call(sendDeviceToken);
        yield call(logoutRequest);
    } catch (error) {
        console.log(error)
        yield put(logoutUserFail(error));
    }
}

export function* watchLogoutUser() {
    while (true) {
        yield take(LOGOUT_USER);
        yield call(logoutUser);
    }
}