import React from 'react'
import {List,fromJS} from "immutable";
import moment from 'moment/min/moment-with-locales';

import {DATA} from "../Repository";
import {dealApi} from "../../../../api/deal-api";
import {StringUtil} from "../../../../utils/string-util";
import {dealSlotUnit} from "../../../../utils/TextUtils";
import {DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../../../../const";

moment.locale('vi');

export const TimeBaseStatus = {
    //status for time selection
    AVAILABLE: 0,
    SOLD_OUT: 1,//chay ban
    NOT_ENOUGH_SLOT: 2,//ko du cho
    NOT_ENOUGH_MIN_SLOT: 3, //sl >= x
    OVER_SLOT: 4, //sl <= x

    //status for global cta

    CTA_AVAILABLE: 0,
    NOT_GO_LIVE: 1, //chua chinh thuc bat dau
    NOT_VALID: 2, //chuong trinh khong ap dung
    UNKNOWN_ERROR: 3, //normal error
    EMPTY_STORE: 4, //not found store
    LOADING: 5,
};

export default class BookingRepo {

    fetchBookingSchedule = (data, slug) => new Promise((resolve, reject) => {
        dealApi.getBookingSchedule(slug, data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'store', 'id'], ''), 0, 1000)
            .then(response => {
                console.log('getBookingSchedule:response:', response);
                if (StringUtil.isEmpty(response) || !StringUtil.isEmpty(response.error)) {
                    resolve(data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.UNKNOWN_ERROR));
                    return;
                }
                return {
                    data: data,
                    schedules: fromJS(response.objects)
                };
            })
            //prepare schedule by date selected and date available for pick
            .then(result => {
                console.log('prepare schedule by date selected and date available for pick');
                return this._prepareScheduleAndDate(result.data, result.schedules);
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.log('getBookingSchedule:error:', error)
                reject(error);
            })
    });

    fetchBookingFlashSaleSchedule = (parent, slug) => new Promise((resolve, reject) => {
        dealApi.getBookingSchedule(slug, parent.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'store', 'id'], ''), 0, 1000, 'flash_sale')
            .then(response => {
                console.log('fetchBookingFlashSaleSchedule:response:', response);
                if (StringUtil.isEmpty(response) || !StringUtil.isEmpty(response.error) || !response.objects || response.objects.length < 1) {
                    resolve(parent.delete(DATA.FLASH_SALE));
                    return;
                }
                return {
                    data: parent,
                    schedules: fromJS(response.objects)
                };
            })
            //prepare schedule by date selected and date available for pick
            .then(result => {
                console.debug('fetchBookingFlashSaleSchedule:result.....', result);
                if (!result) return;

                let data = result.data;
                let schedules = result.schedules;

                let dates = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'dates'], fromJS([{
                    time: new Date(),
                    type: 'normal'
                }]));

                let flashSaleTimes = fromJS([]);

                schedules.map(s => {
                    //check schedule of flashSale do not include in dates selection data
                    const startValidTime = moment.utc(s.get('start_valid_time', '')).local();
                    const foundIndex = dates.findIndex(d => startValidTime.isSame(d.get('time'), 'day'));
                    if (foundIndex >= 0) {
                        dates = dates.updateIn([foundIndex, 'type'], () => 'flash_sale');
                    }
                    else {
                        dates = dates.push(fromJS({
                            time: startValidTime.toDate(),
                            type: 'flash_sale'
                        }));
                    }

                    if (!!s.get('flash_sale_times')) {
                        s.get('flash_sale_times').map(t => {
                            flashSaleTimes = flashSaleTimes.push(t.updateIn(['scheduleId'], () => s.get('id')))
                        });
                    }
                });

                dates = dates.sort((s1, s2) => {
                    const d1 = moment(s1.get('time'));
                    const d2 = moment(s2.get('time'));
                    if (d1.isSame(d2)) return 0;
                    if (d1.isBefore(d2)) return -1;
                    return 1;
                });

                console.debug('fetchBookingFlashSaleSchedule:flashSaleTimes:', flashSaleTimes.toJS());

                // //TODO edit for test
                // schedules = schedules.map(s => {
                //     let fs = s.get('flash_sale_times');
                //     fs = fs.map(t => {
                //         if (t.get('range') === '03/03/2019 18:00 - 03/03/2019 20:00') {
                //             t = t.updateIn(['start_time'], () => moment().subtract(10, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss'))
                //                 .updateIn(['end_time'], () => moment().add(20, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss'))
                //         }
                //         return t
                //     });
                //     return s.updateIn(['flash_sale_times'], () => fs);
                // });

                flashSaleTimes = flashSaleTimes.sort((f1, f2) => {
                    const s1 = moment.utc(f1.get('start_time')).local();
                    const s2 = moment.utc(f2.get('start_time')).local();

                    if (s1.isAfter(s2)) return 1;
                    if (s1.isBefore(s2)) return -1;
                    return 0;
                });

                schedules = schedules.sort((s1, s2) => {
                    const t1 = moment.utc(s1.get('start_valid_time')).local();
                    const t2 = moment.utc(s2.get('start_valid_time')).local();

                    if (t1.isAfter(t2)) return 1;
                    if (t1.isBefore(t2)) return -1;
                    return 0;
                });


                data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'dates'], () => dates);
                data = data.updateIn([DATA.FLASH_SALE, 'flash_sale_times'], () => flashSaleTimes);
                data = data.updateIn([DATA.FLASH_SALE, 'schedules'], () => schedules);

                return this._prepareFlashSaleData(data);
            })
            .then(data => {
                if (!data) return;

                console.debug('Flashsale completed prepare new data: ', data, data.toJS());
                resolve(data);
            })
            .catch(error => {
                console.log('getBookingSchedule:error:', error)
                reject(error);
            })
    });

    checkBookingScheduleNotGoLiveError = (data) => {
        const currentTime = new Date();
        const startValidTimeOfDeal = moment.utc(data.getIn([DATA.DEAL, 'start_valid_time'], '')).local().endOf('day');
        const dayDiff = startValidTimeOfDeal.diff(currentTime, 'days');
        return dayDiff >= 7;
    }

    prepareDataAfterChangeDate = (data, date) => {
        return this._prepareScheduleByDateChanged(data, date)
            .then(data => {

                let dateSelected = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'date']);
                const currentTime = moment();
                let newData = this._getNormalBookingTimeAfterChangeDate(data, dateSelected, currentTime);

                if (!!newData.getIn([DATA.FLASH_SALE, 'schedules'])) {

                    let flashSaleTimes = newData.getIn([DATA.FLASH_SALE, 'flash_sale_times']);
                    let flashSaleSchedules = newData.getIn([DATA.FLASH_SALE, 'schedules']);
                    const currentTime = moment();

                    const activeFlashSaleTimes = flashSaleTimes.filter(f => {
                        const startTime = moment.utc(f.get('start_time')).local();
                        let endTime = moment.utc(f.get('end_time')).local();
                        endTime = endTime.seconds(0);
                        endTime = endTime.milliseconds(0);

                        return currentTime.isBetween(startTime, endTime);
                    });

                    // console.debug('prepareDataAfterChangeDate____22:', activeFlashSaleTimes.toJS(), newData.toJS());

                    if (activeFlashSaleTimes.size > 0) {
                        const dataOfFlashSale = this._getFlashSaleBookingTime(newData, flashSaleSchedules, activeFlashSaleTimes, dateSelected, true);
                        if (!!dataOfFlashSale && dataOfFlashSale.getIn([DATA.FLASH_SALE, 'totalSlot'], 0) > 0) {
                            newData = this._rePrepareNormalBookingTime(dataOfFlashSale);
                        }
                        else {
                            newData = dataOfFlashSale;
                        }

                        // console.debug('prepareDataAfterChangeDate____33:', newData.toJS());
                        return newData;
                    }
                    else {
                        // do not any active flash sale times
                        let earlyFlashSaleTime;
                        flashSaleTimes.map(f => {
                            const startTime = moment.utc(f.get('start_time')).local();
                            const earlyStartTime = !!earlyFlashSaleTime ? moment.utc(earlyFlashSaleTime.get('start_time')).local() : undefined;

                            if (startTime.isAfter(currentTime, 'seconds') && (!earlyStartTime || startTime.isBefore(earlyStartTime, 'seconds'))) {
                                earlyFlashSaleTime = f;
                            }
                        });

                        if (!earlyFlashSaleTime) {
                            return newData.deleteIn([DATA.FLASH_SALE]);
                        }

                        newData = newData.updateIn([DATA.FLASH_SALE, 'count_down_time'], () => earlyFlashSaleTime.get('start_time'));
                        newData = newData.updateIn([DATA.FLASH_SALE, 'highlight'], () => earlyFlashSaleTime.get('highlight'));
                        newData = newData.updateIn([DATA.FLASH_SALE, 'totalSlot'], () => 0);
                        newData = newData.updateIn([DATA.FLASH_SALE, 'totalSlotAvailable'], () => 0);
                        newData = newData.updateIn([DATA.FLASH_SALE, 'active'], () => false);
                        newData = newData.deleteIn([DATA.FLASH_SALE, 'times']);

                    }
                }

                return newData;
            })
            //end of prepare data
            .then(result => {
                result = result.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);

                return result;
            });
    }

    prepareDataAfterChangeSlot = (data, slot) => {
        return this._checkBookingDataWhenChangeSlotWithTimePicked(data, slot)
            .then(result => {
                if (result.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode'])) {
                    const errors = this._validatePromoCodeApplied(
                        result,
                        result.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0),
                        result.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time', 'time'])
                    );

                    if (errors && errors.length > 0) {
                        result = result.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode', 'errors'], () => fromJS(errors));
                    } else {
                        result = result.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode', 'errors']);
                    }
                }
                return result;
            });
    }

    prepareDataAfterChangeTime = (dt, time) => new Promise(resolve => {
        let data = dt.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'time'], () => time);

        data = this._checkWarningOfTimeSelected(data, time);

        if (data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode'])) {
            const errors = this._validatePromoCodeApplied(
                data,
                data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0),
                data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time', 'time'])
            );

            if (errors && errors.length > 0) {
                data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode', 'errors'], () => fromJS(errors));
            } else {
                data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode', 'errors']);
            }
        }
        resolve(data);
    });

    updateFlashSale = parent => {
        return new Promise((resolve, reject) => {
            const data = this._prepareFlashSaleData(parent);
            resolve(data);
        });
    }

    _prepareFlashSaleData = (data) => {
        if (!data) return undefined;

        let flashSaleTimes = data.getIn([DATA.FLASH_SALE, 'flash_sale_times']);
        let flashSaleSchedules = data.getIn([DATA.FLASH_SALE, 'schedules']);
        const currentTime = moment();
        let conditions = fromJS([]);

        let dateSelected = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'date']);

        const activeFlashSaleTimes = flashSaleTimes.filter(f => {
            const startTime = moment.utc(f.get('start_time')).local();
            let endTime = moment.utc(f.get('end_time')).local();
            endTime = endTime.seconds(0);
            endTime = endTime.milliseconds(0);

            return currentTime.isBetween(startTime, endTime);
        });

        // has active flash sale times
        if (activeFlashSaleTimes.size > 0) {

            activeFlashSaleTimes.map(f => {
                if (conditions.findIndex(c => c === f.get('condition')) < 0) {
                    conditions = conditions.push(f.get('condition'));
                }
            });

            let newBooking = this._getFlashSaleBookingTime(data, flashSaleSchedules, activeFlashSaleTimes, currentTime.toDate());
            if (!newBooking) {
                newBooking = this._getFlashSaleBookingTime(data, flashSaleSchedules, activeFlashSaleTimes, dateSelected, true);
            }
            newBooking =  newBooking.updateIn([DATA.FLASH_SALE, 'conditions'], () => conditions);
            return this._rePrepareNormalBookingTime(newBooking);
        }

        // do not any active flash sale times
        let earlyFlashSaleTime;
        flashSaleTimes.map(f => {
            const startTime = moment.utc(f.get('start_time')).local();
            const earlyStartTime = !!earlyFlashSaleTime ? moment.utc(earlyFlashSaleTime.get('start_time')).local() : undefined;

            if (startTime.isAfter(currentTime, 'seconds') && (!earlyStartTime || startTime.isBefore(earlyStartTime, 'seconds'))) {
                earlyFlashSaleTime = f;
            }
        });

        if (!earlyFlashSaleTime) {
            return data.deleteIn([DATA.FLASH_SALE]);
        }

        conditions = conditions.push(earlyFlashSaleTime.get('condition'));

        data = data.updateIn([DATA.FLASH_SALE, 'count_down_time'], () => earlyFlashSaleTime.get('start_time'));
        data = data.updateIn([DATA.FLASH_SALE, 'highlight'], () => earlyFlashSaleTime.get('highlight'));
        data = data.updateIn([DATA.FLASH_SALE, 'totalSlot'], () => 0);
        data = data.updateIn([DATA.FLASH_SALE, 'totalSlotAvailable'], () => 0);
        data = data.updateIn([DATA.FLASH_SALE, 'active'], () => false);
        data = data.updateIn([DATA.FLASH_SALE, 'conditions'], () => conditions);
        data = data.deleteIn([DATA.FLASH_SALE, 'times']);

        return data;
    }

    _getFlashSaleBookingTime = (data, flashSaleSchedules, activeFlashSaleTimes, date, forceReturn) => {
        let slotSelected = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot']);
        const currentTime = moment();

        let maxOfEndSaleTime;
        let activeSchedules = fromJS([]);
        let highlight = '';

        activeFlashSaleTimes.map(f => {
            let endTime = moment.utc(f.get('end_time')).local();
            endTime = endTime.seconds(0);
            endTime = endTime.milliseconds(0);

            if (!maxOfEndSaleTime || endTime.isAfter(maxOfEndSaleTime, 'seconds')) maxOfEndSaleTime = endTime;

            const schedule = flashSaleSchedules.find(s => {
                return s.get('id') === f.get('scheduleId') && moment.utc(s.get('start_valid_time')).local().isSame(date, 'day');
            });
            if (!!schedule) activeSchedules = activeSchedules.push(schedule);

        });

        data = data.updateIn([DATA.FLASH_SALE, 'count_down_time'], () => !!maxOfEndSaleTime ? maxOfEndSaleTime.utc().format('YYYY-MM-DDTHH:mm:ss') : undefined)
            .updateIn([DATA.FLASH_SALE, 'active'], () => true);

        let minOfMinSlot = data.getIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], 0);
        let maxOfMinSlot = data.getIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], 0);
        let maxOfMaxSlotPerVoucher = data.getIn([DATA.TIMEBASE_BOOKING, 'maxOfMaxSlotPerVoucher'], 0);
        let maxSlotAvailable = data.getIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], 0);
        let flashSaleMinOfMinSlot = 0;
        let flashSaleMaxOfMinSlot = 0;
        let flashSaleMaxOfMaxSlotPerVoucher = 0;
        let flashSaleMaxSlotAvailable = 0;

        let totalSlot = 0;
        let totalSlotAvailable = 0;

        activeSchedules.map(schedule => {
            const minSlot = schedule.get('min_slot', 0);
            const maxSlot = schedule.get('max_slot', 0);
            const usedSlot = schedule.get('used_slot', 0);
            const maxSlotPerVoucher = schedule.get('max_slot_per_voucher', 0);

            const slotAvailable = maxSlot - usedSlot;

            if (flashSaleMinOfMinSlot < 1 || flashSaleMinOfMinSlot > minSlot) flashSaleMinOfMinSlot = minSlot;
            if (flashSaleMaxOfMinSlot < 1 || flashSaleMaxOfMinSlot <= minSlot) flashSaleMaxOfMinSlot = minSlot;
            if (flashSaleMaxOfMaxSlotPerVoucher < 1 || flashSaleMaxOfMaxSlotPerVoucher < maxSlotPerVoucher) flashSaleMaxOfMaxSlotPerVoucher = maxSlotPerVoucher;
            if (flashSaleMaxSlotAvailable < 1 || flashSaleMaxSlotAvailable < slotAvailable) flashSaleMaxSlotAvailable = slotAvailable;

            if (highlight.indexOf(schedule.get('highlight')) < 0) {
                highlight += `${highlight.length > 0 ? ', ' : ''}${schedule.get('highlight')}`;
            }

            totalSlot += maxSlot;
            totalSlotAvailable += slotAvailable;
        });

        activeSchedules = activeSchedules.sort((s1, s2) => {
            const t1 = moment.utc(s1.get('start_valid_time')).local();
            const t2 = moment.utc(s2.get('start_valid_time')).local();

            if (t1.isAfter(t2)) return 1;
            if (t1.isBefore(t2)) return -1;
            return 0;
        });

        if (flashSaleMinOfMinSlot > 0 && (minOfMinSlot < 1 || minOfMinSlot > flashSaleMinOfMinSlot)) minOfMinSlot = flashSaleMinOfMinSlot;
        if (flashSaleMaxOfMinSlot > 0 && (maxOfMinSlot < 1 || maxOfMinSlot < flashSaleMaxOfMinSlot)) maxOfMinSlot = flashSaleMaxOfMinSlot;
        if (flashSaleMaxOfMaxSlotPerVoucher > 0 && (maxOfMaxSlotPerVoucher < 1 || maxOfMaxSlotPerVoucher < flashSaleMaxOfMaxSlotPerVoucher)) maxOfMaxSlotPerVoucher = flashSaleMaxOfMaxSlotPerVoucher;
        if (flashSaleMaxSlotAvailable > 0 && (maxSlotAvailable < 1 || maxSlotAvailable < flashSaleMaxSlotAvailable)) maxSlotAvailable = flashSaleMaxSlotAvailable;

        if (totalSlot > 0) {
            slotSelected = maxOfMinSlot;
        }

        // data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], () => slotSelected);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'date'], () => date);
        // data = data.updateIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], () => minOfMinSlot);
        // data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], () => maxOfMinSlot);
        // data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMaxSlotPerVoucher'], () => maxOfMaxSlotPerVoucher);
        // data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], () => maxSlotAvailable);

        let times = this._flashSalePrepareDataBySchedule(data, activeSchedules, currentTime, slotSelected, true);
        if (!!times && times.length > 0) {
            data = data.updateIn([DATA.FLASH_SALE, 'times'], () => fromJS(times));
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], () => slotSelected);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'date'], () => date);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], () => minOfMinSlot);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], () => maxOfMinSlot);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMaxSlotPerVoucher'], () => maxOfMaxSlotPerVoucher);
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], () => maxSlotAvailable);
        }
        else {
            data = data.deleteIn([DATA.FLASH_SALE, 'times']);
        }

        console.debug('_getFlashSaleBookingTime: ', times, data.toJS(), totalSlotAvailable, totalSlot);

        if (!forceReturn && (totalSlotAvailable < 1 || !times || times.length < 1)) return undefined;

        data = data.updateIn([DATA.FLASH_SALE, 'highlight'], () => highlight);
        data = data.updateIn([DATA.FLASH_SALE, 'totalSlot'], () => totalSlot);
        data = data.updateIn([DATA.FLASH_SALE, 'totalSlotAvailable'], () => totalSlotAvailable);

        return data;
    }

    _rePrepareNormalBookingTime = data => {

        const dateSelected = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'date']);
        const slotSelected = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0);
        const currentTime = moment();

        let schedules = data.getIn([DATA.TIMEBASE_BOOKING, 'schedules'], []);

        let minOfMinSlot = data.getIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], 0);
        let maxOfMinSlot = data.getIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], 0);
        let maxSlotAvailable = data.getIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], 0);
        let times = [];

        let schedulesByDate = schedules.filter(schedule => moment.utc(schedule.get('start_valid_time', '')).local().isSame(dateSelected, 'day'));
        if (!!schedulesByDate && schedulesByDate.size > 0) {

            const currentDateTime = currentTime.toDate();

            //prepare time to pick
            schedulesByDate.map((schedule, index) => {
                const timeOfSchedule = this._getTimeFromSchedule(currentDateTime, schedule, slotSelected, data.getIn([DATA.DEAL, 'deal_type']));
                times.push(...timeOfSchedule);
                if (!!timeOfSchedule && timeOfSchedule.size > 0 && index + 1 < schedulesByDate.size) {
                    times.push({divider: 1});
                }
            });
        }

        times = fromJS(times);

        data = this._checkWarning(data, maxOfMinSlot, maxSlotAvailable, minOfMinSlot, slotSelected);

        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'isLoading'], () => false);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'times'], () => times);

        if (times.size < 1) {
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.NOT_VALID);
            data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
            data = this._checkWarningOfTimeSelected(data, undefined);
        }
        else {
            data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.CTA_AVAILABLE);

            const selectedTime = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
            if (!!selectedTime) {

                const lastTime = moment(selectedTime.get('time'));
                const newTime = moment(dateSelected);
                newTime.set('millisecond', 0);
                newTime.set('second', lastTime.seconds());
                newTime.set('minute', lastTime.minutes());
                newTime.set('hour', lastTime.hours());

                const findNewTime = times.find((time, index) => {
                    if (!time.get('time')) return false;
                    return moment(time.get('time')).isSame(newTime, 'minutes');
                });

                if (!!findNewTime) {

                    const newTimeStatus = this._getTimeStatus(
                        findNewTime.get('min_slot'),
                        findNewTime.get('slotAvailable'),
                        data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0),
                        findNewTime.get('max_slot_per_voucher'),
                        data.getIn([DATA.DEAL, 'deal_type']));

                    if (newTimeStatus !== TimeBaseStatus.AVAILABLE) {
                        data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
                        data = this._checkWarningOfTimeSelected(data, undefined);
                    }
                    else {
                        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'time'], () => findNewTime);
                        data = this._checkWarningOfTimeSelected(data, findNewTime);
                    }
                }
                else {
                    data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
                    data = this._checkWarningOfTimeSelected(data, undefined);
                }
            }
        }

        return data;
    };

    _flashSalePrepareDataBySchedule = (data, schedules, currentTime, slotSelected, active) => {
        let times = [];
        const currentDate = currentTime.toDate();

        schedules.map((s, index) => {
            if (!!active) {
                const timeOfSchedule = this._getTimeFromSchedule(currentDate, s, slotSelected, DEAL_TYPE_LAST_MIN, 'flash_sale');
                times.push(...timeOfSchedule);
                if (!!timeOfSchedule && timeOfSchedule.size > 0 && index + 1 < schedules.size) {
                    times.push({divider: 1});
                }
            }
        });

        if (!!active && !!schedules && schedules.size > 0) {
            return times;
        }
        return undefined;
    }

    _getNormalBookingTimeAfterChangeDate = (data, dateSelected, currentTime) => {
        let minOfMinSlot = 0;
        let maxOfMinSlot = 0;
        let maxOfMaxSlotPerVoucher = 0;
        let maxSlotAvailable = 0;
        let times = [];

        const dealType = data.getIn([DATA.DEAL, 'deal_type']);

        let schedulesByDate = data.getIn([DATA.TIMEBASE_BOOKING, 'schedules']).filter(schedule => {
            const startValidTime = moment.utc(schedule.get('start_valid_time', '')).local();

            const isSameDay = startValidTime.isSame(dateSelected, 'day');

            if (dealType === DEAL_TYPE_MOVIE) {
                return !!isSameDay && startValidTime.isSameOrAfter(currentTime, 'minutes')
            }

            return isSameDay;
        });
        if (!!schedulesByDate && schedulesByDate.size > 0) {
            //get slot of all schedule in date
            schedulesByDate.map(schedule => {
                const minSlot = schedule.get('min_slot', 0);
                const maxSlot = schedule.get('max_slot', 0);
                const usedSlot = schedule.get('used_slot', 0);
                const maxSlotPerVoucher = schedule.get('max_slot_per_voucher', 0);

                const slotAvailable = maxSlot - usedSlot;

                if (minOfMinSlot === 0 || minOfMinSlot > minSlot) minOfMinSlot = minSlot;
                if (maxOfMinSlot === 0 || maxOfMinSlot < minSlot) maxOfMinSlot = minSlot;
                if (maxOfMaxSlotPerVoucher === 0 || maxOfMaxSlotPerVoucher < maxSlotPerVoucher) maxOfMaxSlotPerVoucher = maxSlotPerVoucher;
                if (maxSlotAvailable === 0 || maxSlotAvailable < slotAvailable) maxSlotAvailable = slotAvailable;
            });

            let slotSelected = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0);

            if (slotSelected === 0) {
                slotSelected = maxOfMinSlot;
                data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], () => slotSelected);
            }

            const currentDateTime = currentTime.toDate();

            //prepare time to pick
            schedulesByDate.map((schedule, index) => {
                const timeOfSchedule = this._getTimeFromSchedule(currentDateTime, schedule, slotSelected, data.getIn([DATA.DEAL, 'deal_type']));
                times.push(...timeOfSchedule);
                if (!!timeOfSchedule && timeOfSchedule.size > 0 && index + 1 < schedulesByDate.size) {
                    times.push({divider: 1});
                }
            });
        }

        times = fromJS(times);

        data = this._checkWarning(data, maxOfMinSlot, maxSlotAvailable, minOfMinSlot, data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0));

        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'isLoading'], () => false);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], () => minOfMinSlot);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], () => maxOfMinSlot);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMaxSlotPerVoucher'], () => maxOfMaxSlotPerVoucher);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], () => maxSlotAvailable);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'times'], () => times);

        if (times.size < 1) {
            data = data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.NOT_VALID);
            data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
            data = this._checkWarningOfTimeSelected(data, undefined);
        }
        else {
            data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.CTA_AVAILABLE);

            const selectedTime = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
            if (!!selectedTime) {

                const lastTime = moment(selectedTime.get('time'));
                const newTime = moment(dateSelected);
                newTime.set('millisecond', 0);
                newTime.set('second', lastTime.seconds());
                newTime.set('minute', lastTime.minutes());
                newTime.set('hour', lastTime.hours());

                const findNewTime = times.find((time, index) => {
                    if (!time.get('time')) return false;
                    return moment(time.get('time')).isSame(newTime, 'minutes');
                });

                if (!!findNewTime) {

                    const newTimeStatus = this._getTimeStatus(
                        findNewTime.get('min_slot'),
                        findNewTime.get('slotAvailable'),
                        data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0),
                        findNewTime.get('max_slot_per_voucher'),
                        data.getIn([DATA.DEAL, 'deal_type']));

                    if (newTimeStatus !== TimeBaseStatus.AVAILABLE) {
                        data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
                        data = this._checkWarningOfTimeSelected(data, undefined);
                    }
                    else {
                        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'time'], () => findNewTime);
                        data = this._checkWarningOfTimeSelected(data, findNewTime);
                    }
                }
                else {
                    data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
                    data = this._checkWarningOfTimeSelected(data, undefined);
                }
            }
        }
        return data;
    }

    _validatePromoCodeApplied = (data, slot, time) => {
        const promoCode = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'promocode']);
        if (!promoCode || !promoCode.get('promo_deal') || promoCode.get('promo_deal').size < 1) return undefined;
        const promoDeal = promoCode.get('promo_deal').get(0);
        if (promoDeal.get('deal') !== data.getIn([DATA.DEAL, 'id'])) return undefined;

        const errors = [];
        if (promoDeal.get('remain', 0) <= 0) {
            errors.push('Mã giảm thêm đã hết lượt sử dụng.')
        }
        if (!slot) {
            slot = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], 0);
        }
        if (slot < promoDeal.get('min_slot', 0)) {
            errors.push('Mã giảm thêm chỉ áp dụng với số lượng tối thiểu ' +
                promoDeal.get('min_slot', 0) +
                ' ' +
                dealSlotUnit(data.getIn([DATA.DEAL, 'hint_text'], '')) +
                '.')
        }

        if (!time) {
            time = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time', 'time']);
        }

        const start_code_time = moment.utc(promoCode.get('start_code_time')).local();
        const end_code_time = moment.utc(promoCode.get('end_code_time')).local();

        if (!moment(time).isBetween(start_code_time, end_code_time)) {
            errors.push('Mã giảm thêm không áp dụng cho thời gian bạn chọn.')
        }

        return errors;
    }

    _checkBookingDataWhenChangeSlotWithTimePicked = (dt, slot) => new Promise(resolve => {
        let data = dt.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], () => slot);

        const slotSelected = slot;

        const times = this._reCheckTimes(data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'times']), slotSelected, data.getIn([DATA.DEAL, 'deal_type']));

        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'times'], () => times);
        data = this._checkWarning(
            data,
            data.getIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], 0),
            data.getIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], 0),
            data.getIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], 0),
            slotSelected
        );

        const timePicked = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
        if (!!timePicked) {
            const minSlot = timePicked.get('min_slot', 0);
            const slotAvailable = timePicked.get('slotAvailable', 0);
            const maxSlotPerVoucher = timePicked.get('max_slot_per_voucher', 0);
            const newTimeStatus = this._getTimeStatus(minSlot, slotAvailable, slotSelected, maxSlotPerVoucher, data.getIn([DATA.DEAL, 'deal_type']));

            let needReset = newTimeStatus !== TimeBaseStatus.AVAILABLE;

            if (needReset) {
                data = data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
                data = this._checkWarningOfTimeSelected(data, undefined);
            }
            else {
                data = this._checkWarningOfTimeSelected(data, timePicked);
            }
        }

        if (!!data.getIn([DATA.FLASH_SALE], 'times')) {
            const timeOfFlashSale = this._reCheckTimes(data.getIn([DATA.FLASH_SALE, 'times']), slotSelected, data.getIn([DATA.DEAL, 'deal_type']));
            data = data.updateIn([DATA.FLASH_SALE, 'times'], () => timeOfFlashSale);
        }

        resolve(data);
    });

    _reCheckTimes = (times, slotSelected, dealType) => {
        if (!times || times.size < 1) return undefined;
        return times.map((time, index) => {

            if (!!time.get('divider')) return time;

            const minSlot = time.get('min_slot', 0);
            const slotAvailable = time.get('slotAvailable', 0);
            const maxSlotPerVoucher = time.get('max_slot_per_voucher', 0);
            const newTimeStatus = this._getTimeStatus(minSlot, slotAvailable, slotSelected, maxSlotPerVoucher, dealType);

            if (newTimeStatus !== time.get('status')) {
                time = time.updateIn(['status'], () => newTimeStatus);
            }

            return time;
        });
    }

    _prepareScheduleByDateChanged = (dt, date) => new Promise(resolve => {
        let data = dt.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'date'], () => date);

        let schedules = data.getIn([DATA.TIMEBASE_BOOKING, 'schedules'], []);
        const dateSelectedSchedule = schedules.filter((schedule, index) => {
            return moment.utc(schedule.get('start_valid_time', '')).local().isSame(date, 'day');
        });

        resolve(data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'schedules'], () => dateSelectedSchedule));
    })

    _prepareScheduleAndDate = (dt, schedules) => {

        let schedulesSorted = schedules.sort((s1, s2) => {
            const startValidTime1 = moment.utc(s1.get('start_valid_time', '')).local();
            const startValidTime2 = moment.utc(s2.get('start_valid_time', '')).local();
            if (startValidTime1.isSame(startValidTime2)) return 0;
            if (startValidTime1.isBefore(startValidTime2)) return -1;
            return 1;
        });

        const currentTime = new Date();
        let dates = fromJS([{
            time: currentTime,
            type: 'normal'
        }]);

        schedulesSorted = schedulesSorted
            .filter(schedule => {
                return moment.utc(schedule.get('end_valid_time', '')).local().isAfter(currentTime, 'minute');
            })
            .filter(schedule => {
                const find = schedule.get('min_slot', 0) > 0;
                if (!!find) {
                    const startValidTime = moment.utc(schedule.get('start_valid_time', '')).local();
                    const count = dates.count((date) => {
                        return startValidTime.isSame(date.get('time'), 'day');
                    });
                    if (count < 1) dates = dates.push(fromJS({
                        time: startValidTime.toDate(),
                        type: 'normal'
                    }));
                }
                return find;
            });

        let data = dt.updateIn([DATA.TIMEBASE_BOOKING, 'schedules'], () => schedulesSorted);
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'dates'], () => dates);

        return this._prepareTimebaseWithInitializationStep(data);
    }

    _prepareTimebaseWithInitializationStep = (data) => {
        const dates = data.getIn([DATA.TIMEBASE_BOOKING, 'selected', 'dates']);
        const schedules = data.getIn([DATA.TIMEBASE_BOOKING, 'schedules']);

        let dateSelected = undefined;
        let slotSelected = 0;
        let minOfMinSlot = 0;
        let maxOfMinSlot = 0;
        let maxOfMaxSlotPerVoucher = 0;
        let maxSlotAvailable = 0;
        let times = [];

        const dealType = data.getIn([DATA.DEAL, 'deal_type']);
        const currentTime = new Date();

        for (let i = 0; i < dates.size; i++) {

            let schedulesByDate = schedules.filter(schedule => {

                const startValidTime = moment.utc(schedule.get('start_valid_time', '')).local();
                const isSameDay = startValidTime.isSame(dates.getIn([i, 'time']), 'day');

                if (dealType === DEAL_TYPE_MOVIE) {
                    return !!isSameDay && startValidTime.isSameOrAfter(currentTime, 'minutes')
                }

                return isSameDay;
            });

            if (!schedulesByDate || schedulesByDate.size < 1) continue;

            dateSelected = undefined;
            slotSelected = 0;
            minOfMinSlot = 0;
            maxOfMinSlot = 0;
            maxOfMaxSlotPerVoucher = 0;
            maxSlotAvailable = 0;
            times = [];

            //get slot of all schedule in date
            schedulesByDate.map(schedule => {
                const minSlot = schedule.get('min_slot', 0);
                const maxSlot = schedule.get('max_slot', 0);
                const usedSlot = schedule.get('used_slot', 0);
                const maxSlotPerVoucher = schedule.get('max_slot_per_voucher', 0);

                const slotAvailable = maxSlot - usedSlot;

                if (minOfMinSlot === 0 || minOfMinSlot > minSlot) minOfMinSlot = minSlot;
                if (maxOfMinSlot === 0 || maxOfMinSlot < minSlot) maxOfMinSlot = minSlot;
                if (maxOfMaxSlotPerVoucher === 0 || maxOfMaxSlotPerVoucher < maxSlotPerVoucher) maxOfMaxSlotPerVoucher = maxSlotPerVoucher;
                if (maxSlotAvailable === 0 || maxSlotAvailable < slotAvailable) maxSlotAvailable = slotAvailable;
            });

            slotSelected = maxOfMinSlot;

            if (dates.size > 1 && (maxSlotAvailable < 1 || maxSlotAvailable < minOfMinSlot)) continue;

            dateSelected = dates.getIn([i, 'time']);

            //prepare time to pick
            schedulesByDate.map((schedule, index) => {

                const timeOfSchedule = this._getTimeFromSchedule(currentTime, schedule, slotSelected, data.getIn([DATA.DEAL, 'deal_type']));

                times.push(...timeOfSchedule);
                if (!!timeOfSchedule && timeOfSchedule.size > 0 && index + 1 < schedulesByDate.size) {
                    times.push({divider: 1});
                }
            });

            if (times.length > 0) break;
        }

        if (times.length < 1) {
            dateSelected = new Date();
        }

        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'isLoading'], () => false);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'minOfMinSlot'], () => minOfMinSlot);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMinSlot'], () => maxOfMinSlot);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'maxOfMaxSlotPerVoucher'], () => maxOfMaxSlotPerVoucher);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'maxSlotAvailable'], () => maxSlotAvailable);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'times'], () => fromJS(times));
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'date'], () => dateSelected);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'selected', 'slot'], () => slotSelected);
        data =  data.deleteIn([DATA.TIMEBASE_BOOKING, 'selected', 'time']);
        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'errorTimeSelectedMessage'], () => undefined);
        data = this._checkWarning(
            data,
            maxOfMinSlot,
            maxSlotAvailable,
            minOfMinSlot,
            slotSelected
        );

        try {
            if (moment().isBefore(dateSelected, 'day')) {
                data = data.updateIn([DATA.TIMEBASE_BOOKING, 'showTooltipAutoChangeDate'], () => true);
            }
        } catch (e) {
            console.log(e);
        }

        if (times.length < 1) {
            data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.NOT_VALID);
        }
        else {
            data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'status'], () => TimeBaseStatus.CTA_AVAILABLE);
        }

        return data;
    }

    _getTimeFromSchedule = (currentTime, schedule, slotSelected, dealType, type) => {
        const endValidTime = moment.utc(schedule.get('end_valid_time', '')).local();
        const startValidTime = moment.utc(schedule.get('start_valid_time', '')).local();

        if (dealType === DEAL_TYPE_MOVIE && startValidTime.isBefore(currentTime)) return [];
        else if (endValidTime.isBefore(currentTime)) return [];

        const minSlot = schedule.get('min_slot', 0);
        const maxSlot = schedule.get('max_slot', 0);
        const usedSlot = schedule.get('used_slot', 0);
        const maxSlotPerVoucher = schedule.get('max_slot_per_voucher', 0);
        const id = schedule.get('id', '');
        const highlight = schedule.get('highlight', '');

        const slotAvailable = maxSlot - usedSlot;

        let status = this._getTimeStatus(minSlot, slotAvailable, slotSelected, maxSlotPerVoucher, dealType);

        let times = List();

        if (dealType === DEAL_TYPE_MOVIE) {
            times = times.push(
                {
                    time: startValidTime.toDate(),
                    highlight: highlight,
                    id: id,
                    max_slot_per_voucher: maxSlotPerVoucher,
                    min_slot: minSlot,
                    slotAvailable: slotAvailable,
                    status: status
                }
            );
            return times;
        }

        const minutes = startValidTime.minute();
        const addMinutes = 15 - minutes % 15; //round 15 minutes
        if (addMinutes !== 0 && addMinutes !== 15) startValidTime.add(addMinutes, 'minutes');

        while(startValidTime.diff(endValidTime, 'minutes') <= 0) {
            if (startValidTime.isSameOrAfter(currentTime, 'minutes')) {
                times = times.push(
                    {
                        time: startValidTime.toDate(),
                        highlight: highlight,
                        id: id,
                        max_slot_per_voucher: maxSlotPerVoucher,
                        min_slot: minSlot,
                        slotAvailable: slotAvailable,
                        status: status,
                        type: type
                    }
                );
            }
            startValidTime.add(15, 'minutes');
        }

        return times;
    }

    _getTimeStatus = (minSlot, slotAvailable, slotSelected, maxSlotPerVoucher, dealType) => {
        //chay ban
        if (slotAvailable < minSlot) return TimeBaseStatus.SOLD_OUT;

        if (dealType !== DEAL_TYPE_MOVIE) {
            //sl < x
            if (slotSelected > maxSlotPerVoucher) return TimeBaseStatus.OVER_SLOT;
            //sl > x
            if (slotSelected < minSlot) return TimeBaseStatus.NOT_ENOUGH_MIN_SLOT;
            //Ko du cho
            if (slotSelected > slotAvailable) return TimeBaseStatus.NOT_ENOUGH_SLOT;
        }

        return TimeBaseStatus.AVAILABLE;
    }

    _checkWarning = (data, maxOfMinSlot, maxSlotAvailable, minOfMinSlot, slotSelected) => {
        let errorMessage = undefined;
        let storeUnit = 'cửa hàng';
        let storeUnit2 = 'Cửa hàng';
        let slotUnit = 'bàn';

        const dealType = data.getIn([DATA.DEAL, 'deal_type']);
        if (dealType === DEAL_TYPE_MOVIE) {
            storeUnit = 'rạp chiếu';
            storeUnit2 = 'Rạp chiếu';
            slotUnit = 'vé';
        }

        if (maxSlotAvailable >= 0 && slotSelected > 0) {
            if (maxSlotAvailable < minOfMinSlot) {
                errorMessage =  `🔥 Cháy ${slotUnit}! Chọn lại ${storeUnit} và thời gian`;
            }
            else if (dealType !== DEAL_TYPE_MOVIE && slotSelected > 0 && maxSlotAvailable < slotSelected && maxSlotAvailable > 0) {
                errorMessage = `Cửa hàng này chỉ còn cho ${maxSlotAvailable} ${dealSlotUnit(data.getIn([DATA.DEAL, 'hint_text'], ''))}`;
            }
            else if (dealType !== DEAL_TYPE_MOVIE && maxSlotAvailable > 0 && maxSlotAvailable < 10) {
                errorMessage = `⚡ Nhanh lên! ${storeUnit2} này chỉ còn cho ${maxSlotAvailable} ${dealSlotUnit(data.getIn([DATA.DEAL, 'hint_text'], ''))}`;
            }
        }

        data =  data.updateIn([DATA.TIMEBASE_BOOKING, 'errorMessage'], () => errorMessage);

        return data;
    }

    _checkWarningOfTimeSelected = (data, time) => {
        if (data.getIn([DATA.DEAL, 'deal_type']) === DEAL_TYPE_MOVIE) return data.updateIn([DATA.TIMEBASE_BOOKING, 'errorTimeSelectedMessage'], () => undefined);

        let message = undefined;

        if (!!time) {
            const slotAvailable = time.get('slotAvailable', 0);
            if (slotAvailable > 0 && time.get('max_slot_per_voucher', 0) > 0 && slotAvailable < 10) {
                message = `⚡ Nhanh lên! Giờ này chỉ còn cho ${slotAvailable} ${dealSlotUnit(data.getIn([DATA.DEAL, 'hint_text'], ''))}`;
            }
        }
        data = data.updateIn([DATA.TIMEBASE_BOOKING, 'errorTimeSelectedMessage'], () => message);
        return data;
    }
}