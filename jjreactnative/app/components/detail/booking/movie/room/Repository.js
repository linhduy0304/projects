import React from 'react';
import { fromJS, List, Map } from 'immutable';
import { Alert, AppState, BackHandler, Platform } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import { BasePureComponent } from '../../../../common/BasePureComponent';
import { bookingApi } from '../../../../../api/booking-api';
import { SeatState } from './SeatState';
import { Toast } from '../../../../common/alert/Toast';
import {
    BHD_ERROR_TIMEOUT,
    ALERT_TITLE_NORMAL,
    BHD_NOTICE_CANCEL_ORDER,
    ALERT_TITLE_CONFIRM,
    ALERT_TITLE_ERROR,
    getErrorMessage,
    ALERT_TITLE_WARNING
} from '../../../../../utils/text-message';
import { DEAL_TYPE_MOVIE, ERROR_NORMAL } from '../../../../../const';
import { ObjectUtil } from '../../../../../utils/object-utils';
import { AnalyticsUtil } from '../../../../common/analytics/analytics';
import { cols } from './RoomView';
import { UserDb } from '../../../../../api/storage/UserDb';

moment.locale('vi');
const ios = Platform.OS === 'ios';

const AREACODENAME = 'AreaCategoryCode';

export default class Repository extends BasePureComponent {
    deal;
    booking;
    time;
    openFrom;
    maxSlotSelection;

    baseLogParams;

    isFocus = false;
    timeOutOpening = false;

    hasShowHoldingPopupGuide = false;

    constructor(props) {
        super(props);

        this.deal = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'deal']);
        this.booking = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'booking']);
        this.openFrom = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'from']);

        console.log('MovieRoom:cons:', this.booking.toJS());

        this.maxSlotSelection = this.booking.getIn(['time', 'max_slot_per_voucher'], 0);
        const slotAvailable = this.booking.getIn(['time', 'slotAvailable'], 0);

        if (slotAvailable < this.maxSlotSelection) this.maxSlotSelection = slotAvailable;

        this.state = {
            time: 0,
            loading: true,
            showPopupCountDown: false,
            data: fromJS({})
        };

        this.baseLogParams = {
            item_id: this.deal.get('slug', ''),
            item_brand: this.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: DEAL_TYPE_MOVIE,
            deal_type: DEAL_TYPE_MOVIE
        };
    }

    componentDidMount() {
        super.componentDidMount();

        AnalyticsUtil.logCurrentScreen('movie_booking_room', this.baseLogParams);

        this._fetchBookingScheduleDetail();

        this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => {
            console.log('MovieRoom:didFocus', this.state.data.toJS());
            this.isFocus = true;
            !ios && BackHandler.addEventListener('hardwareBackPress', this._onBackPressListener);
        });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            console.log('MovieRoom:willBlur');
            this.isFocus = false;
            !ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);
        });
        AppState.addEventListener('change', this._onAppStateChanged);
        this.hasShowHoldingPopupGuide = UserDb.hasShowedMovieHoldingPopupGuide();
    }

    _fetchBookingScheduleDetail = () => {
        bookingApi
            .getBookingScheduleDetail(this.booking.getIn(['time', 'id']))
            .then(response => {
                console.log('_fetchBookingScheduleDetail:response: ', response);

                this.setState(
                    {
                        data: this.state.data.updateIn(['bookingScheduleDetail'], () => fromJS(response))
                    },
                    this._fetchBhdSeatPlan
                );
            })
            .catch(error => {
                console.log('_fetchBookingScheduleDetail:error: ', error);
                AnalyticsUtil.logNormalEvent('movie_booking_room_load_detail_error', this.baseLogParams, 'booking');
                Alert.alert(
                    ALERT_TITLE_ERROR,
                    getErrorMessage(error),
                    [
                        {
                            text: 'OK',
                            onPress: () => this.props.navigation.goBack()
                        }
                    ],
                    { cancelable: false }
                );
            });
    };

    _fetchBhdSeatPlan = () => {
        this.timeOutOpening = false;
        bookingApi
            .getBhdSeatPlan(this.booking.getIn(['time', 'id']))
            .then(response => {
                // response = JSON.parse(`{"ErrorDescription": null, "ResponseCode": 0, "SeatLayoutData": {"AreaCategories": [{"AreaCategoryCode": "0000000000", "IsInSeatDeliveryEnabled": false, "SeatsAllocatedCount": 0, "SeatsNotAllocatedCount": 0, "SeatsToAllocate": 0, "SelectedSeats": []}, {"AreaCategoryCode": "0000000002", "IsInSeatDeliveryEnabled": false, "SeatsAllocatedCount": 0, "SeatsNotAllocatedCount": 0, "SeatsToAllocate": 0, "SelectedSeats": []}, {"AreaCategoryCode": "0000000001", "IsInSeatDeliveryEnabled": false, "SeatsAllocatedCount": 0, "SeatsNotAllocatedCount": 0, "SeatsToAllocate": 0, "SelectedSeats": []}], "Areas": [{"AreaCategoryCode": "0000000000", "ColumnCount": 13, "Description": "Standard", "DescriptionAlt": "", "HasSofaSeatingEnabled": false, "Height": 55.0, "IsAllocatedSeating": true, "Left": 0.0, "Number": 1, "NumberOfSeats": 124, "RowCount": 13, "Rows": [{"PhysicalName": "M", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 0}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "L", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "10", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 1}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "K", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "4", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 2}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "J", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 3}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 3}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 3}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "1", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 3}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}]}, {"PhysicalName": "I", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 4}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 4}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 4}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "1", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 4}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}]}, {"PhysicalName": "H", "Seats": [{"Id": "13", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 5}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "12", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 5}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "2", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 5}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "1", "OriginalStatus": 1, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 5}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}]}, {"PhysicalName": "G", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 6}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 6}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 6}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 6}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "F", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 7}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 7}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 7}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 7}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "E", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "7", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "6", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 8}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "D", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "7", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "6", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 9}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "C", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "7", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "6", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 10}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "B", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "7", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "6", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 11}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "A", "Seats": [{"Id": "13", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 0, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 1, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 2, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 3, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 4, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 5, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "7", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 6, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "6", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 7, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 8, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 9, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 10, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "2", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 11, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "1", "OriginalStatus": 0, "Position": {"AreaNumber": 1, "ColumnIndex": 12, "RowIndex": 12}, "Priority": 1, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}], "Top": 10.0, "Width": 100.0}, {"AreaCategoryCode": "0000000002", "ColumnCount": 13, "Description": "Couple", "DescriptionAlt": "", "HasSofaSeatingEnabled": false, "Height": 5.5, "IsAllocatedSeating": true, "Left": 0.0, "Number": 3, "NumberOfSeats": 12, "RowCount": 1, "Rows": [{"PhysicalName": "N", "Seats": [{"Id": "12", "OriginalStatus": 0, "Position": {"AreaNumber": 3, "ColumnIndex": 1, "RowIndex": 0}, "Priority": 1, "SeatStyle": 3, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 1, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 2, "RowIndex": 0}], "Status": 0}, {"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 3, "ColumnIndex": 2, "RowIndex": 0}, "Priority": 1, "SeatStyle": 1, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 1, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 2, "RowIndex": 0}], "Status": 0}, {"Id": "10", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 3, "RowIndex": 0}, "Priority": 1, "SeatStyle": 3, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 3, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 4, "RowIndex": 0}], "Status": 1}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 4, "RowIndex": 0}, "Priority": 1, "SeatStyle": 1, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 3, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 4, "RowIndex": 0}], "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 5, "RowIndex": 0}, "Priority": 1, "SeatStyle": 3, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 5, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 6, "RowIndex": 0}], "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 6, "RowIndex": 0}, "Priority": 1, "SeatStyle": 1, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 5, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 6, "RowIndex": 0}], "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 7, "RowIndex": 0}, "Priority": 1, "SeatStyle": 3, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 7, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 8, "RowIndex": 0}], "Status": 1}, {"Id": "5", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 8, "RowIndex": 0}, "Priority": 1, "SeatStyle": 1, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 7, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 8, "RowIndex": 0}], "Status": 1}, {"Id": "4", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 9, "RowIndex": 0}, "Priority": 1, "SeatStyle": 3, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 9, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 10, "RowIndex": 0}], "Status": 1}, {"Id": "3", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 10, "RowIndex": 0}, "Priority": 1, "SeatStyle": 1, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 9, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 10, "RowIndex": 0}], "Status": 1}, {"Id": "2", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 11, "RowIndex": 0}, "Priority": 1, "SeatStyle": 3, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 11, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 12, "RowIndex": 0}], "Status": 1}, {"Id": "1", "OriginalStatus": 1, "Position": {"AreaNumber": 3, "ColumnIndex": 12, "RowIndex": 0}, "Priority": 1, "SeatStyle": 1, "SeatsInGroup": [{"AreaNumber": 3, "ColumnIndex": 11, "RowIndex": 0}, {"AreaNumber": 3, "ColumnIndex": 12, "RowIndex": 0}], "Status": 1}]}], "Top": 3.8333, "Width": 100.0}, {"AreaCategoryCode": "0000000001", "ColumnCount": 13, "Description": "VIP", "DescriptionAlt": "", "HasSofaSeatingEnabled": false, "Height": 55.0, "IsAllocatedSeating": true, "Left": 0.0, "Number": 4, "NumberOfSeats": 45, "RowCount": 13, "Rows": [{"PhysicalName": null, "Seats": []}, {"PhysicalName": null, "Seats": []}, {"PhysicalName": null, "Seats": []}, {"PhysicalName": "J", "Seats": [{"Id": "11", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 2, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "10", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 3, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 4, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 5, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 6, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 7, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 8, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "4", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 9, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 10, "RowIndex": 3}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "I", "Seats": [{"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 2, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 3, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 4, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 5, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 6, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 7, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 8, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "4", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 9, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "3", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 10, "RowIndex": 4}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}]}, {"PhysicalName": "H", "Seats": [{"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 2, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 3, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 4, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 5, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 6, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 7, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 8, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 9, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 10, "RowIndex": 5}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "G", "Seats": [{"Id": "11", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 2, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "10", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 3, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "9", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 4, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 5, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 6, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 7, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 8, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 9, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 10, "RowIndex": 6}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": "F", "Seats": [{"Id": "11", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 2, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "10", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 3, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "9", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 4, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "8", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 5, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "7", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 6, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "6", "OriginalStatus": 1, "Position": {"AreaNumber": 4, "ColumnIndex": 7, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 1}, {"Id": "5", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 8, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "4", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 9, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}, {"Id": "3", "OriginalStatus": 0, "Position": {"AreaNumber": 4, "ColumnIndex": 10, "RowIndex": 7}, "Priority": 2, "SeatStyle": 0, "SeatsInGroup": null, "Status": 0}]}, {"PhysicalName": null, "Seats": []}, {"PhysicalName": null, "Seats": []}, {"PhysicalName": null, "Seats": []}, {"PhysicalName": null, "Seats": []}, {"PhysicalName": null, "Seats": []}], "Top": 10.0, "Width": 100.0}], "BoundaryLeft": 0.0, "BoundaryRight": 100.0, "BoundaryTop": 3.8333, "ScreenStart": 0.0, "ScreenWidth": 100.0}}`);

                console.log('_fetchBhdSeatPlan:response: ', response);

                if (!!response.SeatLayoutData) {
                    this.setState(
                        {
                            loading: false,
                            data: this.state.data.updateIn(['seatPlan'], () => fromJS(response))
                        },
                        this._prepareMovieRoomData
                    );
                } else {
                    AnalyticsUtil.logNormalEvent('movie_booking_room_load_seat_error', this.baseLogParams, 'booking');
                    Alert.alert(
                        ALERT_TITLE_ERROR,
                        ERROR_NORMAL,
                        [
                            {
                                text: 'OK',
                                onPress: () => this.props.navigation.goBack()
                            }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch(error => {
                console.log('_fetchBhdSeatPlan:error: ', error);
                AnalyticsUtil.logNormalEvent('movie_booking_room_load_seat_error', this.baseLogParams, 'booking');
                Alert.alert(
                    ALERT_TITLE_ERROR,
                    getErrorMessage(error),
                    [
                        {
                            text: 'OK',
                            onPress: () => this.props.navigation.goBack()
                        }
                    ],
                    { cancelable: false }
                );
            });
    };

    _fetchCreateBhdOrder = () => {
        this.timeOutOpening = false;
        const seatsSelected = this.state.data.get('seatsSelected');
        if (!seatsSelected) {
            Toast.showToast(ERROR_NORMAL);
            return;
        }

        let tickets = seatsSelected.map(s =>
            Map({
                AreaCategoryCode: s.get('AreaCategoryCode'),
                AreaNumber: s.get('areaNumber'),
                ColumnIndex: s.get('columnIndex'),
                RowIndex: s.get('rowIndex')
            })
        );

        AnalyticsUtil.logNormalEvent('movie_booking_room_create_order_start', this.baseLogParams, 'booking');
        bookingApi
            .createBhdOrder(tickets.toJS(), this.booking.getIn(['time', 'id'], ''), moment(this.booking.getIn(['time', 'time'], '')).unix())
            .then(response => {
                console.log('_fetchCreateBhdOrder:response: ', response);

                AnalyticsUtil.logNormalEvent('movie_booking_room_create_order_success', this.baseLogParams, 'booking');

                const order = fromJS(response);
                let time = 300;
                try {
                    time = moment
                        .utc(order.getIn(['jamja_order', 'expires']))
                        .utc()
                        .diff(moment(), 'seconds');
                } catch (e) {
                    console.log(e);
                    time = 300;
                }

                AnalyticsUtil.logMovieBookingAddToCart(
                    ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
                    ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
                    DEAL_TYPE_MOVIE,
                    {
                        store_id: this.booking.getIn(['store', 'id'], ''),
                        slot: order.getIn(['jamja_order', 'count'], 0),
                        time: moment(this.booking.getIn(['time', 'time'], '')).unix(),
                        avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                        price: order.getIn(['jamja_order', 'total_price'])
                    }
                );

                AnalyticsUtil.addToCart(
                    this.deal.getIn(['title'], ''),
                    this.deal.getIn(['slug'], ''),
                    this.deal.getIn(['brand', 'brand_slug'], ''),
                    this.deal.getIn(['cat1'], ''),
                    this.deal.getIn(['cat2'], ''),
                    DEAL_TYPE_MOVIE,
                    this.deal.getIn(['avg_billing_value'], 0),
                    order.getIn(['jamja_order', 'total_price']),
                    order.getIn(['jamja_order', 'count'], 0),
                    this.booking.getIn(['time', 'time'], '')
                );

                if (!!this.hasShowHoldingPopupGuide) {
                    this.setState(
                        {
                            ...this.state,
                            data: this.state.data.updateIn(['order'], () => order)
                        },
                        this._onSubmitHolding
                    );
                } else {
                    this.setState({
                        ...this.state,
                        time: time,
                        loading: false,
                        showPopupCountDown: true,
                        data: this.state.data.updateIn(['order'], () => order)
                    });
                }
            })
            .catch(error => {
                console.log('_fetchCreateBhdOrder:error: ', error);
                AnalyticsUtil.logNormalEvent('movie_booking_room_create_order_error', this.baseLogParams, 'booking');
                this.setState(
                    {
                        ...this.state,
                        loading: false,
                        showPopupCountDown: false
                    },
                    () => {
                        Alert.alert(
                            ALERT_TITLE_ERROR,
                            getErrorMessage(error),
                            [
                                {
                                    text: 'OK',
                                    onPress: () => console.log('_fetchCreateBhdOrder:erorr:press')
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                );
            });
    };

    _fetchCancelOrder = exit => {
        this.timeOutOpening = false;
        console.log('_fetchCancelOrder: ', this.state.data.toJS());

        AnalyticsUtil.logMovieRemoveFromCart(
            ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
            ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
            DEAL_TYPE_MOVIE,
            {
                store_id: this.booking.getIn(['store', 'id'], ''),
                slot: this.state.data.getIn(['order', 'jamja_order', 'count'], 0),
                time: moment(this.booking.getIn(['time', 'time'], '')).unix(),
                avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                price: this.state.data.getIn(['order', 'jamja_order', 'total_price'])
            }
        );

        bookingApi
            .bhdCancelOrder(
                this.state.data.getIn(['order', 'jamja_order', 'bhd_order', 'user_session_id']),
                this.state.data.getIn(['order', 'jamja_order', 'id'])
            )
            .then(response => {
                if (!this.mounted) return;
                console.log('_fetchCancelOrder:response', response);
                if (!!exit) this.props.navigation.goBack();
                else {
                    this.setState(
                        {
                            ...this.state,
                            data: this.state.data.deleteIn(['order']).deleteIn(['seatsSelected'])
                        },
                        this._fetchBookingScheduleDetail
                    );
                }
            })
            .catch(error => {
                console.log('_fetchCancelOrder:error', error);
                if (!!exit) this.props.navigation.goBack();
            });
    };

    _prepareMovieRoomData = () => {
        try {
            const seatPlan = this.state.data.get('seatPlan');
            const bookingScheduleDetail = this.state.data.get('bookingScheduleDetail');

            if (!seatPlan || seatPlan.size < 1) {
                console.error('not found seat plan');
                return;
            }

            const Areas = seatPlan.getIn(['SeatLayoutData', 'Areas']);

            const colCount = Areas.getIn([0, 'ColumnCount'], 0);
            let rowCount = Areas.getIn([0, 'RowCount'], 0);

            if (colCount <= 0 || rowCount <= 0) {
                console.error('could not found any col or row');
                return;
            }

            const saleProducts = bookingScheduleDetail.getIn(['sale_package', 'products']);

            if (!saleProducts || saleProducts.size < 1) {
                console.error('could not found sale product');
                return;
            }

            // console.debug('Areas:', colCount, rowCount, Areas.toJS());

            let seats = List();

            const highlight = this.booking.getIn(['time', 'highlight'], '');

            Areas.map(area => {
                const Description = area.get('Description', '');
                const AreaCategoryCode = area.get('AreaCategoryCode');

                const product = saleProducts.find(p => p.get(AREACODENAME) === AreaCategoryCode);

                let areaAvailable = !!product && !!product.get('id');

                area.get('Rows').map(r => {
                    if (!r.get('PhysicalName')) return;

                    const PhysicalName = r.get('PhysicalName');

                    r.get('Seats').map(s => {
                        let seatStyle = undefined;
                        const ColumnIndex = s.getIn(['Position', 'ColumnIndex']);
                        let SeatsInGroup = s.get('SeatsInGroup');
                        let coupleIndex = -1;

                        if (!!SeatsInGroup && SeatsInGroup.size > 0) {
                            SeatsInGroup = SeatsInGroup.sortBy(s => s.get('ColumnIndex'));
                            if (ColumnIndex === SeatsInGroup.getIn([0, 'ColumnIndex'])) {
                                seatStyle = 'R';
                                coupleIndex = SeatsInGroup.getIn([1, 'ColumnIndex'], -1);
                            } else {
                                seatStyle = 'L';
                                coupleIndex = SeatsInGroup.getIn([0, 'ColumnIndex'], -1);
                            }
                        }

                        seats = seats.push(
                            Map({
                                id: s.get('Id'),
                                areaNumber: s.getIn(['Position', 'AreaNumber']),
                                columnIndex: ColumnIndex,
                                rowIndex: s.getIn(['Position', 'RowIndex']),
                                description: Description,
                                AreaCategoryCode: AreaCategoryCode,
                                highlight,
                                name: PhysicalName,
                                available: !!areaAvailable && s.get('Status') === 0,
                                seatStyle: seatStyle,
                                coupleIndex,
                                ticket_price: !!product ? product.get('ticket_price') : undefined
                            })
                        );
                    });
                });
            });

            // console.debug('Seats:', seats.toJS());

            let rowMap = List();

            let colMap = cols.filter((c, i) => i < colCount);

            const seatsHasGroup = seats.groupBy(x => x.get('name')).sortBy((x, i) => i);
            rowCount = seatsHasGroup.size;

            // console.debug('Seats:Group:', seatsHasGroup.toJS(), seatsHasGroup.size);

            let currentIndexInMap = -1;
            seatsHasGroup.map((r, name) => {
                currentIndexInMap += 1;

                // console.debug('R: ', name, r.toJS())
                if (!r) return;

                let row = Map({
                    name: name,
                    rowInMapIndex: currentIndexInMap,
                    seats: r
                });

                colMap.map((c, cIndex) => {
                    const colInMapIndex = cIndex;
                    const columnIndex = colCount - 1 - cIndex;

                    const seatFoundIndex = row.get('seats').findIndex(s => s.get('columnIndex') === columnIndex);

                    if (seatFoundIndex >= 0) {
                        let seat = row.getIn(['seats', seatFoundIndex]);
                        seat = seat.updateIn(['colInMapIndex'], () => colInMapIndex);
                        seat = seat.updateIn(['rowInMapIndex'], () => currentIndexInMap);

                        const seatName = seat.get('name') + seat.get('id');
                        seat = seat.updateIn(['seatName'], () => seatName);

                        row = row.updateIn(['seats', seatFoundIndex], () => seat);
                    } else {
                        row = row.updateIn(['seats'], () =>
                            row.get('seats').push(
                                Map({
                                    colInMapIndex,
                                    columnIndex,
                                    id: -1,
                                    status: SeatState.EMPTY
                                })
                            )
                        );
                    }
                });

                row = row.updateIn(['seats'], () => row.get('seats').sortBy(s => -s.get('colInMapIndex')));

                rowMap = rowMap.push(row);
            });

            const movieMap = Map({
                colCount,
                rowCount,
                rowMap
            });

            console.debug('movieMap: ', movieMap.toJS());

            this.setState({
                data: this.state.data.updateIn(['room'], () => movieMap)
            });
        } catch (e) {
            console.log(e);
        }
    };

    _onSeatPressed = seat => {
        console.log('_onSeatPressed:seat: ', seat.toJS(), this.state.data.getIn(['room', 'rowMap']).toJS());
        if (!seat) return;

        const foundRowIndex = this.state.data
            .getIn(['room', 'rowMap'])
            .findIndex(r => r.get('rowInMapIndex') === seat.get('rowInMapIndex') && r.get('name', '') === seat.get('name', ''));
        console.log('_onSeatPressed:foundRowIndex: ', foundRowIndex);
        if (foundRowIndex < 0) return;

        let seats = this.state.data.getIn(['room', 'rowMap', foundRowIndex, 'seats']);
        if (!seats) return;

        const seatSelectedId = seat.get('id');

        let seatsSelected = this.state.data.get('seatsSelected');

        let needBreak = false;

        let coupleSeat = undefined;
        let coupleSelected = false;
        const isCouple = seat.get('description', '').toLowerCase() === 'couple';
        const coupleIndexInSeats = !!isCouple ? seats.findIndex(s => !!s && !!s.get && s.get('columnIndex', 0) === seat.get('coupleIndex', -1)) : -1;
        if (coupleIndexInSeats >= 0) {
            coupleSeat = seats.get(coupleIndexInSeats);
        }

        seats = seats.map(s => {
            if (!!s && !!s.get && s.get('id') === seatSelectedId && s.get('rowInMapIndex') === seat.get('rowInMapIndex')) {
                if (!!needBreak) return;

                const selected = !s.get('selected', false);

                if (!!selected) {
                    if (
                        !!this.state.data.get('seatsSelected') &&
                        this.state.data.get('seatsSelected').size + (isCouple ? 1 : 0) >= this.maxSlotSelection
                    ) {
                        Toast.showToast(`Bạn chỉ được chọn ${this.maxSlotSelection} ghế`);
                        needBreak = true;
                        return;
                    }
                    seatsSelected = this._addSeatSelected(seatsSelected, seat);
                    if (!!coupleSeat) {
                        seatsSelected = this._addSeatSelected(seatsSelected, coupleSeat);
                        coupleSelected = true;
                    }

                    AnalyticsUtil.logBookingSelection(
                        'Seat_Selected',
                        this.deal.getIn(['brand', 'brand_slug'], ''),
                        this.deal.getIn(['slug'], ''),
                        DEAL_TYPE_MOVIE,
                        ''
                    );
                } else {
                    seatsSelected = this._removeSeatSelected(seatsSelected, seat);
                    if (!!coupleSeat) {
                        seatsSelected = this._removeSeatSelected(seatsSelected, coupleSeat);
                        coupleSelected = false;
                    }
                }

                return s.updateIn(['selected'], () => selected);
            }

            return s;
        });

        if (coupleIndexInSeats >= 0 && !!coupleSeat) {
            seats = seats.updateIn([coupleIndexInSeats, 'selected'], () => coupleSelected);
        }

        if (!!seatsSelected) {
            seatsSelected = seatsSelected.filter(s => Map.isMap(s));
        }

        if (!seats || !!needBreak) return;

        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['room', 'rowMap', foundRowIndex, 'seats'], () => seats).updateIn(['seatsSelected'], () => seatsSelected)
        });
    };

    _addSeatSelected = (seats, seat) => {
        if (!seat || seat.get('id') === -1) return;
        if (!seats) seats = List();
        if (seats.size < 1) return seats.push(seat);

        const selectedId = seat.get('id');
        const rowInMapIndex = seat.get('rowInMapIndex');
        const hasFound = seats.findIndex(s => !!s && !!s.get && s.get('id') === selectedId && s.get('rowInMapIndex') === rowInMapIndex);
        if (hasFound < 0) return seats.push(seat);
        return seats;
    };

    _removeSeatSelected = (seats, seat) => {
        if (!seat || seat.get('id') === -1) return;
        if (!seats) seats = List();
        if (seats.size < 1) return seats;

        const selectedId = seat.get('id');
        const rowInMapIndex = seat.get('rowInMapIndex');
        const hasFound = seats.findIndex(s => !!s && !!s.get && s.get('id') === selectedId && s.get('rowInMapIndex') === rowInMapIndex);
        if (hasFound < 0) return seats;
        return seats.deleteIn([hasFound]);
    };

    _onRemoveSeatSelectedPress = seat => {
        if (!seat || seat.get('id') === -1) return;

        let seatsSelected = this.state.data.get('seatsSelected');

        if (!seatsSelected || seatsSelected.size < 1) return;

        AnalyticsUtil.logBookingSelection(
            'Remove_Seat_Selected',
            this.deal.getIn(['brand', 'brand_slug'], ''),
            this.deal.getIn(['slug'], ''),
            DEAL_TYPE_MOVIE,
            ''
        );

        const selectedId = seat.get('id');
        const rowInMapIndex = seat.get('rowInMapIndex');
        const selectedColumnIndex = seat.get('columnIndex');
        const isCouple = seat.get('description', '').toLowerCase() === 'couple';

        const hasFound = seatsSelected.findIndex(s => !!s && !!s.get && s.get('id') === selectedId && s.get('rowInMapIndex') === rowInMapIndex);
        if (hasFound < 0) return;
        seatsSelected = seatsSelected.deleteIn([hasFound]);

        const coupleSelectedIndex = !!isCouple
            ? seatsSelected.findIndex(
                  s =>
                      !!s &&
                      !!s.get &&
                      s.get('columnIndex', 0) === seat.get('coupleIndex', -1) &&
                      s.get('rowInMapIndex') === seat.get('rowInMapIndex')
              )
            : -1;

        if (coupleSelectedIndex >= 0) {
            seatsSelected = seatsSelected.deleteIn([coupleSelectedIndex]);
        }

        seatsSelected = seatsSelected.filter(s => Map.isMap(s));

        const foundRowIndex = this.state.data.getIn(['room', 'rowMap']).findIndex(r => r.get('rowInMapIndex') === rowInMapIndex);
        console.log('_onRemoveSeatSelectedPress:foundRowIndex: ', foundRowIndex);

        let seats = this.state.data.getIn(['room', 'rowMap', foundRowIndex, 'seats']);

        const foundColIndex = seats.findIndex(s => !!s && !!s.get && s.get('id') === selectedId && s.get('columnIndex') === selectedColumnIndex);

        seats = seats.updateIn([foundColIndex], r => r.updateIn(['selected'], () => false));

        if (!!isCouple) {
            const foundCoupleColIndex = seats.findIndex(s => !!s && !!s.get && s.get('columnIndex') === seat.get('coupleIndex', -1));
            if (foundCoupleColIndex >= 0) {
                seats = seats.updateIn([foundCoupleColIndex], r => r.updateIn(['selected'], () => false));
            }
        }

        this.setState({
            data: this.state.data.updateIn(['seatsSelected'], () => seatsSelected).updateIn(['room', 'rowMap', foundRowIndex, 'seats'], () => seats)
        });
    };

    _validateSeatsSelected = () => {
        console.log('_validateSeatsSelected: ', this.state.data.toJS());

        if (!this.state.data.get('seatsSelected') || this.state.data.get('seatsSelected') < 1) return false;

        const rowMap = this.state.data.getIn(['room', 'rowMap']);
        const seatsSelected = this.state.data.get('seatsSelected');
        const minSlot = this.booking.getIn(['time', 'min_slot'], 0);
        const selectedCount = seatsSelected.size;

        if (selectedCount < minSlot || selectedCount > this.maxSlotSelection) {
            Alert.alert(ALERT_TITLE_WARNING, `Ưu đãi này chỉ áp dụng cho số lượng đặt từ ${minSlot} vé đến ${this.maxSlotSelection} vé`);
            return false;
        }

        const rowOfSeatSelected = rowMap.filter((r, i) => {
            const seats = r.get('seats');
            if (!seats) return false;
            return seats.findIndex((s, si) => !!s && !!s.get && !!s.get('selected')) >= 0;
        });

        console.log('_validateSeatsSelected:rowOfSeatSelected: ', rowOfSeatSelected.toJS());

        if (!this._validateEmptyOneSeatBetween(rowOfSeatSelected)) return false;
        // if (!this._validateEmptyOneSeatLeftOrRight(rowOfSeatSelected)) return false;

        return true;
    };

    _validateEmptyOneSeatBetween = rows => {
        for (let i = 0; i < rows.size; i++) {
            const seats = rows.getIn([i, 'seats']);
            if (!seats) continue;

            let seatAvailableFromLastIndex = 0;
            let lastSelectedIndex = -1;

            for (let j = 0; j < seats.size; j++) {
                if (!!seats.getIn([j, 'selected'])) {
                    if (seatAvailableFromLastIndex === 1) {
                        Alert.alert(ALERT_TITLE_NORMAL, `Vui lòng không chừa trống 1 ghế ở giữa các ghế bạn chọn`);
                        return false;
                    }

                    lastSelectedIndex = j;
                    seatAvailableFromLastIndex = 0;
                    continue;
                }

                if (!seats.getIn([j, 'available'])) {
                    lastSelectedIndex = -1;
                    seatAvailableFromLastIndex = 0;
                }

                if (!!seats.getIn([j, 'available']) && lastSelectedIndex >= 0) {
                    seatAvailableFromLastIndex += 1;
                }
            }
        }

        return true;
    };

    _onPressBooking = () => {
        if (!this._validateSeatsSelected()) {
            return;
        }

        AnalyticsUtil.logNormalEvent('movie_booking_room_book', this.baseLogParams, 'booking');

        this.setState(
            {
                ...this.state,
                loading: true
            },
            this._fetchCreateBhdOrder
        );
    };

    _cancelOrder = () => {
        Alert.alert(
            ALERT_TITLE_CONFIRM,
            BHD_NOTICE_CANCEL_ORDER,
            [
                {
                    text: 'Không',
                    onPress: () => console.log('_onBackButtonClicked:no')
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        AnalyticsUtil.logNormalEvent('movie_booking_room_cancel_order', this.baseLogParams, 'booking');
                        this.setState(
                            {
                                ...this.state,
                                loading: true
                            },
                            this._fetchCancelOrder
                        );
                    }
                }
            ],
            { cancelable: false }
        );
    };

    _onClosePopupHolding = () => {
        this._cancelOrder();
    };

    _onSubmitHolding = () => {
        AnalyticsUtil.logNormalEvent('movie_booking_room_open_confirm', this.baseLogParams, 'booking');
        this.setState({
            ...this.state,
            time: 0,
            loading: false,
            showPopupCountDown: false
        });
        this.props.navigation.push('BhdConfirmBooking', {
            from: this.openFrom,
            deal: this.deal,
            booking: this.booking,
            order: this.state.data.get('order'),
            time: this.state.time,
            remoteListener: this._onRemoteListener
        });

        this.hasShowHoldingPopupGuide = true;
        UserDb.showMovieHoldingPopupGuide();
    };

    _onTimeOutHolding = () => {
        if (!!this.timeOutOpening) return;

        AnalyticsUtil.logNormalEvent('movie_booking_room_timeout', this.baseLogParams, 'booking');

        this.timeOutOpening = true;

        Alert.alert(
            ALERT_TITLE_NORMAL,
            BHD_ERROR_TIMEOUT,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        this.timeOutOpening = false;
                        this.setState(
                            {
                                ...this.state,
                                loading: true,
                                showPopupCountDown: false
                            },
                            this._fetchCancelOrder
                        );
                    }
                }
            ],
            { cancelable: false }
        );
    };

    _onBackPressListener = () => {
        if (!!this.state.data.get('order')) {
            this._cancelOrder();
            return true;
        }
        AnalyticsUtil.logNormalEvent('movie_booking_room_back', this.baseLogParams, 'booking');
    };

    _onRemoteListener = action => {
        console.log('MovieRoom:action:', action);
        if (action === 'refresh') {
            this.setState(
                {
                    ...this.state,
                    loading: true,
                    showPopupCountDown: false,
                    data: this.state.data.deleteIn(['order']).deleteIn(['seatsSelected'])
                },
                this._fetchBookingScheduleDetail
            );
        }
    };

    _onAppStateChanged = state => {
        try {
            console.log('MovieRoom:onAppStateChanged:', AppState.currentState, state, AppState.isAvailable, this.isFocus);
            if (this.isFocus && state === 'active' && !!this.state.showPopupCountDown && !!this.state.data && !!this.state.data.get('order')) {
                let time = 0;
                try {
                    time = moment
                        .utc(this.state.data.getIn(['order', 'jamja_order', 'expires']))
                        .utc()
                        .diff(moment(), 'seconds');
                } catch (e) {
                    console.log(e);
                }

                console.log('MovieRoom:nextTime:', time);

                this.setState(
                    {
                        ...this.state,
                        showPopupCountDown: time > 1,
                        time: time
                    },
                    () => {
                        if (time <= 1) {
                            this._onTimeOutHolding();
                        }
                    }
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    componentWillUnmount() {
        !ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);

        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
        AppState.removeEventListener('change', this._onAppStateChanged);
        super.componentWillUnmount();
    }
}
