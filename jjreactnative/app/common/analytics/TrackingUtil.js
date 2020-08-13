import {Map} from 'immutable';
import {ObjectUtil} from '../../utils/object-utils';

function _getSource(query) {
    try {
        if (!query) return 'not_set';
        if (!!query.source) return query.source;
        if (!!query.utm_source) return query.utm_source;
    }
    catch (e) {
        console.log(e);
    }
    return 'not_set';
}

function _getMedium(query) {
    try {
        if (!query) return 'not_set';
        if (!!query.utm_medium) return query.utm_medium;
    }
    catch (e) {
        console.log(e);
    }
    return 'not_set';
}

function _getCampaign(query) {
    try {
        if (!query) return 'not_set';
        if (!!query.utm_campaign) return query.utm_campaign;
    }
    catch (e) {
        console.log(e);
    }
    return 'not_set';
}

function _getTerm(query) {
    try {
        if (!query) return 'not_set';
        if (!!query.utm_term) return query.utm_term;
    }
    catch (e) {
        console.log(e);
    }
    return 'not_set';
}

function _getContent(query) {
    try {
        if (!query) return 'not_set';
        if (!!query.utm_content) return query.utm_content;
    }
    catch (e) {
        console.log(e);
    }
    return 'not_set';
}

function _getInternal(query, internalDefault) {
    try {
        if (!query) return !!internalDefault ? internalDefault : 'not_set';
        if (!!query.source) return query.source;
        if (!!query.utm_source) return query.utm_source;
    }
    catch (e) {
        console.log(e);
    }
    return !!internalDefault ? internalDefault : 'not_set';
}

export function getTrackingParams(data, internalDefault) {
    try {

        const params = {};

        const source = _getSource(data);
        if (source !== 'not_set') params.utm_source = source;

        const medium = _getMedium(data);
        if (medium !== 'not_set') params.utm_medium = medium;

        const campaign = _getCampaign(data);
        if (campaign !== 'not_set') params.utm_campaign = campaign;

        const term = _getTerm(data);
        if (term !== 'not_set') params.utm_term = term;

        const content = _getContent(data);
        if (content !== 'not_set') params.utm_content = content;

        const internal = _getInternal(data, internalDefault);
        if (internal !== 'not_set') params.internal = internal;

        return params;
    }
    catch (e) {
        console.log(e);
    }
    return {};
}

export function getScreenTrackingParams(screen, lastScreen, data) {
    try {
        let trackingParams = getTrackingParams(data, !!lastScreen ? lastScreen : 'not_set');

        if (!!data) {
            if (!!data.id) {
                trackingParams.id = data.id;
            }

            if (!!data.did) {
                trackingParams.did = data.did;
            }

            if (!!data.slug) {
                trackingParams.slug = data.slug;
            }

            if (!!data.cslug) {
                trackingParams.slug = data.cslug;
            }

            if (!!data.screenType) {
                trackingParams.screen_type = data.screenType;
            }

            if (!!data.title) {
                trackingParams.title = data.title;
            }

            if (!!data.source_deal_detail) {
                trackingParams.source_deal_detail = data.source_deal_detail;
            }

            if (!!data.name) {
                trackingParams.name = data.name;
            }

            if (!!data.tags) {
                trackingParams.tags = data.tags;
            }

            if (!!data.deal) {
                let deal = data.deal;
                if (Map.isMap(data.deal)) {
                    deal = data.deal.toJS();
                }

                if (!!deal.slug) {
                    trackingParams.item_id = deal.slug;
                }

                trackingParams.item_brand =  ObjectUtil.getValue(deal, undefined, ['brand', 'brand_slug']);
                if (!trackingParams.item_brand) delete trackingParams.item_brand;

                if (!!deal.deal_type) {
                    trackingParams.item_category =  deal.deal_type;
                    trackingParams.deal_type = deal.deal_type;
                }
            }
        }

        if (!!screen) {
            trackingParams.screen_name = screen;
        }

        if (!!lastScreen) {
            trackingParams.previous_screen = lastScreen;
        }

        return trackingParams;
    }
    catch (e) {
        console.log(e);
    }
    return {};
}