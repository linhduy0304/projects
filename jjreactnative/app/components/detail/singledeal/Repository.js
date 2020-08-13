import React from 'react';
import { Map, fromJS } from 'immutable';
import { Clipboard } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import { BasePureComponent } from '../../common/BasePureComponent';
import { commonApi } from '../../../api/common-api';
import { storeApi } from '../../../api/store-api';
import { commentApi } from '../../../api/comment-api';
import { collectionApi } from '../../../api/collection-api';
import { dealApi } from '../../../api/deal-api';
import { calculateDistance } from '../../../utils/LocationUtils';
import {
    DEAL_TYPE_EXCLUSIVE,
    DEAL_TYPE_LAST_MIN,
    STATUS_MERCHANT_ACCEPTED,
    STATUS_REDEEMED,
    STATUS_WAIT_FOR_MERCHANT,
    DEAL_TYPE_MOVIE
} from '../../../const';
import { ObjectUtil } from '../../../utils/object-utils';
import { StringUtil } from '../../../utils/string-util';
import { AnalyticsUtil } from '../../common/analytics/analytics';
import { Toast } from '../../common/alert/Toast';
import BookingRepo, { TimeBaseStatus } from './repo/BookingRepo';
import { checkInDeal, dislikeDeal, followBrand, likeDeal, saveDeal, shareDeal } from '../action';
import { Alert } from '../../common/alert/JJAlert';
import { ConfigDb } from '../../../api/storage/ConfigDb';
import { bookingApi } from '../../../api/booking-api';
import { DealSubject } from '../../../common/subject/deal-subject';
moment.locale('vi');

export const DATA = {
    DEAL: 'deal',
    NEAREST_STORE: 'nearestStore',
    PRODUCT: 'product',
    COMMENT: 'comment',
    COLLECTION: 'collection',
    TIMEBASE_BOOKING: 'timebaseBooking',
    FLASH_SALE: 'flashSale'
};

export const VIEW_TYPE = {
    IMAGE_DEAL: 'image_deal',
    SOCIAL: 'social_action',
    CTA: 'cta',
    BRAND_INFO: 'brand_info',
    APPLY_CONDITION: 'apply_condition',
    SHARE: 'share_action',
    MENU: 'menu',
    PRODUCT: 'product',
    LOCATION: 'location',
    ARTICLE: 'article',
    RATING: 'rating',
    COMMENT: 'comment',
    COLLECTION: 'collection',
    EXCLUSIVE: 'exclusive',
    RELATED_HEADER: 'related_header',
    DEAL: 'deal'
};

const VIEW_TYPE_VALUES = Object.values(VIEW_TYPE);

export default class Repository extends BasePureComponent {
    bookingRepo: BookingRepo;

    listener = {
        onDateChangeListener: (...props) => this._onDateChangeListener(...props),
        onSlotChangeListener: (...props) => this._onSlotChangeListener(...props),
        onTimeChangeListener: (...props) => this._onTimeChangeListener(...props),
        onStoreChangeListener: (...props) => this._onStoreChangeListener(...props),
        onApplyPromoCodeClicked: (...props) => this._onApplyPromoCodeClicked(...props),
        openPromoCodeDetail: (...props) => this._openPromoCodeDetail(...props),
        onPromoCodeDetailListener: (...props) => this._onPromoCodeDetailListener(...props),
        onClearPromoCodeInput: () => this._onClearPromoCodeInput(),
        onClearPromoCodeApplied: () => this._onClearPromoCodeApplied(),
        onPromoCodeInputChanged: (...props) => this._onPromoCodeChanged(...props),
        onCommentAdded: (...props) => this._onCommentChanged(...props),
        onCommentDeleted: (...props) => this._onCommentChanged(...props),
        onCommentEdited: (...props) => this._onCommentChanged(...props),
        onGetCodeClicked: (...props) => this._onGetCodeClicked(...props),
        onScrollToCTARequest: () => this._onScrollToCTARequest(),
        onClosePopoverChangeDateButton: () => this._onClosePopoverChangeDateButton(),
        onTimeOutFlashSaleCountDown: () => this._onTimeOutFlashSaleCountDown()
    };

    constructor(props, context) {
        super(props, context);

        let data = fromJS({
            isRefreshing: true,
            firstLoading: true,
            needPlaceholder: true
        });

        if (!!props.deal) {
            data = data.updateIn([DATA.DEAL], () => fromJS(props.deal));
            data = data.updateIn(['sections'], () => fromJS([]));
        }

        this.state = { data };
    }

    _startInit = () => {
        this.setState(
            {
                isRefreshing: true,
                isLoading: true,
                isFail: false,
                firstLoading: true,
                isResetting: true,
                brandId: undefined,
                showBottomCTA: false,
                needPlaceholder: true
            },
            this._refreshData
        );
    };

    _addSectionData = (type, data, rs) => {
        return new Promise(resolve => {
            if (!this.mounted) {
                resolve(true);
                return;
            }

            let sections = !!rs && !!rs.findIndex ? rs : this.state.data.get('sections');
            if (!sections) sections = fromJS([]);

            if (type === VIEW_TYPE.DEAL) {
                if (!data) {
                    resolve(true);
                    return;
                }

                const indexOfDealSection = sections.findIndex(
                    (section, index) => section.get('type') === type && section.getIn(['data', 'id']) === data.id
                );
                if (indexOfDealSection < 0) {
                    sections = sections.push(
                        fromJS({
                            type: VIEW_TYPE.DEAL,
                            data: data
                        })
                    );
                } else {
                    sections = sections.update(indexOfDealSection, section => section.updateIn(['data'], () => fromJS(data)));
                }
                this.setState(
                    {
                        ...this.state,
                        data: this.state.data.updateIn(['sections'], () => sections)
                    },
                    resolve
                );
                return;
            }

            const foundIndex = sections.findIndex((section, i) => section.get('type') === type);

            if (foundIndex >= 0) {
                resolve(true);
                return;
            }

            const typeIndexInList = VIEW_TYPE_VALUES.indexOf(type);

            let previousIndex = sections.findLastIndex((section, i) => {
                for (let index = typeIndexInList - 1; index >= 0; index--) {
                    if (VIEW_TYPE_VALUES[index] === section.get('type')) return true;
                }
                return false;
            });

            const item = fromJS({ type });

            if (previousIndex < 0) {
                sections = sections.push(item);
            } else {
                const sec1 = sections.filter((sec, i) => i <= previousIndex);
                const sec2 = sections.filter((sec, i) => i > previousIndex);

                sections = sec1.push(item).push(...sec2);
            }

            this.setState(
                {
                    ...this.state,
                    data: this.state.data.updateIn(['sections'], () => sections)
                },
                () => resolve(sections)
            );
        });
    };

    _refreshData = () => {
        this._fetchDealDetail();
    };

    _fetchDealDetail = () => {
        dealApi
            .getDealDetail(this.props.slug)
            .then(response => {
                if (!this.mounted) return;

                console.log('getDealDetail:success:', response);
                if (!!response.stores) {
                    if (!!this.props.latitude) {
                        response.stores.map(store => {
                            store['distance'] = calculateDistance(store.latitude, store.longitude, this.props.latitude, this.props.longitude);
                        });
                        response.stores.sort(function(a, b) {
                            return a.distance - b.distance;
                        });
                    } else {
                        response.stores.sort(function(a, b) {
                            if (!a.address || !b.address) return 1;
                            return (a.address + '').localeCompare(b.address);
                            //
                            // if(a.address < b.address) return -1;
                            // if(a.address > b.address) return 1;
                            // return 0;
                        });
                    }
                }

                if (response.stores === undefined) response.stores = [];

                response.comment_count = 0;

                if (!!this.props.onUpdateData) this.props.onUpdateData('deal_url', response.deal_url);

                return response;
            })
            .then(response => {
                this._prepareDealDetailData(fromJS(response));
            })
            .catch(error => {
                console.log('getDealDetail:error:', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isLoading: false,
                    isFail: true,
                    firstLoading: false
                });
            });
    };

    _prepareDealDetailData = dealMap => {
        if (!dealMap) return;
        let data;
        if (this.state.data === undefined) {
            this.state.data = Map({});
        }
        if (!Map.isMap(dealMap)) {
            dealMap = fromJS(dealMap);
        }

        data = this.state.data.updateIn([DATA.DEAL], () => dealMap);

        let brandId = dealMap.getIn(['brand', 'id']);
        this.setState(
            {
                ...this.state,
                data,
                brandId,
                isRefreshing: false,
                isLoading: false,
                isFail: false,
                firstLoading: false,
                needPlaceholder: false
            },
            () => {
                const deal = this.state.data.get(DATA.DEAL);

                if (!!this.props.onUpdateData) {
                    this.props.onUpdateData('view_visibility', {
                        deal_slug: deal.get('slug')
                    });
                }

                let promise = this._addSectionData(VIEW_TYPE.IMAGE_DEAL)
                    .then(rs => {
                        return this._addSectionData(VIEW_TYPE.SOCIAL, undefined, rs);
                    })
                    .then(rs => this._addSectionData(VIEW_TYPE.CTA))
                    .then(rs => this._addSectionData(VIEW_TYPE.BRAND_INFO))
                    .then(rs => this._addSectionData(VIEW_TYPE.APPLY_CONDITION))
                    .then(rs => this._addSectionData(VIEW_TYPE.SHARE));

                if (
                    !StringUtil.isEmpty(deal.get('article')) ||
                    !StringUtil.isEmpty(deal.get('bestpriceguarantee')) ||
                    !StringUtil.isEmpty(deal.get('getredeemcodeinstruction'))
                ) {
                    promise.then(rs => this._addSectionData(VIEW_TYPE.ARTICLE));
                }

                if (deal.get('average_rate_value', 0) > 0) {
                    promise.then(rs => this._addSectionData(VIEW_TYPE.RATING));
                }

                promise
                    .then(rs => this._addSectionData(VIEW_TYPE.EXCLUSIVE))
                    .then(rs => {
                        if (this.state.isResetting) this._fetchNearestStoreDetail();
                        this._initTimebaseBookingData();
                    });
            }
        );
    };

    _fetchNearestStoreDetail = () => {
        const stores = this.state.data.getIn([DATA.DEAL, 'stores']);
        if (stores && stores.size > 0) {
            storeApi
                .getStoreDetail(stores.get(0).get('id', ''))
                .then(response => {
                    console.log('getStoreDetail:response:', response);
                    if (!!this.props.latitude) {
                        response['distance'] = calculateDistance(response.latitude, response.longitude, this.props.latitude, this.props.longitude);
                    }
                    return response;
                })
                .then(response => {
                    let data = this.state.data.updateIn([DATA.NEAREST_STORE], () => fromJS(response || {}));
                    this.setState(
                        {
                            ...this.state,
                            data
                        },
                        () => {
                            let promise = this._addSectionData(VIEW_TYPE.LOCATION);

                            const menu = this.state.data.getIn([DATA.NEAREST_STORE, 'menu_images']);

                            if (!!menu && menu.size > 0) {
                                promise.then(rs => this._addSectionData(VIEW_TYPE.MENU));
                            }
                        }
                    );

                    if (this.state.isResetting) this._fetchProductList();
                })
                .catch(error => {
                    console.log('getStoreDetail:error:', error);
                    if (this.state.isResetting) this._fetchProductList();
                });
        } else {
            if (this.state.isResetting) this._fetchProductList();
        }
    };

    _fetchProductList = () => {
        if (this.state.data.getIn([DATA.DEAL, 'product_count'], 0) < 1) {
            if (this.state.isResetting) this._fetchCommentList();
            return;
        }

        commonApi
            .getProductList(this.props.slug, 0, 10)
            .then(response => {
                console.log('getProductList:response:', response);
                if (!response || !response.objects || response.objects.length < 1) {
                    if (this.state.isResetting) this._fetchCommentList();
                    return;
                }

                let data = this.state.data.updateIn([DATA.PRODUCT], () => fromJS(response || {}));
                this.setState(
                    {
                        ...this.state,
                        data
                    },
                    () => {
                        this._addSectionData(VIEW_TYPE.PRODUCT);
                    }
                );

                if (this.state.isResetting) this._fetchCommentList();
            })
            .catch(error => {
                console.log('getProductList:error:', error);
                if (this.state.isResetting) this._fetchCommentList();
            });
    };

    _fetchCommentList = reloadOnlyComment => {
        commentApi
            .getCommentList(this.state.data.getIn([DATA.DEAL, 'id'], ''), undefined, 0, 3)
            .then(response => {
                console.log('getListComment:response:', response);

                let data = this.state.data.updateIn([DATA.COMMENT], () => fromJS(response || {}));
                data = data.updateIn([DATA.DEAL, 'comment_count'], () => data.getIn([DATA.COMMENT, 'meta', 'total_count'], 0));
                this.setState(
                    {
                        ...this.state,
                        data
                    },
                    () => {
                        this._addSectionData(VIEW_TYPE.COMMENT);
                    }
                );

                if (this.state.isResetting && !reloadOnlyComment) this._fetchSameCollectionList();
            })
            .catch(error => {
                console.log('getListComment:error:', error);
                if (this.state.isResetting && !reloadOnlyComment) this._fetchSameCollectionList();
            });
    };

    _fetchSameCollectionList = () => {
        collectionApi
            .getCollectionListByDealSlug(this.props.slug, 0, 20)
            .then(response => {
                console.log('getCollectionListByDealSlug:response:', response);

                if (!response || !response.objects || response.objects.length < 1) {
                    if (this.state.isResetting) this._fetchRelatedDealList();
                    return;
                }

                let data = this.state.data.updateIn([DATA.COLLECTION], () => fromJS(response || {}));
                this.setState(
                    {
                        ...this.state,
                        data
                    },
                    () => {
                        this._addSectionData(VIEW_TYPE.COLLECTION);
                    }
                );

                if (this.state.isResetting) this._fetchRelatedDealList();
            })
            .catch(error => {
                console.log('getCollectionListByDealSlug:error:', error);
                if (this.state.isResetting) this._fetchRelatedDealList();
            });
    };

    _fetchRelatedDealList = () => {
        dealApi
            .getRelatedDeal(this.state.data.getIn([DATA.DEAL, 'id'], ''), 0, 10)
            .then(response => {
                console.log('getRelatedDeal:response:', response);
                this._triggerLoadFinish();

                if (!!response && !!response.objects && response.objects.length > 0) {
                    let promise = this._addSectionData(VIEW_TYPE.RELATED_HEADER, 'CÓ THỂ BẠN QUAN TÂM');

                    response.objects.map((deal, i) => {
                        promise = promise.then(rs => this._addSectionData(VIEW_TYPE.DEAL, deal));
                    });

                    promise.then(rs => {
                        this.setState({
                            ...this.state,
                            isResetting: false
                        });
                    });
                }
            })
            .catch(error => {
                console.log('getRelatedDeal:error:', error);
                this._triggerLoadFinish();
                this.setState({
                    ...this.state,
                    isResetting: false
                });
            });
    };

    _triggerLoadFinish = () => {
        if (!!this.props.isMainView && !!this.props.onUpdateData) this.props.onUpdateData('main_load_finish');
    };

    _initTimebaseBookingData = () => {
        const deal_type = this.state.data.getIn([DATA.DEAL, 'deal_type'], '');
        if (DEAL_TYPE_LAST_MIN === deal_type || DEAL_TYPE_MOVIE === deal_type) {
            if (this.state.data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time'])) return;

            if (this._getBookingRepo().checkBookingScheduleNotGoLiveError(this.state.data)) {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => fromJS({ status: TimeBaseStatus.NOT_GO_LIVE }))
                });
                return;
            }

            const store = this.state.data.getIn([DATA.DEAL, 'stores', 0]);

            if (!store) {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => fromJS({ status: TimeBaseStatus.EMPTY_STORE }))
                });
                return;
            }

            let data = this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'store'], () => store);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.LOADING);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], () => 0);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'date'], () => new Date());
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'dates'], () =>
                fromJS([
                    {
                        time: new Date(),
                        type: 'normal'
                    }
                ])
            );
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'isLoading'], () => true);
            this.setState(
                {
                    ...this.state,
                    data
                },
                () => {
                    if (deal_type === DEAL_TYPE_MOVIE) {
                        this._fetchOrderStatus();
                    }
                    this._fetchBookingSchedule(false);
                }
            );
        }
    };

    /**
     * get timebase booking schedule and prepare data for render view
     * @private
     */
    _fetchBookingSchedule = hasChangeStore => {
        this._getBookingRepo()
            .fetchBookingSchedule(this.state.data, this.props.slug, hasChangeStore)
            .then(result => {
                this._fetchBookingFlashSale(this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => result.get(DATA.TIMEBASE_BOOKING)));
            })
            .catch(error => {
                let timebaseBooking = fromJS({
                    status: TimeBaseStatus.UNKNOWN_ERROR,
                    isLoading: false,
                    selected: {
                        slot: 0,
                        store: this.state.data.getIn([DATA.DEAL, 'stores', 0]),
                        date: new Date(),
                        dates: undefined
                    }
                });

                this._fetchBookingFlashSale(this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => timebaseBooking));
            });
    };

    _fetchBookingFlashSale = data => {
        this._getBookingRepo()
            .fetchBookingFlashSaleSchedule(data, this.props.slug)
            .then(result => {
                console.debug('_fetchBookingFlashSale:response: ', result.toJS());
                if (!!result.get(DATA.FLASH_SALE)) {
                    this.setState({
                        ...this.state,
                        data: this.state.data
                            .updateIn([DATA.FLASH_SALE], () => result.get(DATA.FLASH_SALE))
                            .updateIn([DATA.TIMEBASE_BOOKING], () => result.get(DATA.TIMEBASE_BOOKING))
                    });
                } else {
                    this.setState({
                        ...this.state,
                        data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => result.get(DATA.TIMEBASE_BOOKING)).delete(DATA.FLASH_SALE)
                    });
                }
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => data.get(DATA.TIMEBASE_BOOKING)).delete(DATA.FLASH_SALE)
                });
            });
    };

    _fetchBookedTicket = () => {
        if (!!this.state.data.get('bookedTicket')) {
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['bookedTicket', 'isRefreshing'], () => true)
            });
        }

        bookingApi
            .bhdCheckGetCode(this.state.data.getIn([DATA.DEAL, 'id'], ''))
            .then(response => {
                console.log('_fetchBookedTicket:response: ', response);
                if(response.meta.total_count !== 0) {
                    let data = this.state.data.updateIn(['bookedTicket'], () => fromJS(response));
                    data = data.updateIn(['bookedTicket', 'isRefreshing'], () => false);
                    this.setState({
                        ...this.state,
                        data: data
                    });
                }
          
            })
            .catch(error => {
                console.log('_fetchBookedTicket:error: ', error);
                if (!!this.state.data.get('bookedTicket')) {
                    this.setState({
                        ...this.state,
                        data: this.state.data.updateIn(['bookedTicket', 'isRefreshing'], () => false)
                    });
                }
            });
    };

    _fetchMoreBookedTicket = () => {
        const meta = this.state.data.getIn(['bookedTicket', 'meta']);
        if (!!meta.get('next')) {
            bookingApi
                .bhdCheckGetCode(this.state.data.getIn([DATA.DEAL, 'id'], ''), meta.get('offset', 0) + 12)
                .then(response => {
                    console.log('_fetchBookedTicket:response: ', response);
                    const responseMap = fromJS(response);
                    let data = this.state.data.updateIn(['bookedTicket', 'meta'], () => responseMap.get('meta'));
                    data = data.updateIn(['bookedTicket', 'objects'], () =>
                        data.getIn(['bookedTicket', 'objects']).push(...responseMap.get('objects'))
                    );
                    this.setState({
                        ...this.state,
                        data: data
                    });
                })
                .catch(error => {
                    console.log('_fetchBookedTicket:error: ', error);
                });
        }
    };

    _fetchOrderStatus = () => {
        this._fetchBookedTicket();

        bookingApi
            .getBhdOrderStatus(this.state.data.getIn([DATA.DEAL, 'id'], ''))
            .then(response => {
                console.log('_fetchOrderStatus:response: ', response);
                if (!!response.coupon && !!response.jamja_order && !!response.payment_url) {
                    const baseLogParams = {
                        item_id: this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                        item_brand: this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
                        item_category: DEAL_TYPE_MOVIE,
                        deal_type: DEAL_TYPE_MOVIE
                    };

                    AnalyticsUtil.logNormalEvent('continue_movie_booking', baseLogParams, 'action_coupon');

                    let map = fromJS(response);

                    const booking = Map({
                        time: {
                            id: '',
                            highlight: map.getIn(['jamja_order', 'coupon', 'coupon_highlight'], ''),
                            time: moment
                                .unix(map.getIn(['jamja_order', 'coupon', 'check_in_time']))
                                .utc()
                                .toDate()
                        },
                        store: {
                            id: map.getIn(['jamja_order', 'coupon', 'store', 'id'], ''),
                            address: map.getIn(['jamja_order', 'coupon', 'store', 'store_address'], '')
                        }
                    });

                    console.log(
                        'getBhdOrderStatus:',
                        map.getIn(['coupon', 'check_in_time']),
                        moment.unix(map.getIn(['coupon', 'check_in_time'])),
                        moment(map.getIn(['coupon', 'check_in_time']))
                    );

                    this.props.navigation.push('BhdConfirmBooking', {
                        from: 'deal_detail',
                        deal: this.state.data.get(DATA.DEAL),
                        booking: booking,
                        order: map,
                        time: map.get('time_out', 150)
                    });
                }
            })
            .catch(error => {
                // this._fetchBookedTicket();
                console.log('_fetchOrderStatus:error: ', error);
            });
    };

    _onDateChangeListener = date => {
        console.log('_onDateChangeListener', date);
        AnalyticsUtil.logBookingSelection(
            'Date_Selected',
            this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
            date
        );

        this._getBookingRepo()
            .prepareDataAfterChangeDate(this.state.data, date)
            .then(result => {
                console.log('_onDateChangeListener:result', result.get(DATA.TIMEBASE_BOOKING).toJS());
                this.setState({
                    ...this.state,
                    data: this.state.data
                        .updateIn([DATA.TIMEBASE_BOOKING], () => result.get(DATA.TIMEBASE_BOOKING))
                        .updateIn([DATA.FLASH_SALE], () => result.get(DATA.FLASH_SALE))
                });
            })
            .catch(error => {
                console.log('_onDateChangeListener:error', error);
            });
    };

    _onSlotChangeListener = slot => {
        console.log('_onSlotChangeListener', slot);
        AnalyticsUtil.logBookingSelection(
            'Slot_Selected',
            this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
            slot
        );

        this._getBookingRepo()
            .prepareDataAfterChangeSlot(this.state.data, slot)
            .then(result => {
                this.setState({
                    ...this.state,
                    data: this.state.data
                        .updateIn([DATA.TIMEBASE_BOOKING], () => result.get(DATA.TIMEBASE_BOOKING))
                        .updateIn([DATA.FLASH_SALE], () => result.get(DATA.FLASH_SALE))
                });

                console.log('_onSlotChangeListener:completed', result.toJS());
            })
            .catch(error => {
                console.log('_onSlotChangeListener', error);
            });
    };

    _onTimeChangeListener = time => {
        console.log('_onTimeChangeListener', time.toJS());
        AnalyticsUtil.logBookingSelection(
            'Time_Selected',
            this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
            time.get('time', '')
        );
        this._getBookingRepo()
            .prepareDataAfterChangeTime(this.state.data, time)
            .then(result => {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING], () => result.get(DATA.TIMEBASE_BOOKING))
                });
            })
            .catch(error => {
                console.log('prepare_data_after_change_time:error', error);
            });
    };

    _onStoreChangeListener = store => {
        console.log('_onStoreChangeListener', store);
        AnalyticsUtil.logBookingSelection(
            'Store_Selected',
            this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'slug'], ''),
            this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
            store.id
        );
        let data = this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'store'], () => fromJS(store));
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'isLoading'], () => true);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.LOADING);
        data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);
        this.setState(
            {
                ...this.state,
                data
            },
            () => {
                this._fetchBookingSchedule(true);
            }
        );
    };

    _submitGetCodeAction = type => {
        const dealSlug = this.state.data.getIn([DATA.DEAL, 'slug'], '');
        const brandSlug = this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], '');
        const dealType = this.state.data.getIn([DATA.DEAL, 'deal_type'], '');

        if (DEAL_TYPE_EXCLUSIVE === type) {
            AnalyticsUtil.logOpenGetExclusiveCode(brandSlug, dealSlug, dealType);
            AnalyticsUtil.addToCart(
                this.state.data.getIn([DATA.DEAL, 'title'], ''),
                this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'cat1'], ''),
                this.state.data.getIn([DATA.DEAL, 'cat2'], ''),
                this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
                this.state.data.getIn([DATA.DEAL, 'avg_billing_value'], 0),

                this.state.data.getIn([DATA.DEAL, 'avg_billing_value'], 0),
                1,
                moment
                    .utc(this.state.data.getIn([DATA.DEAL, 'end_valid_time'], ''))
                    .local()
                    .toDate()
            );
            this.props.navigation.navigate('ExclusiveGetCode', { deal: this.state.data.get(DATA.DEAL) });
        } else if (DEAL_TYPE_LAST_MIN === type || DEAL_TYPE_MOVIE === type) {
            if (
                this.state.data.get(DATA.TIMEBASE_BOOKING) === undefined ||
                this.state.data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']) === undefined
            )
                return;

            const baseLogParams = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_category: dealType,
                deal_type: dealType
            };

            let booking = this.state.data.get(DATA.TIMEBASE_BOOKING);
            booking = booking
                .deleteIn(['selected', 'times'])
                .deleteIn(['selected', 'dates'])
                .deleteIn(['selected', 'schedules']);

            if (DEAL_TYPE_MOVIE !== type && this._isErrorPromoCode()) {
                let message = '';
                const promoCodeApplied = this.state.data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);
                if (!promoCodeApplied) {
                    message = '- Mã giảm thêm không đủ điều kiện áp dụng.';
                } else {
                    promoCodeApplied.get('errors', []).map((error, i) => {
                        message += '- ' + error + '\n';
                    });
                }
                message += '\n\nVui lòng xem lại điều kiện hoặc tiếp tục không cần mã giảm thêm.';

                AnalyticsUtil.logNormalEvent('promo_code_prompt_alert', baseLogParams, 'action_coupon');

                Alert.alert(
                    'Lưu ý',
                    message,
                    [
                        {
                            text: 'Điều kiện',
                            onPress: () => {
                                AnalyticsUtil.logNormalEvent('promo_code_prompt_detail', baseLogParams, 'action_coupon');
                                this._openPromoCodeDetail(promoCodeApplied, 'close');
                            }
                        },
                        {
                            text: 'Tiếp tục',
                            onPress: () => {
                                AnalyticsUtil.logNormalEvent('promo_code_prompt_continue', baseLogParams, 'action_coupon');
                                let data = this.state.data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);
                                booking = booking.deleteIn(['selected', 'promocode']);
                                this.setState(
                                    {
                                        ...this.state,
                                        data
                                    },
                                    () => {
                                        this._openConfirmBooking(booking);
                                    }
                                );
                            }
                        }
                    ],
                    { cancelable: true }
                );
                return;
            }

            this._openConfirmBooking(booking);
        }
    };

    _onGetCodeClicked = type => {
        const dealSlug = this.state.data.getIn([DATA.DEAL, 'slug'], '');
        const brandSlug = this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], '');
        const dealType = this.state.data.getIn([DATA.DEAL, 'deal_type'], '');

        const baseLogParams = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_category: dealType,
            deal_type: dealType
        };

        const from = {
            action_location: 'deal_detail',
            action_name: 'click_get_code',
            ...baseLogParams
        };

        let shotDealType = 'lastmin';
        if (type === DEAL_TYPE_EXCLUSIVE) shotDealType = 'exclusive';
        if (type === DEAL_TYPE_MOVIE) shotDealType = 'movie';

        AnalyticsUtil.logNormalEvent(`click_get_code${shotDealType}`, baseLogParams, 'deal_detail');

        if (!this.props.isLoginned) {
            AnalyticsUtil.loginEvent('open_login_screen', from);

            const logInAction = {
                name: `get_code_${shotDealType}`,
                params: baseLogParams,
                category: 'deal_detail'
            };

            this.props.navigation.navigate('Login', {
                from: from,
                action: logInAction
            });
            return;
        }

        this._submitGetCodeAction(type);
    };

    _openConfirmBooking = booking => {
        const dealType = this.state.data.getIn([DATA.DEAL, 'deal_type'], '');

        if (dealType === DEAL_TYPE_MOVIE) {
            AnalyticsUtil.logNormalEvent(
                'movie_booking_open_movie_room',
                {
                    item_id: this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                    item_brand: this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
                    item_category: DEAL_TYPE_MOVIE,
                    deal_type: DEAL_TYPE_MOVIE
                },
                'booking'
            );
            this.props.navigation.navigate('MovieRoom', {
                deal: this.state.data.get(DATA.DEAL),
                booking: booking.get('selected')
            });
        } else {
            AnalyticsUtil.logBookingGoToConfirm(
                this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                dealType,
                {
                    store_id: booking.getIn(['selected', 'store', 'id'], ''),
                    slot: booking.getIn(['selected', 'slot'], -1),
                    time: booking.getIn(['selected', 'time', 'time'], ''),
                    avg_billing_value: this.state.data.getIn([DATA.DEAL, 'avg_billing_value'], 0)
                }
            );

            AnalyticsUtil.addToCart(
                this.state.data.getIn([DATA.DEAL, 'title'], ''),
                this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'cat1'], ''),
                this.state.data.getIn([DATA.DEAL, 'cat2'], ''),
                this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
                this.state.data.getIn([DATA.DEAL, 'avg_billing_value'], 0),

                booking.getIn(['selected', 'slot'], 0) * this.state.data.getIn([DATA.DEAL, 'avg_billing_value'], 0),
                booking.getIn(['selected', 'slot'], -1),
                booking.getIn(['selected', 'time', 'time'], '')
            );

            this.props.navigation.navigate('ConfirmBooking', {
                deal: this.state.data.get(DATA.DEAL),
                booking: booking.get('selected')
            });
        }
    };

    _isErrorPromoCode = () => {
        const promoCodeApplied = this.state.data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);
        if (!promoCodeApplied) return false;
        return !!promoCodeApplied.get('errors') && promoCodeApplied.get('errors').size > 0;
    };

    _onScrollToCTARequest = () => {
        try {
            if (this.scrollView) this.scrollView.scrollToIndex({ animated: true, index: 2 });
        } catch (e) {
            console.log(e);
        }
    };

    /**
     * *************************************** start promo code implementation *************************************
     * @param code
     * @private
     */
    _onApplyPromoCodeClicked = code => {
        code = StringUtil.isBlank(code) ? code : code.trim();
        this.setState({
            ...this.state,
            data: this.state.data
                .updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'isLoading'], () => true)
                .updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'input'], () => code)
        });

        // this._fakePromocodeRequest();

        const trackingParams = {
            action_location: 'deal_detail',
            action_name: 'click_apply_promo_code',
            item_id: this.state.data.getIn([DATA.DEAL, 'slug'], ''),
            item_brand: this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
            deal_type: this.state.data.getIn([DATA.DEAL, 'deal_type'], ''),
            code: code
        };
        AnalyticsUtil.logNormalEvent('promo_code_start_request', trackingParams, 'action_coupon');

        const booking = this.state.data.get(DATA.TIMEBASE_BOOKING);
        commonApi
            .getPromoCodeDetail(
                code,
                this.state.data.getIn([DATA.DEAL, 'id'], ''),
                booking.getIn(['selected', 'store', 'id'], ''),
                moment(booking.getIn(['selected', 'time', 'time'], '')).unix(),
                booking.getIn(['selected', 'slot'], 0)
            )
            .then(response => {
                console.log('getPromoCodeDetail:success', response);
                if (response.error) {
                    AnalyticsUtil.logNormalEvent('promo_code_request_error_code', trackingParams, 'action_coupon');
                    this.setState({
                        ...this.state,
                        data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'isLoading'], () => false)
                    });
                    Alert.alert('Lỗi', response.error, [{ text: 'OK', style: 'cancel' }], { cancelable: true });
                    return;
                }

                const promoCode = fromJS(response);
                let data = this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'isLoading'], () => false);

                if (!promoCode.get('errors') || promoCode.get('errors').size < 1) {
                    AnalyticsUtil.logNormalEvent('promo_code_request_code_success', trackingParams, 'action_coupon');
                    data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode'], () => promoCode);
                } else {
                    AnalyticsUtil.logNormalEvent('promo_code_request_code_error', trackingParams, 'action_coupon');
                }
                this.setState({
                    ...this.state,
                    data
                });

                console.log('getPromoCodeDetail:data', data.toJS());
                this._openPromoCodeDetail(promoCode, 'close');
            })
            .catch(error => {
                console.log('getPromoCodeDetail:error', error);
                AnalyticsUtil.logNormalEvent('promo_code_request_code_error', trackingParams, 'action_coupon');

                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'isLoading'], () => false)
                });
                Alert.alert('Lỗi', 'Mã giảm thêm của bạn đã hết hạn hoặc không hợp lệ!', [{ text: 'OK', style: 'cancel' }], { cancelable: true });
            });
    };

    _openPromoCodeDetail = (promocode, action) => {
        const trackingParams = {
            action_location: 'deal_detail',
            action_name: 'open_promo_code_detail',
            item_id: this.state.data.getIn([DATA.DEAL, 'slug'], ''),
            item_brand: this.state.data.getIn([DATA.DEAL, 'brand', 'brand_slug'], ''),
            deal_type: this.state.data.getIn([DATA.DEAL, 'deal_type'], '')
        };
        AnalyticsUtil.logNormalEvent('open_promo_code_detail', trackingParams, 'action_coupon');
        this.props.navigation.navigate('PromoCodeDetail', {
            promocode: promocode,
            onActionListener: this._onPromoCodeDetailListener,
            action: action
        });
    };

    _onPromoCodeDetailListener = (promocode, action) => {
        if (action === 'copy') {
            if (!this.state.data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode'])) {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'input'], () => promocode.get('code_name', ''))
                });
            }
            Clipboard.setString(promocode.get('code_name', ''));
            Toast.showToast('Đã Copy');
        } else if (action === 'deactive') {
            this.setState({
                ...this.state,
                data: this.state.data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode'])
            });
        }
    };

    //clear promo code input when click into clear button (x)
    _onClearPromoCodeInput = () => {
        this.setState({
            ...this.state,
            data: this.state.data.deleteIn([DATA.TIMEBASE_BOOKING, 'promocode'])
        });
    };

    //clear promo code applied when click into clear button (x)
    _onClearPromoCodeApplied = () => {
        this.setState({
            ...this.state,
            data: this.state.data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']).deleteIn([DATA.TIMEBASE_BOOKING, 'promocode'])
        });
    };

    _onPromoCodeChanged = promoCode => {
        this.setState({
            ...this.state,
            data: this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'promocode', 'input'], () => promoCode)
        });
    };
    /**
     * *************************************** end promo code implementation ***************************************
     */

    /**
     * comment
     */
    _onCommentChanged = () => {
        this._fetchCommentList(true);
    };

    _onScrollHandle = info => {
        const promise = new Promise((resolve, reject) => {
            if (info && info.viewableItems && info.viewableItems.length > 1) {
                resolve(
                    info.viewableItems.filter((v, i) => {
                        return !!v.item && Map.isMap(v.item) && v.item.get('type') === VIEW_TYPE.CTA;
                    })
                );
                return;
            }
            reject(true);
        });
        promise
            .then(result => {
                if (!this.mounted) return;

                if (result.length > 0) {
                    if (this.state.showBottomCTA) this._startHideBottomCTAButton();
                } else {
                    if (!this.state.showBottomCTA) this._startShowBottomCTAButton();
                }
            })
            .catch(error => {
                console.log('_onScrollHandle', error);
            });
    };

    _onCouponDataChanged = coupon => {
        if (!coupon) return;
        const couponDataChange = this.props.couponDataChange;
        if(!!couponDataChange &&
            coupon.get('id') === couponDataChange.getIn(['coupon', 'id']) &&
            coupon.get('status') === couponDataChange.getIn(['coupon', 'status'])
        ) return;

        let data = this.state.data;
        if (!data) return;

        if (data.getIn([DATA.DEAL, 'id']) !== coupon.getIn(['deal', 'id'])) return;

        if (coupon.get('status') === STATUS_MERCHANT_ACCEPTED || coupon.get('status') === STATUS_WAIT_FOR_MERCHANT) {
            data = data.updateIn([DATA.DEAL, 'code_status'], () => coupon.get('status'));
            data = data.updateIn([DATA.DEAL, 'is_get'], () => true);
            data = data.updateIn([DATA.DEAL], () => ObjectUtil.mapCouponToDeal(data.get('deal'), coupon));
        } else {
            if (data.getIn([DATA.DEAL, 'deal_type'], '') === DEAL_TYPE_MOVIE) {
                if (!!data.get('bookedTicket')) {
                    const coupon_id = coupon.get('id');
                    const bookedTicket = data.getIn(['bookedTicket', 'objects']);
                    if (!!bookedTicket) {
                        data = data.updateIn(['bookedTicket', 'objects'], objects => {

                            if (!objects) return undefined;
                            return objects.filter(el => {
                                return !!ObjectUtil.getValue(el, undefined, ['get']) && el.get('coupon_id') !== coupon_id
                            });
                        });
                        data = data.updateIn([DATA.DEAL, 'code_status'], () => coupon.get('status'));
                        data = data.updateIn([DATA.DEAL, 'is_get'], () => data.getIn(['bookedTicket', 'objects'], {size:0}).size > 0);                   
                    }
                }
            } else {
                data = data.updateIn([DATA.DEAL], () => ObjectUtil.removeBookingInfoInDeal(data.get('deal')));
                data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']).deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);

                if (coupon.get('status', 0) === STATUS_REDEEMED) {
                    data = data.updateIn([DATA.DEAL, 'get_count'], () => data.getIn([DATA.DEAL, 'get_count'], 0) + 1);
                }
            }
        }
        this.setState({
            ...this.state,
            data
        });
    };

    _onDealDetailCollectionActionDispatcher = dispatcher => {
        if (dispatcher.get('action') === 'save' && !!dispatcher.get('slug')) {
            this._onDealDetailCollectionSavedChanged(dispatcher.get('slug'), dispatcher.get('is_save'), dispatcher.get('save_count'));
        }
    };

    _onDealDetailCollectionSavedChanged = (slug, is_save, save_count) => {
        if (!!this.state.data && !!this.state.data.getIn([DATA.COLLECTION, 'objects'])) {
            let foundIndex = this.state.data.getIn([DATA.COLLECTION, 'objects']).findIndex((collection, index) => {
                return collection.get('slug') === slug && collection.get('is_save') !== is_save;
            });
            if (foundIndex >= 0) {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn([DATA.COLLECTION, 'objects', foundIndex], collection =>
                        collection.updateIn(['save_count'], () => save_count).updateIn(['is_save'], () => is_save)
                    )
                });
            }
        }
    };

    _handleActionTrigger = (action, data) => {
        if (!!this.props.onActionTrigged) this.props.onActionTrigged();

        console.log('_handleActionTrigger', action, data);

        if (StringUtil.isEmpty(action) || StringUtil.isEmpty(data) || !this.mounted) return;

        if (action === 'open_comment') {
            this.props.navigation.navigate('AllComments', {
                did: data.did,
                nofData: data,
                onCommentAdded: this._onCommentChanged,
                onCommentDeleted: this._onCommentChanged,
                onCommentEdited: this._onCommentChanged
            });
        }
    };

    _onLikeDealClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate('Login', {
                from: {
                    action_location: 'deal_detail',
                    action_name: 'click_like_deal'
                },
                action: {
                    name: 'click_like_deal',
                    category: 'login'
                }
            });
            return;
        }
        if (!!this.state.data.getIn([DATA.DEAL, 'is_vote_up'], false)) return;

        this.props.dispatch(
            likeDeal(
                this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'up_vote_count'], 0),
                this.state.data.getIn([DATA.DEAL, 'is_vote_up'], false),
                this.state.data.getIn([DATA.DEAL, 'down_vote_count'], 0),
                this.state.data.getIn([DATA.DEAL, 'is_vote_down'], false)
            )
        );
    };

    _onDislikeDealClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate('Login', {
                from: {
                    action_location: 'deal_detail',
                    action_name: 'click_dislike_deal'
                },
                action: {
                    name: 'click_dislike_deal',
                    category: 'login'
                }
            });
            return;
        }
        if (!!this.state.data.getIn([DATA.DEAL, 'is_vote_down'], false)) return;

        this.props.dispatch(
            dislikeDeal(
                this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'up_vote_count'], 0),
                this.state.data.getIn([DATA.DEAL, 'is_vote_up'], false),
                this.state.data.getIn([DATA.DEAL, 'down_vote_count'], 0),
                this.state.data.getIn([DATA.DEAL, 'is_vote_down'], false)
            )
        );
    };

    _onSaveDealClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate('Login', {
                from: {
                    action_location: 'deal_detail',
                    action_name: 'click_save_deal'
                },
                action: {
                    name: 'click_save_deal',
                    category: 'login'
                }
            });
            return;
        }

        this.props.dispatch(
            saveDeal(
                this.state.data.getIn([DATA.DEAL, 'id'], ''),
                this.state.data.getIn([DATA.DEAL, 'is_saved'], false),
                this.state.data.getIn([DATA.DEAL, 'save_count'], 0)
            )
        );
    };

    _onCheckInDealClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate('Login', {
                from: {
                    action_location: 'deal_detail',
                    action_name: 'click_checkin_deal'
                },
                action: {
                    name: 'click_checkin_deal',
                    category: 'login'
                }
            });
            return;
        }
        this.props.dispatch(
            checkInDeal(
                this.state.data.getIn([DATA.DEAL, 'slug'], ''),
                this.state.data.getIn([DATA.DEAL, 'check_in_id']),
                this.state.data.getIn([DATA.DEAL, 'checked_in'], false),
                this.state.data.getIn([DATA.DEAL, 'check_in_count'], 0)
            )
        );
    };

    _onOpenCommentListClicked = () => {
        this.props.navigation.navigate('AllComments', {
            did: this.state.data.getIn([DATA.DEAL, 'id'], ''),
            onCommentAdded: this._onCommentChanged,
            onCommentDeleted: this._onCommentChanged,
            onCommentEdited: this._onCommentChanged
        });
    };

    _onOpenApplyStore = () => {
        if (this.state.data.getIn([DATA.DEAL, 'stores'], []).size < 1) return;
        this.props.navigation.navigate('ListStores', { deal: this.state.data.get(DATA.DEAL) });
    };

    _onOpenProductListClicked = () => {
        this.props.navigation.navigate('AllSaleProduct', { dSlug: this.state.data.getIn([DATA.DEAL, 'slug'], '') });
    };

    _onOpenFoodyReviewClicked = () => {
        this.props.navigation.navigate('FoodyReview', { deal: this.state.data.get(DATA.DEAL).toJS() });
    };

    _onOpenBrandDetail = () => {
        this.props.navigation.navigate('BrandDetail', { brand: this.state.data.getIn([DATA.DEAL, 'brand']).toJS() });
    };

    _onFollowBrandClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate('Login', {
                from: {
                    action_location: 'deal_detail',
                    action_name: 'click_follow_brand'
                },
                action: {
                    name: 'click_follow_brand',
                    category: 'login'
                }
            });
            return;
        }

        this.props.dispatch(
            followBrand(this.state.data.getIn([DATA.DEAL, 'brand', 'id'], ''), this.state.data.getIn([DATA.DEAL, 'is_following'], false))
        );
    };

    _getBookingRepo = () => {
        if (!!this.bookingRepo) return this.bookingRepo;
        this.bookingRepo = new BookingRepo();
        return this.bookingRepo;
    };

    _onShareDealPressed = () => {
        this.props.dispatch(shareDeal(this.state.data.getIn([DATA.DEAL, 'slug'], 0), this.state.data.getIn([DATA.DEAL, 'share_count'], 0)));
    };

    _onClosePopoverChangeDateButton = () => {
        this.state.data = this.state.data.updateIn([DATA.TIMEBASE_BOOKING, 'showTooltipAutoChangeDate'], () => false);
        ConfigDb.bookingDatePickerPopoverVisible();
    };

    _dealDetailUpdateLikeDealStatus = (slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) => {
        let data = this.state.data;
        let hasChanged = false;

        let deal = data.get(DATA.DEAL);

        if (deal.get('slug') === slug && (deal.get('is_vote_up') !== is_vote_up || deal.get('is_vote_down') !== is_vote_down)) {
            deal = deal.updateIn(['is_vote_up'], () => is_vote_up);
            deal = deal.updateIn(['is_vote_down'], () => is_vote_down);
            deal = deal.updateIn(['up_vote_count'], () => up_vote_count);
            deal = deal.updateIn(['down_vote_count'], () => down_vote_count);

            hasChanged = true;
            data = data.updateIn([DATA.DEAL], () => deal);
        }

        const releatedDealFoundIndex = data
            .get('sections')
            .findIndex((section, index) => section.get('type') === VIEW_TYPE.DEAL && section.getIn(['data', 'slug'], '') === slug);
        if (releatedDealFoundIndex > 0) {
            hasChanged = true;
            data = data.updateIn([releatedDealFoundIndex, 'is_vote_up'], () => is_vote_up);
            data = data.updateIn([releatedDealFoundIndex, 'is_vote_down'], () => is_vote_down);
            data = data.updateIn([releatedDealFoundIndex, 'up_vote_count'], () => up_vote_count);
            data = data.updateIn([releatedDealFoundIndex, 'down_vote_count'], () => down_vote_count);
        }

        if (hasChanged) {
            this.setState({
                ...this.state,
                data
            });
        }
    };

    _dealDetailUpdateSaveDealStatus = (id, is_save, save_count) => {
        let data = this.state.data;
        let hasChanged = false;

        if (!!data.get(DATA.DEAL) && data.getIn([DATA.DEAL, 'id']) === id && data.getIn([DATA.DEAL, 'is_saved']) !== is_save) {
            data = data.updateIn([DATA.DEAL, 'is_saved'], () => is_save);
            data = data.updateIn([DATA.DEAL, 'save_count'], () => save_count);
            hasChanged = true;
        }

        const releatedDealFoundIndex = data
            .get('sections')
            .findIndex((section, index) => section.get('type') === VIEW_TYPE.DEAL && section.getIn(['data', 'id'], '') === id);
        if (releatedDealFoundIndex > 0) {
            hasChanged = true;
            data = data.updateIn(['sections', releatedDealFoundIndex, 'data', 'is_saved'], () => is_save);
            data = data.updateIn(['sections', releatedDealFoundIndex, 'data', 'save_count'], () => save_count);
        }

        if (hasChanged) {
            this.setState({
                ...this.state,
                data
            });
        }
    };

    _dealDetailUpdateCheckInDealStatus = (slug, check_in_id, checked_in, check_in_count) => {
        let data = this.state.data;
        let hasChanged = false;

        let deal = data.get(DATA.DEAL);

        if (deal.get('slug') === slug) {
            deal = deal.updateIn(['check_in_id'], () => check_in_id);
            deal = deal.updateIn(['checked_in'], () => checked_in);
            deal = deal.updateIn(['check_in_count'], () => check_in_count);

            hasChanged = true;
            data = data.updateIn([DATA.DEAL], () => deal);
        }

        const releatedDealFoundIndex = data
            .get('sections')
            .findIndex((section, index) => section.get('type') === VIEW_TYPE.DEAL && section.getIn(['data', 'slug'], '') === slug);
        if (releatedDealFoundIndex > 0) {
            hasChanged = true;
            data = data.updateIn([releatedDealFoundIndex, 'check_in_id'], () => check_in_id);
            data = data.updateIn([releatedDealFoundIndex, 'checked_in'], () => checked_in);
            data = data.updateIn([releatedDealFoundIndex, 'check_in_count'], () => check_in_count);
        }

        if (hasChanged) {
            this.setState({
                ...this.state,
                data
            });
        }
    };

    _dealDetailUpdateFollowBrandStatus = (brand_id, following) => {
        let data = this.state.data;
        let hasChanged = false;
        if (!!data.get(DATA.DEAL) && data.getIn([DATA.DEAL, 'brand', 'id'], '') === brand_id) {
            hasChanged = true;
            data = data.updateIn([DATA.DEAL, 'is_following'], () => following);

            let count = data.getIn([DATA.DEAL, 'brand', 'follow_count'], 0);
            if (following) {
                count = count + 1;
            } else {
                count = count <= 0 ? 0 : count - 1;
            }

            data = data.updateIn([DATA.DEAL, 'brand', 'follow_count'], () => count);
        }

        let hasChangeSection = false;
        const sections = data.get('sections').map((section, index) => {
            if (section.get('type') === VIEW_TYPE.DEAL && section.getIn(['data', 'brand', 'id']) === brand_id) {
                hasChanged = true;
                hasChangeSection = true;
                return section.updateIn(['data', 'is_following'], () => following);
            }
            return section;
        });

        if (hasChangeSection) data = data.updateIn(['sections'], () => sections);

        if (hasChanged) {
            this.setState({
                ...this.state,
                data
            });
        }
    };

    _dealDetailUpdateShareDealStatus = (slug, share_count) => {
        if (!this.state.data.get(DATA.DEAL)) return;

        if (this.state.data.getIn([DATA.DEAL, 'slug']) !== slug) return;

        this.setState({
            ...this.state,
            data: this.state.data.updateIn([DATA.DEAL, 'share_count'], () => share_count)
        });
    };

    _onDealDetailDataChangeDealInfo = dispatcher => {
        switch (dispatcher.get('action')) {
            case 'like':
                this._dealDetailUpdateLikeDealStatus(
                    dispatcher.get('slug'),
                    dispatcher.get('up_vote_count'),
                    dispatcher.get('is_vote_up'),
                    dispatcher.get('down_vote_count'),
                    dispatcher.get('is_vote_down')
                );
                return;

            case 'save':
                this._dealDetailUpdateSaveDealStatus(dispatcher.get('id'), dispatcher.get('is_save'), dispatcher.get('save_count'));
                return;

            case 'check_in':
                this._dealDetailUpdateCheckInDealStatus(
                    dispatcher.get('slug'),
                    dispatcher.get('check_in_id'),
                    dispatcher.get('checked_in'),
                    dispatcher.get('check_in_count')
                );
                return;
            case 'follow_brand':
                this._dealDetailUpdateFollowBrandStatus(dispatcher.get('brand_id'), dispatcher.get('following'));
                return;

            case 'share':
                this._dealDetailUpdateShareDealStatus(dispatcher.get('slug'), dispatcher.get('share_count'));
                return;
        }
    };

    _onTimeOutFlashSaleCountDown = () => {
        if (!!this.state.data && !!this.state.data.get(DATA.FLASH_SALE)) {
            this._getBookingRepo()
                .updateFlashSale(this.state.data)
                .then(result => {
                    console.debug('_onTimeOutFlashSaleCountDown:result: ', result);

                    if (!!result.get(DATA.FLASH_SALE)) {
                        this.setState({
                            ...this.state,
                            data: this.state.data.updateIn([DATA.FLASH_SALE], () => result.get(DATA.FLASH_SALE))
                        });
                    } else {
                        this.setState({
                            ...this.state,
                            data: this.state.data.delete(DATA.FLASH_SALE)
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        ...this.state,
                        data: this.state.data.delete(DATA.FLASH_SALE)
                    });
                });
        }
    };

    _dealActionSubscription = value => {
        console.debug('_dealActionSubscription: ', value);
    };

    _onHandleTicketDispatcher = event => {
        try {
            if (!this.state || !this.state.data || ObjectUtil.getValue(event, undefined, ['data', 'deal_id']) !== this.state.data.getIn([DATA.DEAL, 'id'])) return;

            if (event.action === 'update_ticket') {
                if (!!this.state.data.getIn(['bookedTicket', 'objects'])) {
                    let data = this.state.data.updateIn(['bookedTicket', 'objects'], objects => objects.unshift(fromJS(event.data)));
                    data = data.updateIn([DATA.DEAL, 'is_get'], () => true);

                    data = data.updateIn(['bookedTicket', 'meta', 'total_count'], total_count => total_count + 1);
                    this.setState({
                        ...this.state,
                        data: data
                    });
                } else {
                    let data = this.state.data.updateIn(['bookedTicket', 'objects'], () => fromJS([event.data]));
                    data = data.updateIn([DATA.DEAL, 'is_get'], () => true);

                    data = data.updateIn(['bookedTicket', 'meta', 'total_count'], () => 1);
                    this.setState({
                        ...this.state,
                        data: data
                    });
                }
            } else if(event.action === 'remove_ticket') {
                let data = this.state.data;
                if(!!data.getIn(['bookedTicket', 'objects'])) {

                    let currentCount = data.getIn(['bookedTicket', 'meta', 'total_count'], 0);

                    console.debug('_onHandleTicketDispatcher:', currentCount);

                    data = data.updateIn(['bookedTicket', 'objects'], objects => {

                        if (!objects) return undefined;

                        const newObjects = objects.filter(el => !!ObjectUtil.getValue(el, undefined, ['get']) && el.get('coupon_id') !== event.data.coupon_id);

                        if (!newObjects || newObjects.size < 1) {
                            currentCount = 0;
                            return undefined;
                        }
                        if (newObjects.size !== currentCount) {
                            currentCount = currentCount - 1;
                        }
                        return newObjects;
                    });
                    data = data.updateIn(['bookedTicket', 'meta', 'total_count'], () => currentCount);
                    data = data.updateIn([DATA.DEAL, 'is_get'], () => data.getIn(['bookedTicket', 'objects'], {size:0}).size > 0);
                }

                this.setState({
                    ...this.state,
                    data: data
                });

            }
        } catch (error) {
            console.log('__onHandleTicketDispatcher:error', error);
        }
    };

    _refreshDealData = () => {

        if (!!this.state && !!this.state.data) {
            const dealType = this.state.data.getIn([DATA.DEAL, 'deal_type']);
            if (dealType === DEAL_TYPE_MOVIE) this._fetchOrderStatus();
        }

        this._fetchDealDetail();
    }

    componentDidMount() {
        super.componentDidMount();
        if (!!this.props.deal && !!this.props.deal.get('is_detail_obj', false)) {
            this.setState(
                {
                    ...this.state,
                    isRefreshing: true,
                    isLoading: true,
                    isFail: false,
                    firstLoading: false,
                    isResetting: true,
                    brandId: undefined,
                    showBottomCTA: false,
                    needPlaceholder: true
                },
                () => this._prepareDealDetailData(this.props.deal)
            );
            return;
        }
        this._startInit();
        this.onDealSubscription = DealSubject.subscribe(this._onHandleTicketDispatcher);
    }

    componentWillUnmount() {
        !!this.onDealSubscription && this.onDealSubscription.unsubscribe();
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoginned !== this.props.isLoginned) {
            console.log('componentWillReceiveProps login changed');
            this.setState(
                {
                    ...this.state,
                    isResetting: true
                },
                this._refreshDealData
            );
            return;
        }

        if (!StringUtil.isEmpty(nextProps.actionName)) {
            this._handleActionTrigger(nextProps.actionName, nextProps.actionData);
            return;
        }

        if (!!this.state.data) {
            let deal = this.state.data.get(DATA.DEAL);
            if (deal === undefined || deal.get('id') === undefined) return;

            if (nextProps.couponDataChange.get('did') && deal.get('id') === nextProps.couponDataChange.get('did')) {
                this._onCouponDataChanged(nextProps.couponDataChange.get('coupon'));
            } else if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
                this._onDealDetailDataChangeDealInfo(nextProps.dealAction);
            } else if (!StringUtil.isEmpty(nextProps.collectionAction.get('action'))) {
                this._onDealDetailCollectionActionDispatcher(nextProps.collectionAction);
            }
        }
    }
}

/**
 * TimebaseBooking data:
 * promocode:
 *  input
 *  isLoading
 * schedules: all of schedule by store selected
 * selected: {
 *  promocode: promocode want to active for this booking
 *  store: store selected
 *  schedules: schedule by date selected
 *  slot: slot selected
 *  date: date selected
 *  dates: date available selection data
 *  time: time selected
 *  times: time data for pick
 * }
 * minOfMinSlot: min of min slot of times selected data
 * maxOfMinSlot: max of min slot of times selected data
 * maxOfMaxSlotPerVoucher: max of max slot of times selected data
 * maxSlotAvailable: slot available of store that has selected with selected date
 *
 *
 * isLoading
 * isStoreEmpty: to render error when empty store list
 * isNotGoLive: to render error when the start_valid_time of deal diff current_time > 7
 * isNotValidYet: to render error when the start_valid_time of deal diff current_time <= 7
 * isNotValid: to render error when dont have any schedule of selected date
 * isPassBookingTime: to render error when is pass booking time
 * isUnknownError: to render unknown error message
 */
