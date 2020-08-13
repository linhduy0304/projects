import React from "react";
import {NativeModules, Platform, requireNativeComponent} from 'react-native';
import PropTypes from 'prop-types';
import {StringUtil} from '../../utils/string-util';

import {BaseComponent} from "../common/BaseComponent";
import {fetcherConfig} from "../../api/fetcher";

const APPVERSION = NativeModules.AppInfo.VersionCode;
const ios = Platform.OS === 'ios';
const UserAgent = StringUtil.encodeURL(`${ios ? 'app_web_ios' : 'app_web_ios'}/${APPVERSION}`);

/**
 * url: String
 */
class JJWebView extends BaseComponent {

    static navigationOptions = {
        gesturesEnabled: false,
        cardStack: {
            gesturesEnabled: false
        }
    };

    render() {
        console.log('JJWebView:render');
        return (
            <JJWebViewNative
                source={this._buildSource()}
                style={this.props.style}
            />
        )
    }

    _buildSource = () => {
        let headers = {};
        const urlParams = {};

        if (StringUtil.isEmpty(this.props.url)) {
            return {
                url: 'https://jamja.vn',
                headers: {},
                disableRefresh: this.props.disableRefresh,
                instanceId: this.props.instanceId
            };
        }

        if (this.props.url.indexOf('jamja.vn') < 0 || this.props.url.indexOf('jamja.vn') > 24) {
            return {
                url: this.props.url,
                headers: {
                    Cookie: "jj=empty;",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Set-Cookie, Access-Control-Allow-Credentials, Access-Control-Allow-Origin",
                },
                disableRefresh: this.props.disableRefresh,
                instanceId: this.props.instanceId
            };
        }

        urlParams.inApp = 1;

        const token = encodeURIComponent(fetcherConfig.getHeaders().Authorization);
        try {
            headers = {
                'User-Agent': UserAgent,
                Authorization: fetcherConfig.getHeaders().Authorization,
                AppVersion: APPVERSION,
                acversion: APPVERSION,
                Cookie: "jj=empty;",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Set-Cookie, Access-Control-Allow-Credentials, Access-Control-Allow-Origin",
                uuid: fetcherConfig.getUUIDToConfig(),
                client_id: ios ? '6NxzSGpuzBls5YuFLv5Ws69Oxie2VQ1LPTb00hgy':'8uG7QrxY4xrCwBL0xXDYwf6cGLpmP39nuTIuAGkq',
                clientType: Platform.OS,
                acs: fetcherConfig.getTrackingConfig().acs,
                drs: fetcherConfig.getTrackingConfig().drs
            };
        } catch (e) {
            console.log(e);
        }
        try {
            if (!!token) {
                urlParams['user'] = token;
            }
            const location = fetcherConfig.getLocation();
            if (!!location && !!location.latitude) {
                urlParams['lat'] = location.latitude;
                urlParams['lon'] = location.longitude;
            }
            if (!!fetcherConfig.getProvince()) {
                urlParams['province'] = fetcherConfig.getProvince();
                urlParams['location'] = fetcherConfig.getProvince();
            }
        } catch (e) {
            console.log(e);
        }

        return {
            url: StringUtil.addParamsToUrl(this.props.url, urlParams),
            headers: headers,
            disableRefresh: this.props.disableRefresh,
            instanceId: this.props.instanceId
        };
    }
}

JJWebView.propTypes = {
    source: PropTypes.any,//ignore to pass this props
    url: PropTypes.any,
    style: PropTypes.any,
    disableRefresh: PropTypes.any,
    instanceId: PropTypes.any
}

const JJWebViewNative = requireNativeComponent(`JJWebView`, ios ? JJWebView : undefined);

module.exports = JJWebView;