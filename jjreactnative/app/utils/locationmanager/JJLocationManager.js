import React from 'react'
import {NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter} from 'react-native';
import {locationChanged} from './action'
import {Api} from "../../Api";
import {StringUtil} from '../../utils/string-util'
import {ObjectUtil} from '../object-utils'

const { JJLocation } = NativeModules;
const ios = Platform.OS === 'ios';
const EVENT_UPDATE_LOCATION = 'location_update_event_listener';
const jjLocationEmitter = ios ? new NativeEventEmitter(JJLocation) : undefined;

const TAG = 'JJLocationManager';

export default class JJLocationManager {

    dispatch = undefined;
    provincesSupport = undefined;
    fetchingLocation = false;
    onProviceChangeListener = undefined;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    startInitLocation = (onProviceChangeListener) => {
        this.onProviceChangeListener = onProviceChangeListener;

        console.log(`${TAG}:startRequest`);
        if (ios) {
            this._iosHandle();
        }
        else {
            this._androidInitLocationStart();
        }
    }

    stop = () => {
        DeviceEventEmitter.removeListener(EVENT_UPDATE_LOCATION, this._onInitLocationUpdate);
        if (ios) {
            JJLocation.stop();
        }
        this.onProviceChangeListener = undefined;
    }

    setProvinceSupport = (pr) => {
        this.provincesSupport = pr;
    }

    fetchLocation = (resolve, reject) => {
        if (ios) {
            this._fetchOnlyLocationIOS(resolve, reject);
        }
        else {
            this._fetchOnlyLocationAndroid(resolve, reject);
        }

    }

    _fetchOnlyLocationAndroid = (resolve, reject) => {
        JJLocation.fetchLocation(true);
        const listener = location => {
            DeviceEventEmitter.removeListener(EVENT_UPDATE_LOCATION, listener);

            if (!location || !location.latitude) {
                reject('Không xác định được vị trí. Vui lòng thử lại sau!');
            }
            else {
                resolve(location.latitude, location.longitude);
            }
        };
        DeviceEventEmitter.addListener(EVENT_UPDATE_LOCATION, listener);
    }

    _fetchOnlyLocationIOS = (resolve, reject) => {

        const subscription = jjLocationEmitter.addListener(
            EVENT_UPDATE_LOCATION,
            result => {
                console.log(`${TAG}:EVENT_UPDATE_LOCATION:`, result);

                if (!result || !result.latitude || !result.longitude) {
                    reject('Không xác định được vị trí. Vui lòng thử lại sau!');
                }
                else {
                    resolve(result.latitude, result.longitude);
                }

                subscription.remove();
            }
        );

        JJLocation.getCurrentPosition({ distanceFilter: 100, forceSettings: true });
    }

    _iosHandle = () => {
        this.fetchingLocation = true;
        console.log(`${TAG}:_iosHandle`, JJLocation);

        const subscription = jjLocationEmitter.addListener(
            EVENT_UPDATE_LOCATION,
            result => {
                console.log(`${TAG}:EVENT_UPDATE_LOCATION:`, result);

                if (!StringUtil.isEmpty(result)) {
                    const location = {
                        latitude: result.latitude,
                        longitude: result.longitude,
                        address: {
                            mAdminArea: ObjectUtil.getValue(result, 'hanoi', ['address', 'locality'])
                        }
                    };

                    this._onInitLocationUpdate(location);
                }

                subscription.remove();
            }
        );

        JJLocation.getCurrentPosition({ distanceFilter: 100 });
    }

    _androidInitLocationStart = () => {
        if (!!this.fetchingLocation) return;

        JJLocation.fetchLocation(false);
        this.fetchingLocation = true;

        DeviceEventEmitter.addListener(EVENT_UPDATE_LOCATION, this._onInitLocationUpdate);
    }

    _onInitLocationUpdate = (result) => {
        DeviceEventEmitter.removeListener(EVENT_UPDATE_LOCATION, this._onInitLocationUpdate);

        console.log('_onInitLocationUpdate:', result);
        if (!result) return;

        this.dispatch(locationChanged(result.latitude, result.longitude));

        if (!result.address) return;

        const adminArea = result.address.mAdminArea;
        const provinceId = this._getProvinceIdFromAdminAreaName(adminArea);

        if (StringUtil.isEmpty(provinceId)) return;

        if (!!this.onProviceChangeListener) this.onProviceChangeListener({
            name: this._manualHCMName(provinceId, adminArea),
            id: provinceId
        })
    }

    _getProvinceIdFromAdminAreaName = (admin) => {
        if (StringUtil.isEmpty(admin)) return null;
        if (!this.provincesSupport || this.provincesSupport.size < 1) return this._detectFromDefault(admin);
        else return this._detectFromSupportList(admin);
    }

    _detectFromDefault = (admin) => {
        const provinceLowerCase = admin.toLowerCase();
        switch (provinceLowerCase) {
            case 'hanoi':
            case 'ha noi':
            case 'hà nội':
                return 'ha-noi';

            case 'hochiminh':
            case 'ho chi minh':
            case 'hồ chí minh':
                return 'tp-hcm';

            case 'danang':
            case 'da nang':
            case 'đà nẵng':
                return 'da-nang';

            case 'haiphong':
            case 'hai phong':
            case 'hải phòng':
                return 'hai-phong';
            default:
                return null;
        }
    }

    _manualDetectHCM = (admin) => {
        switch (admin) {
            case 'hochiminh':
            case 'ho chi minh':
            case 'hồ chí minh':
                return 'tp-hcm';
        }
        return null;
    }

    _manualHCMName = (id, name) => {
        return id === 'tp-hcm' ? 'Tp.Hồ Chí Minh' : name;
    }

    _detectFromSupportList = (admin) => {
        const defaultId = 'ha-noi';

        const newProvince = admin.toLowerCase();

        for (let i = 0; i < this.provincesSupport.size; i++) {
            const province = this.provincesSupport.get(i);

            if (province.get('id') === 'tp-hcm') {
                const result = this._manualDetectHCM(newProvince);
                if (!!result) return 'tp-hcm';
            }

            let provinceName = province.get('name');
            if (StringUtil.isEmpty(provinceName)) continue;
            provinceName = provinceName.toLowerCase();

            if (provinceName === newProvince) return province.get('id', defaultId);

            let provinceEncoded = StringUtil.unicodeToLatin(provinceName);

            if (provinceEncoded === newProvince) return province.get('id', defaultId);

            if (provinceEncoded.replace(/\s/g, '') === newProvince) return province.get('id', defaultId);
        }

        return null;
    }
}