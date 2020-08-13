import { call, put, take } from "redux-saga/effects";
import {fromJS} from 'immutable'
import {
    FETCH_EVENT,
    FETCH_USER_INFO,
    fetchEventSuccess,
    fetchUserInfoAction,
    updateUserInfoAction,
    updateBanner,
    fetchHomePagesSuccess,
    fetchHomePagesError,
    updateBrandDay,
    FETCH_BANNER,
    FETCH_HOMEPAGES
} from './action';
import {commonApi} from "../../../api/common-api";
import {UserDb} from '../../../api/storage/UserDb'
import {RealmDbHelper} from '../../../api/storage/RealmDbHelper'
import {StringUtil} from '../../../utils/string-util'
import {ObjectUtil} from "../../../utils/object-utils";

function* fetchEvent() {
    try {
        let events = yield commonApi.getEvent();
        console.log('fetch_event:success', events);
        yield put(fetchEventSuccess(events));
    } catch (e) {
        console.log('fetch_event:error', e);
    }
}

export function* watchFetchEventAction() {
    while (true) {
        const { action } = yield take(FETCH_EVENT);
        yield call(fetchEvent, action);
    }
}

function* fetchUserInfo() {
    try {
        console.debug('fetchUserInfo');
        const currentUser = RealmDbHelper.copyObjectFromRealm(UserDb.get());
        if (StringUtil.isEmpty(currentUser) || StringUtil.isEmpty(currentUser.id)) {
            yield put(updateUserInfoAction(undefined));
            yield call(fetchBanner);
            return;
        }
        yield call(fetchBanner);

        const userInfo = yield commonApi.getUserInfo(currentUser.id);

        console.log('fetchUserInfo:', userInfo);
        yield put(updateUserInfoAction(userInfo));

    } catch (e) {
        console.log('fetchUserInfo:error', e);
        yield put(updateUserInfoAction(undefined));
    }
}

export function* watchFetchUserInfo() {
    while (true) {
        const { action } = yield take(FETCH_USER_INFO);
        yield call(fetchUserInfo, action);
    }
}

function* fetchBanner() {
    try {
        let banners = yield commonApi.getBanner();

        console.log('fetchBanner:response', banners);

        if (StringUtil.isEmpty(banners) || banners.length < 1) {
            yield put(updateBanner(undefined));
            return;
        }

        banners = fromJS(banners);

        const banner_43 = banners.find((banner, index) => banner.getIn(['banner_position', 'display']) === 43);
        const banner_50 = banners.find((banner, index) => banner.getIn(['banner_position', 'display']) === 50);
        const banner_46 = banners.find((banner, index) => banner.getIn(['banner_position', 'display']) === 46);
        const banner_52 = banners.find((banner, index) => banner.getIn(['banner_position', 'display']) === 52);

        banners = {
            banner_43,
            banner_50,
            banner_46,
            banner_52
        };

        yield put(updateBanner(fromJS(banners)));

    } catch (e) {
        console.log('fetchBanner:error', e);
        yield put(updateBanner(undefined));
    }
}

export function* watchFetchBanner() {
    while (true) {
        const { action } = yield take(FETCH_BANNER);
        yield call(fetchBanner, action);
    }
}

function* fetchHomePages() {
    try {
        let brandDay = yield commonApi.getBrandDays();
        console.debug('brandDay:response: ', brandDay);
        if (!!brandDay && !!brandDay.deals && brandDay.deals.length > 0) {
            yield put(updateBrandDay(
                fromJS(brandDay),
                ObjectUtil.getValue(brandDay, undefined, ['theme']),
                ObjectUtil.getValue(brandDay, undefined, ['header_color'])
            ));
        }
        else {
            yield put(updateBrandDay(undefined, undefined, undefined));
        }

        let data = yield commonApi.getHomePageDeals();
        data.objects = data.objects.sort((obj1, obj2) => obj1.order - obj2.order);
        data = fromJS(data);
        const categories = data.get('objects').filter((obj, i) => obj.get('category') !== undefined && obj.get('category') !== null)
            .map((obj, i) => {
                let category = obj.get('category');
                category = category.updateIn(['sub_categories'], () => obj.get('sub_list'));
                return category;
            })
            .sort((item1, item2) => item1.get('priority', 0) - item2.get('priority', 0));

        console.debug('getHomePageDeals:response: ', data);

        let eCouponSubList = data.get('objects').find((obj) => {
            return obj.get('type_deal') === 'buy_deal_online';
        });

        if (!!eCouponSubList) eCouponSubList = eCouponSubList.get('sub_list');

        let bookingSubList = data.get('objects').find((obj) => {
            return obj.get('type_deal') === 'booking_deals';
        });

        if (!!bookingSubList) bookingSubList = bookingSubList.get('sub_list');

        yield put(fetchUserInfoAction());
        yield put(fetchHomePagesSuccess(categories, eCouponSubList, bookingSubList, data.get('objects')));

    } catch (e) {
        console.log('fetch_event:error', e);
        yield put(fetchHomePagesError());
    }
}

export function* watchFetchHomePagesAction() {
    while (true) {
        const { action } = yield take(FETCH_HOMEPAGES);
        yield call(fetchHomePages, action);
    }
}