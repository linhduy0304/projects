import React from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

import {dispatch} from '../../../router/MainTabContainer';
import {locationChanged} from "../../../utils/locationmanager/action";
import {AppConfig} from '../../config';

export function removeAllBackgroundGeolocation() {
    try {
        BackgroundGeolocation.removeAllListeners('location');
        BackgroundGeolocation.removeAllListeners('stationary');
        BackgroundGeolocation.removeAllListeners('activity');
        BackgroundGeolocation.removeAllListeners('error');
        BackgroundGeolocation.removeAllListeners('authorization');
        BackgroundGeolocation.removeAllListeners('start');
        BackgroundGeolocation.removeAllListeners('stop');
        BackgroundGeolocation.removeAllListeners('foreground');
        BackgroundGeolocation.removeAllListeners('background');
        BackgroundGeolocation.removeAllListeners('abort_requested');
        BackgroundGeolocation.removeAllListeners('http_authorization');
        BackgroundGeolocation.removeAllListeners();
        BackgroundGeolocation.stop();
    }
    catch (e) {
        console.log(e);
    }
}

export default class LocationManage {

    _run = false;

    _success;
    _failure;

    _retryCount = 0;

    constructor() {
        this._run = true;

        // BackgroundGeolocation.configure({
        //     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        //     stationaryRadius: 50,
        //     distanceFilter: 50,
        //     debug: false,
        //     startOnBoot: false,
        //     stopOnTerminate: true,
        //     locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
        //     interval: 10000,
        //     fastestInterval: 5000,
        //     activitiesInterval: 10000,
        //     stopOnStillActivity: false,
        //     notificationsEnabled: false,
        //     startForeground: false
        // });
    }

    stop() {
        try {
            this._run = false
            removeAllBackgroundGeolocation();
            !!this.handleTimeOut && clearTimeout(this.handleTimeOut);
        }
        catch (e) {
            console.log(e);
        }
    }

    requestLocation(success, failure) {
        console.debug('LocationManage:requestLocation:', success, failure);

        BackgroundGeolocation.checkStatus(
            result => {
                console.debug('checkStatus:result: ', result);

                if (!result.locationServicesEnabled) {
                    !!failure && failure({code: 401});
                    return;
                }
                if (!result.hasPermissions) {
                    !!failure && failure({code: 403});
                    return;
                }
                this._retryCount = 0;
                this._getLocation(success, failure);
            },
            error => {
                console.debug('checkStatus:error: ', error);
                !!failure && failure({code: 500});
            }
        )
    }

    requestBySettings(success, failure) {
        this._success = success;
        this._failure = failure;
        this._startHandleSettings();
        if (!!AppConfig.ios) {
            BackgroundGeolocation.showAppSettings();
        }
        else {
            BackgroundGeolocation.showLocationSettings();
        }
    }

    requestByPermission(success, failure) {
        if (!!AppConfig.ios) {
            this._success = success;
            this._failure = failure;
            this._startHandleSettings();
            BackgroundGeolocation.showAppSettings();
        }
        else {
            this._retryCount = 0;
            this._getLocation(success, failure);
        }
    }

    _getLocation = (success, failure) => {
        BackgroundGeolocation.getCurrentLocation(
            location => {
                console.debug('getCurrentLocation:location: ', location);
                if (!!location) {
                    !!dispatch && dispatch(locationChanged(location.latitude, location.longitude));
                    !!success && success(location);
                }
                else {
                    !!failure && failure({code: 500});
                }
            },
            error => {
                console.debug('getCurrentLocation:error: ', error);

                if (error.code === BackgroundGeolocation.PERMISSION_DENIED) {
                    !!failure && failure({code: 403});
                    return;
                }

                if (error.code === BackgroundGeolocation.LOCATION_UNAVAILABLE) {
                    !!failure && failure({code: 401});
                    return;
                }

                if (error.code === BackgroundGeolocation.TIMEOUT && this._retryCount < 1) {
                    this._retryCount = 1;
                    this._getLocation(success, failure);
                    return;
                }

                this._retryCount = 0;
                !!failure && failure({code: 500});
            },
            {
                timeout: this._retryCount < 1 ? 3000 : 15000,
                maximumAge: 1000,
                enableHighAccuracy: true
            });
    }

    _startHandleSettings() {
        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
            if (!!this._success && !!this._failure) {
                this.handleTimeOut = setTimeout(() => {
                    this.handleTimeOut = undefined;
                    !!this._run && this.requestLocation(this._success, this._failure)
                }, 1000);
                BackgroundGeolocation.removeAllListeners();
            }
        });
    }
}