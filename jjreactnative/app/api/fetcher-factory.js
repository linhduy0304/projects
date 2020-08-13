import {StringUtil} from '../utils/string-util'
import {NativeModules, Platform} from 'react-native'
import {Toast} from '../components/common/alert/Toast'

const APPVERSION = NativeModules.AppInfo.VersionCode;
// const UUID = Platform.OS === 'ios' ? '' : NativeModules.AppInfo.UUID;
const ios = Platform.OS === 'ios';
const UserAgent = StringUtil.encodeURL(`${ios ? 'iosapp' : 'androidapp'}/${APPVERSION}`);
const CLIENT_ID = ios ? '6NxzSGpuzBls5YuFLv5Ws69Oxie2VQ1LPTb00hgy':'8uG7QrxY4xrCwBL0xXDYwf6cGLpmP39nuTIuAGkq';

const FetcherFactory = {
    createApi({urlModifier, getHeaders, getUUID, getTrackingConfig, getLocation}) {
        let createHeaders = () => {
            let headers = new Headers();
            headers.append('User-Agent', UserAgent);
            if (getHeaders() && !StringUtil.isEmpty(getHeaders().Authorization)) {
                headers.append('Authorization', getHeaders().Authorization);
            }
            if (StringUtil.isEmpty(getHeaders()) || StringUtil.isEmpty(getHeaders().Authorization) || getHeaders().Authorization === 'none') {
                headers.append('cookie' , 'none');
            }

            headers.append('AppVersion', StringUtil.encodeURL(APPVERSION));
            headers.append('acversion', StringUtil.encodeURL(APPVERSION));
            headers.append('uuid', StringUtil.encodeURL(getUUID()));
            headers.append('client_id', CLIENT_ID);
            headers.append('clientType', Platform.OS);

            const trackingConfig = getTrackingConfig();
            headers.append('acs', StringUtil.encodeURL(trackingConfig.acs));
            headers.append('drs', StringUtil.encodeURL(trackingConfig.drs));

            const location = getLocation();
            if (!!location && !!location.latitude) {
                headers.append('lat', location.latitude);
                headers.append('lon', location.longitude);
            }

            return headers;
        };

        const withPayload = (method) => (url, data, type, requireAuth) => {
            let headers = createHeaders();
            headers.append('Content-Type', 'application/json');

            console.debug('---->>>> withPayload:request: ', url, headers, data);

            return fetch(urlModifier(url), {
                method,
                body: StringUtil.isEmpty(data) ? JSON.stringify({}) : JSON.stringify(data),
                headers,
            }).then((response) => {
                if (!response) return response;

                if (!!requireAuth && response.status === 401) {
                    Toast.showToast('Phiên đăng nhập đã hết hạn! Vui lòng đăng xuất và đăng nhập lại.');
                    throw ({errorCode: 401});
                    return;
                }

                if (response.status < 200 || response.status > 299) {
                    if (!StringUtil.isEmpty(response.statusText)) throw response.statusText;
                    return response.json();
                }

                if (!type) return response.json();

                if (type === 'text')
                    return response.text();
                else if (type === 'origin')
                    return response;
                else
                    return response.json();

            }).then(result => {
                if (typeof result === 'object' && !!result.error) throw result;
                return result;
            });
        };

        const withoutPayload = (method) => (url, type, requireAuth) => {
            let headers = createHeaders();

            console.debug('---->>>> withoutPayload:request: ', url, headers);

            return fetch(urlModifier(url), {
                method,
                headers
            }).then((response) => {
                if (!response) return response;

                if (!!requireAuth && response.status === 401) {
                    Toast.showToast('Phiên đăng nhập đã hết hạn! Vui lòng đăng xuất và đăng nhập lại.');
                    throw ({errorCode: 401});
                    return;
                }

                if ((response.status < 200 || response.status > 299) && response.status !== 401) {
                    if (!StringUtil.isEmpty(response.statusText)) throw response.statusText;
                    return response.json();
                }

                if (!type) return response.json();

                if (type === 'text')
                    return response.text();
                else if (type === 'origin')
                    return response;
                else
                    return response.json();

            }).then(result => {
                if (typeof result === 'object' && !!result.error) throw result;
                return result;
            });
        };

        const login = () => (url, data) => {
            let headers = new Headers();
            headers.append('User-Agent', UserAgent);

            headers.append('Authorization', 'none');
            headers.append('cookie' , 'none');
            headers.append('AppVersion', StringUtil.encodeURL(APPVERSION));
            headers.append('acversion', StringUtil.encodeURL(APPVERSION));
            headers.append('uuid', StringUtil.encodeURL(getUUID()));
            headers.append('client_id', CLIENT_ID);
            headers.append('clientType', Platform.OS);
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

            const trackingConfig = getTrackingConfig();
            headers.append('acs', StringUtil.encodeURL(trackingConfig.acs));
            headers.append('drs', StringUtil.encodeURL(trackingConfig.drs));

            console.log('login', url, headers, data);

            return fetch(urlModifier(url), {
                method: 'POST',
                body: data,
                headers,
            }).then((response) => response.json());
        };

        return {
            get: withoutPayload("GET"),
            delete: withoutPayload("DELETE"),
            post: withPayload("POST"),
            put: withPayload("PUT"),
            login: login()
        };
    }
};

exports.FetcherFactory = FetcherFactory;