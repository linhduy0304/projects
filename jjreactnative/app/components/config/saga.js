import { call, put, take } from "redux-saga/effects";
import QueryString from "query-string";

import {
    UPDATE_CAMPAIGN_SOURCE_FROM_NOF_DATA,
    UPDATE_CAMPAIGN_SOURCE,
    UPDATE_FIRST_CAMPAIGN_SOURCE,
} from "./action";
import {StringUtil} from '../../utils/string-util'
import {fetcherConfig} from '../../api/fetcher'
import {ConfigDb} from '../../api/storage/ConfigDb'
import {ObjectUtil} from '../../utils/object-utils'
import {RealmDbHelper} from '../../api/storage/RealmDbHelper'

function* updateCampaignSource(url_query) {
    try {
        console.log('updateCampaignSource', url_query);
        if (StringUtil.isEmpty(url_query)) return;
        let link = url_query;
        if (typeof url_query === 'string') {
            link = QueryString.parseUrl(url);
            if (!!link) link = link.query;
        }

        console.log('updateCampaignSource_1', link);

        if (!link) return;

        const utm_campaign = link.utm_campaign;

        console.log('updateCampaignSource_2', utm_campaign);

        if (StringUtil.isEmpty(utm_campaign)) return;

        const tracking = RealmDbHelper.copyObjectFromRealm(ConfigDb.getTrackingConfig());

        let firstSource = tracking.first_campaign;

        if (StringUtil.isEmpty(firstSource)) {
            if (StringUtil.isEmpty(tracking.last_source)) tracking.first_campaign = 'direct';
            else tracking.first_campaign = utm_campaign;
        }

        tracking.last_campaign = ObjectUtil.getValue(link, 'direct', ['utm_campaign']);
        tracking.last_source = ObjectUtil.getValue(link, 'not_set', ['utm_source']);
        tracking.last_medium = ObjectUtil.getValue(link, 'not_set', ['utm_medium']);
        tracking.last_term = ObjectUtil.getValue(link, 'not_set', ['utm_term']);
        tracking.last_content = ObjectUtil.getValue(link, 'not_set', ['utm_content']);

        ConfigDb.updateTrackingConfig(tracking);

        fetcherConfig.setTrackingConfig(() => {
            return { acs: tracking.first_campaign, drs: tracking.last_campaign };
        });

    } catch (e) {
        console.log(e);
    }
}

export function* watchUpdateCampaignSourceAction() {
    while (true) {
        const {url_query} = yield take(UPDATE_CAMPAIGN_SOURCE);
        yield call(updateCampaignSource, url_query);
    }
}

function* updateCampaignSourceFromNofData(data) {
    try {
        console.log('updateCampaignSourceFromNofData', data);
        if (StringUtil.isEmpty(data) || StringUtil.isEmpty(data.utm_campaign)) return;

        const tracking = RealmDbHelper.copyObjectFromRealm(ConfigDb.getTrackingConfig());

        if (StringUtil.isEmpty(tracking.first_campaign)) tracking.first_campaign = 'direct';
        tracking.last_campaign = data.utm_campaign;
        tracking.last_source = ObjectUtil.getValue(data, 'not_set', ['utm_source']);
        tracking.last_medium = ObjectUtil.getValue(data, 'not_set', ['utm_medium']);
        tracking.last_term = ObjectUtil.getValue(data, 'not_set', ['utm_term']);
        tracking.last_content = ObjectUtil.getValue(data, 'not_set', ['utm_content']);

        ConfigDb.updateTrackingConfig(tracking);

        fetcherConfig.setTrackingConfig(() => {
            return { acs: tracking.first_campaign, drs: tracking.last_campaign };
        });

    } catch (e) {
        console.log(e);
    }
}

export function* watchUpdateCampaignSourceFromNofDataAction() {
    while (true) {
        const {data} = yield take(UPDATE_CAMPAIGN_SOURCE_FROM_NOF_DATA);
        yield call(updateCampaignSourceFromNofData, data);
    }
}

function* updateFirstCampaignSource() {
    try {
        const tracking = ConfigDb.getTrackingConfig();
        if (StringUtil.isEmpty(tracking.first_campaign)) {
            ConfigDb.updateTrackingSource('direct', tracking.last_campaign);
        }
    } catch (e) {
        console.log(e);
    }
}

export function* watchUpdateFirstCampaignSourceAction() {
    while (true) {
        yield take(UPDATE_FIRST_CAMPAIGN_SOURCE);
        yield call(updateFirstCampaignSource);
    }
}