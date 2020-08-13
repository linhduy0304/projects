import React from 'react';
import {Linking} from "react-native";

import {NativeCommon} from './NativeCommon';
import QueryString from "query-string";
import {StringUtil} from "../../utils/string-util";
import {AnalyticsUtil} from "../../components/common/analytics/analytics";
import {updateCampaignSource} from "../../components/config/action";
import {DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../../const";
import {getTrackingParams} from '../analytics/TrackingUtil'
import NavigationService from '../../router/NavigationService';
import {ObjectUtil} from '../../utils/object-utils';

export default class CommonHandler {

    navigation;
    dispatch;
    onDetected;

    constructor(navigation, dispatch) {
        this.navigation = navigation;
        this.dispatch = dispatch;
    }

    create = () => {
        try {
            NativeCommon.addListener(this._handleNativeDispatch);
        } catch (e) {
            console.log(e);
        }
    }

    setDetectedTrigger = callback => {
        this.onDetected = callback;
    }

    destroy = () => {
        try {
            NativeCommon.removeListener(this._handleNativeDispatch);
        } catch (e) {
            console.log(e);
        }
    }

    openDealDetailFromPush = data => {
        try {
            if (!this.navigation) return;

            const slug = data.slug;

            if (StringUtil.isEmpty(slug)) return;

            const params = {
                slug: slug,
                ...getTrackingParams(data, 'push')
            };

            this.navigation.push('DealDetail', params);
            this._trackOpenNotification('open_deal_detail', params);
        }
        catch (e) {
            console.log(e);
        }
    }

    openCollectionDetailFromPush = data => {
        try {
            if (!this.navigation) return;

            const slug = data.slug;

            if (StringUtil.isEmpty(slug)) return;

            const params = {
                cslug: slug,
                ...getTrackingParams(data, 'push')
            };

            this.navigation.push('CollectionDetail', params);
            this._trackOpenNotification('open_collection_detail', params);

        }
        catch (e) {
            console.log(e);
        }
    }

    openCouponDetailFromPush = data => {
        try {
            if (!this.navigation) return;

            const coupon_id = data.coupon_id;
            const deal_type = data.deal_type;

            if (StringUtil.isEmpty(coupon_id) || StringUtil.isEmpty(deal_type)) return;

            const params = {
                couponId: coupon_id,
                ...getTrackingParams(data, 'push')
            };

            this._checkToOpenCouponDetail(coupon_id, deal_type, params, data);
        }
        catch (e) {
            console.log(e);
        }
    }

    openCommentFromPush = data => {
        try {
            if (!this.navigation) return;

            const pid = data.pid;
            const did = data.did;
            const dealSlug = data.deal_slug;

            if (StringUtil.isEmpty(pid) || StringUtil.isEmpty(did)) return;

            const params = {
                did: did,
                nofData: {
                    pid,
                    did
                },
                ...getTrackingParams(data, 'push')
            };

            if (!!dealSlug) {
                params.nofData.deal_slug = dealSlug;
            }

            this.navigation.push('AllComments', params);

            this._trackOpenNotification('open_comment_detail', params);
        }
        catch (e) {
            console.log(e);
        }
    }

    _trackOpenNotification = (action, data) => {
        try {
            if (StringUtil.isEmpty(action)) return;

            const params = {
                action,
                ...data
            };

            AnalyticsUtil.logNormalEvent('jj_open_notification', params, 'notification');

            this.dispatch(updateCampaignSource(params));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Start handle deep link and action after that
     * @param result
     * @returns {*}
     * @private
     */

    _handleNativeDispatch = (result) => {
        console.log('_handleNativeDispatch:result:', result);
        !!this.onDetected && this.onDetected();
        if (!result || !result.action) return;

        const link = QueryString.parseUrl(result.url);

        console.log('_handleNativeDispatch:query: ', link);

        switch (result.action) {
            case 'open_deal_detail':
                return this._openDealDetail(result, link);
            case 'open_collection_list':
                return this._openCollectionList(result, link);
            case 'open_exclusive_category':
                return this._openExclusiveCategory(result, link);
            case 'open_ecoupon_category':
                return this._openEcouponCategory(result, link);
            case 'open_collection_detail':
                return this._openCollectionDetail(result, link);
            case 'open_brand_detail':
                return this._openBrandDetail(result, link);
            case 'open_category':
                return this._openCategoryPage(result, link);
            case 'open_web_view':
                return this._openInAppWebView(result, link);
            case 'open_game':
                return this._openGame(result, link);
            case 'open_coupon_detail':
                return this._openCouponDetailFromUrl(result, link);
        }
    }

    _openDealDetail = (result, link) => {
        if (!this.navigation) return;
        try {
            const slug = result.slug;
            if (StringUtil.isEmpty(slug)) return;

            const params = {
                slug: slug,
                ...getTrackingParams(link.query, 'deep_link')

            };

            this.navigation.push('DealDetail', params);

            this._trackOpenLink('open_deal_detail', params);

        } catch (e) {
            console.log(e);
        }
    }

    _openExclusiveCategory = (result, link) => {
        if (!this.navigation) return;
        try {

            const params = {
                screenType: 'doc-quyen',
                title: 'Độc quyền tại JAMJA',
                ...getTrackingParams(link.query, 'deep_link')
            };

            this.navigation.push('SubCategory', params);
            this._trackOpenLink('open_category', link);
        } catch (e) {
            console.log(e);
        }
    }

    _openEcouponCategory = (result, link) => {
        if (!this.navigation) return;
        try {
            const params = {
                screenType: 'ma-giam-gia',
                title: 'Mua Online',
                ...getTrackingParams(link.query, 'deep_link')
            };

            this.navigation.push('SubCategory', params);
            this._trackOpenLink('open_category', params);
        } catch (e) {
            console.log(e);
        }
    }

    _openCollectionList = (result, link) => {
        if (!this.navigation) return;
        try {
            const params = {
                ...getTrackingParams(link.query, 'deep_link')
            };

            this.navigation.push('Collections', params);
            this._trackOpenLink('open_collection_list', params);
        } catch (e) {
            console.log(e);
        }
    }

    _openCollectionDetail = (result, link) => {
        if (!this.navigation) return;
        try {
            const params = {
                cslug: result.slug,
                ...getTrackingParams(link.query, 'deep_link')
            };

            this.navigation.push('CollectionDetail', params);
            this._trackOpenLink('open_collection_detail', params);
        } catch (e) {
            console.log(e);
        }
    }

    _openBrandDetail = (result, link) => {
        if (!this.navigation) return;
        try {
            const params = {
                slug: result.slug,
                ...getTrackingParams(link.query, 'deep_link')
            };

            this.navigation.push('BrandDetail', params);
            this._trackOpenLink('open_brand_detail', params);
        } catch (e) {
            console.log(e);
        }
    }

    _openCategoryPage = (result, link) => {
        if (!this.navigation) return;
        try {
            const screen_type = link.query.screen_type;
            const title = link.query.title;
            let detail_tag = link.query.detail_tag;
            try {
                detail_tag = JSON.parse(detail_tag);
            } catch (e) {
                console.log(e);
            }

            console.log('--------------dat-cho', title, screen_type, detail_tag);

            if (!StringUtil.isEmpty(screen_type)) {

                const params = {
                    screenType: screen_type,
                    title: title,
                    ...getTrackingParams(link.query, 'deep_link')
                };

                this.navigation.push(
                    'SubCategory',
                    {
                        ...params,
                        detailTag: detail_tag,
                    });

                this._trackOpenLink('open_category', params);
            }
        } catch (e) {
            console.log(e);
        }
    }

    _openInAppWebView = (result, link) => {
        if (!this.navigation) return;
        try {
            if (result.url.indexOf('https://itunes.apple.com') >= 0 ||
                result.url.indexOf('https://play.google.com') >= 0
            ) {
                Linking.canOpenURL(result.url).then(supported => {
                    if (supported) {
                        Linking.openURL(result.url);
                    } else {
                        console.log("Not supported");
                        const params = {
                            url: result.url,
                            ...getTrackingParams(link.query, 'deep_link')
                        };
                        this.navigation.push('InAppWebView', params);
                        this._trackOpenLink('open_web_view', params);
                    }
                });
                return;
            }
            const params = {
                url: result.url,
                ...getTrackingParams(link.query, 'deep_link')
            };
            this.navigation.push('InAppWebView', params);
            this._trackOpenLink('open_web_view', params);
        } catch (e) {
            console.log(e);
        }
    }

    _openGame = (result, link) => {
        if (!this.navigation) return;
        try {
            const params = {
                ...getTrackingParams(link.query, 'deep_link')
            };
            this.navigation.navigate('Campaign11Game', {...params, referral: link.query});
            this._trackOpenLink('open_game', params);
        } catch (e) {
            console.log(e);
        }
    }

    _openCouponDetailFromUrl = (result, link) => {
        try {
            if (!this.navigation) return;

            const coupon_id = link.query.coupon_id;
            const deal_type = link.query.deal_type;

            if (StringUtil.isEmpty(coupon_id) || StringUtil.isEmpty(deal_type)) return;

            const params = {
                couponId: coupon_id,
                ...getTrackingParams(link.query, 'deep_link')
            };

            this._checkToOpenCouponDetail(coupon_id, deal_type, params, link.query);
        }
        catch (e) {
            console.log(e);
        }
    }

    _openCouponDetail = (deal_type, params) => {
        if (deal_type === DEAL_TYPE_EXCLUSIVE) {
            this.navigation.push('ExclusiveReservationInfo', params);
        }
        else if (deal_type === DEAL_TYPE_LAST_MIN) {
            this.navigation.push('LastMinReservationInfo', params);
        }
        else if (deal_type === DEAL_TYPE_MOVIE) {
            this.navigation.push('MovieReservationInfo', params);
        }
    }

    _openDeliveryStatus = (shipping_order_id, params) => {
        params.shipping_order_id = shipping_order_id;
        this.navigation.push('DeliveryStatus', params);
    }

    _checkToOpenCouponDetail = (couponId, dealType, params, data) => {
        try {
            let currentRoutes;
            const shippingOrderId = data.shipping_order_id;
            const shippingStatus = data.shipping_status;
            let hasLastDeliveryStatusRoute = false;

            // Find DeliveryStatus route to open it
            if (!!shippingOrderId) {
                currentRoutes = NavigationService.findRoute('DeliveryStatus', {shipping_order_id: shippingOrderId});

                // Refresh DeliveryStatus screen if have and check the latest of route
                if (!!currentRoutes && currentRoutes.length > 0) {
                    currentRoutes.map(r => {
                        if (!r) return;
                        ObjectUtil.getValue(r, {onAction: () => {}}, ['params']).onAction('refresh');
                        hasLastDeliveryStatusRoute = !!r.isLast;
                    });
                }

                // Open DeliveryStatus if need
                if (!hasLastDeliveryStatusRoute && shippingStatus !== 'user_cancel') {
                    this._openDeliveryStatus(shippingOrderId, params);
                    hasLastDeliveryStatusRoute = true;
                }
            }

            // Find reservation info route
            currentRoutes = NavigationService.findRoute('ReservationInfo', {couponId});

            if (!currentRoutes || currentRoutes.length < 1) {
                // Open coupon detail if need
                if (!hasLastDeliveryStatusRoute) this._openCouponDetail(dealType, params);
                return;
            }

            let hasLastReservationRoute = false;
            currentRoutes.map(r => {
                ObjectUtil.getValue(r, {onAction: () => {}}, ['params']).onAction('refresh');
                hasLastReservationRoute = !!r.isLast;
            });

            if (!hasLastReservationRoute && !hasLastDeliveryStatusRoute) {
                this._openCouponDetail(dealType, params);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    _trackOpenLink = (action, data) => {
        try {
            if (StringUtil.isEmpty(action)) return;

            const params = {
                action,
                ...data
            };

            AnalyticsUtil.logNormalEvent('deep_link', params, 'deep_link');

            this.dispatch(updateCampaignSource(params));
        } catch (e) {
            console.log(e);
        }
    }
}