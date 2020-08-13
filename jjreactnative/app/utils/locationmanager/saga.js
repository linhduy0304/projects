import { call, put, take } from "redux-saga/effects";
import {
    FETCH_CURRENT_PROVINCE,
    FETCH_LOCATION_SUPPORT,
    provinceChanged,
    fetchLocationSupportSuccess
} from './action';
import {ConfigDb} from "../../api/storage/ConfigDb";
import {commonApi} from '../../api/common-api'

function* fetchProvinceSelected() {
    try {
        const province = ConfigDb.getSelectedProvince();
        console.log('fetchProvinceSelected', province)
        yield put(provinceChanged(province));
    } catch (error) {
        console.log('fetchProvinceSelected:error', error);
        yield put(provinceChanged({name: 'Hà Nội', id: 'ha-noi'}));
    }
}

export function* watchFetchProvinceSelected() {
    while (true) {
        const { action } = yield take(FETCH_CURRENT_PROVINCE);
        yield call(fetchProvinceSelected, action);
    }
}

function* fetchLocationSupport() {
    try {
        let provinces = yield commonApi.getSupportLocations();
        provinces = provinces.map((province, index) => {
            return {
                name: province.key === 'tp-hcm' ? 'Tp.Hồ Chí Minh' : province.value,
                id: province.key
            }
        });
        console.log('fetchLocationSupport', provinces);
        yield put(fetchLocationSupportSuccess(provinces));
    } catch (e) {
        console.log('fetchLocationSupport:error', e);
    }
}

export function* watchFetchLocationSupport() {
    while (true) {
        const { action } = yield take(FETCH_LOCATION_SUPPORT);
        yield call(fetchLocationSupport, action);
    }
}