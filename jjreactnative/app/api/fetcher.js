import {FetcherFactory} from './fetcher-factory'
import {StringUtil} from '../utils/string-util'
import {NativeModules} from 'react-native';

const PREFIX = 'publish' === NativeModules.AppInfo.BuildEnv ? '' : 'dev.';
let getHeaders = () => ({});
let getProvince = () => (undefined);
let uuidConfigId = '';
let getTrackingConfig = () => ({
    acs: 'direct',
    drs: 'direct'
});
let getLocation = () => ({});

const fetcher = FetcherFactory.createApi({
    urlModifier: (url) => {
        let link = `https://${PREFIX}jamja.vn/api/${url}`;

        if (!getProvince() || StringUtil.isEmpty(getProvince()) || getProvince().length < 1) {
            console.debug('REQUEST URL', link);
            return link;
        }

        let locationUrl = '';
        const location = getLocation();

        if (!!location && !!location.latitude && !!location.longitude) {
            locationUrl = `&lat=${location.latitude}&lon=${location.longitude}`;
        }

        if (!!getProvince() && typeof getProvince() === 'string' && url.indexOf('province=') < 0) {
            if (link && link.indexOf('?') > -1) {
                link += `&province=${getProvince()}${locationUrl}`;
            } else {
                link += `?province=${getProvince()}${locationUrl}`;
            }
        }

        console.debug('REQUEST URL', link);
        return link;
    },
    getHeaders: () => getHeaders(),
    getUUID: () => uuidConfigId,
    getTrackingConfig: () => getTrackingConfig(),
    getLocation: () => getLocation()
});

exports.fetcher = fetcher;

const fetcherConfig = {
    setHeaders: (fn) => getHeaders = fn,
    getHeaders: () => getHeaders(),
    setProvince: (p) => getProvince = p,
    getProvince: () => getProvince(),
    setLocation: (location) => getLocation = location,
    getLocation: () => getLocation(),
    setUUIDToConfig: (id) => uuidConfigId = id,
    getUUIDToConfig: () => uuidConfigId,
    setTrackingConfig: (config) => getTrackingConfig = config,
    getTrackingConfig: () => {
        const tracking = getTrackingConfig();
        if (!tracking || !tracking.acs) return {
            acs: 'direct',
            drs: 'direct'
        };
        return tracking;
    }
};

exports.fetcherConfig = fetcherConfig;