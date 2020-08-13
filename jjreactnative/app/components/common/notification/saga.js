// import {call, put, take} from "redux-saga/effects";
// import moment from 'moment/min/moment-with-locales';
// import {Map} from 'immutable'
//
// moment.locale('vi')
// import firebase from 'react-native-firebase'
// import {
//     SET_COUPON_ALARM,
//     REMOVE_COUPON_ALARM,
//     getCouponAlarmSuccess,
//     GET_COUPON_ALARM
// } from './action';
// import {AsyncStorage} from "react-native";
// import {DEAL_TYPE_EXCLUSIVE, STORAGE} from "../../../const";
//
// function* setCouponAlarm(coupon) {
//     try {
//         if (coupon && Map.isMap(coupon)) coupon = coupon.toJS();
//         console.log('setCouponAlarm:saga', coupon);
//
//         if (coupon === undefined || coupon === null) return;
//         const value = yield AsyncStorage.getItem(`${STORAGE}:coupon_alarms`);
//
//         let alarms = null;
//         let alarmHasSetted = null;
//         if (value !== null) {
//             alarms = JSON.parse(value);
//             for (let i = 0; i < alarms.length; i++) {
//                 let alarm = alarms[i];
//                 if (alarm.data && alarm.data.coupon && alarm.data.coupon.code === coupon.code) {
//                     alarmHasSetted = alarm;
//                     break;
//                 }
//             }
//         }
//
//         console.log('setCouponAlarm:saga:alarmHasSetted', alarmHasSetted)
//
//         if (alarmHasSetted !== null) return;
//
//         let title = 'Nhớ sử dụng Mã ưu đãi JAMJA';
//         let message = 'Mã ưu đãi: ' + coupon.code;
//
//         let deal = coupon.deal;
//         const brandName = deal.brand !== undefined && deal.brand !== null ? deal.brand.brand_name : '';
//         message += ' tại ' + brandName;
//
//         if (deal.stores !== undefined && deal.stores !== null && Array.isArray(deal.stores) && deal.stores.length > 0) {
//             message += ' - ' + deal.stores[0].address;
//         }
//
//         let time = null;
//
//         const currentTime = moment();
//
//         if (DEAL_TYPE_EXCLUSIVE === deal.deal_type) {
//             const endSaleTimeDate = moment.utc(deal.end_sale_time).local();
//             const diff = endSaleTimeDate.diff(currentTime, 'minutes')
//             if (diff <= 3 * 60) return;
//             if (diff > 24 * 60) {
//                 time = endSaleTimeDate.subtract(24, 'hours');
//             } else if (diff > 3 * 60) {
//                 time = endSaleTimeDate.subtract(3, 'hours');
//             }
//
//         } else {
//             const checkinDate = moment.unix(coupon.check_in_time).local();
//             const diff = checkinDate.diff(currentTime, 'minutes')
//             if (diff < 15) return;
//             time = checkinDate.subtract(15, 'minutes');
//         }
//
//         const scheduleNotification = new firebase.notifications.Notification()
//             .setTitle(title)
//             .setBody(message)
//             .setData({
//                 type: 'coupon_alarm',
//                 coupon: {
//                     code: coupon.code,
//                     id: coupon.id,
//                     deal: {
//                         id: deal.id,
//                         slug: deal.slug,
//                         deal_type: deal.deal_type
//                     }
//                 }
//             });
//         scheduleNotification.setSound("default");
//         scheduleNotification.android.setChannelId('JAMJA');
//         scheduleNotification.android.setPriority(firebase.notifications.Android.Priority.Max);
//         scheduleNotification.android.setAutoCancel(true);
//
//         const d = new Date();
//         d.setMinutes(d.getSeconds() + 10);
//
//         const schedule = firebase.notifications()
//             .scheduleNotification(scheduleNotification, {
//                 fireDate: time.toDate().getTime()
//             });
//         schedule.then(response => {
//             console.log('---->>>scheduleNotification:response', response)
//         }).catch(error => {
//             console.log('---->>>scheduleNotification:error', error)
//         });
//
//         let notification = {
//             id: scheduleNotification.notificationId,
//             type: 'coupon_alarm',
//             title: title,
//             message: message,
//             data: {
//                 coupon: {
//                     code: coupon.code,
//                     id: coupon.id,
//                     deal: {
//                         id: deal.id,
//                         slug: deal.slug,
//                         deal_type: deal.deal_type
//                     }
//                 }
//             }
//         };
//         if (alarms === null) {
//             alarms = [notification];
//         } else {
//             alarms = [...alarms, notification];
//         }
//
//         console.log('setAlarms:saga:alarms:', alarms);
//
//         const result = yield AsyncStorage.setItem(`${STORAGE}:coupon_alarms`, JSON.stringify(alarms), error => {
//             console.log(error);
//         });
//         console.log('setAlarms:saga:result:', result);
//
//         yield call(getCouponAlarm);
//
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// function* getCouponAlarm() {
//     try {
//         const value = yield AsyncStorage.getItem(`${STORAGE}:coupon_alarms`);
//         // console.log('getCouponAlarm:saga', value);
//         if (value !== null) {
//             yield put(getCouponAlarmSuccess(JSON.parse(value)));
//             return;
//         }
//         yield put(getCouponAlarmSuccess([]));
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// function* removeCouponAlarm(coupon) {
//     try {
//         if (coupon && Map.isMap(coupon)) coupon = coupon.toJS();
//         console.log('removeCouponAlarm:saga', coupon)
//         if (coupon === undefined || coupon === null) return;
//         const value = yield AsyncStorage.getItem(`${STORAGE}:coupon_alarms`);
//
//         let alarms = null;
//         let alarmHasSetted = null;
//         if (value !== null) {
//             alarms = JSON.parse(value);
//             for (let i = 0; i < alarms.length; i++) {
//                 let alarm = alarms[i];
//                 if (alarm.data && alarm.data.coupon && alarm.data.coupon.code === coupon.code) {
//                     alarmHasSetted = alarm;
//                     break;
//                 }
//             }
//         }
//
//         if (alarmHasSetted === null) return;
//         firebase.notifications()
//             .cancelNotification(alarmHasSetted.id)
//             .then(response => {
//                 console.log('---->>>> cancelNotification:response', response)
//             })
//             .catch(error => {
//                 console.log('---->>>> cancelNotification:error', error)
//             });
//
//         for (let i = 0; i < alarms.length; i++) {
//             let alarm = alarms[i];
//             if (alarm.data &&
//                 alarm.data.coupon &&
//                 alarmHasSetted.data &&
//                 alarmHasSetted.data.coupon &&
//                 alarm.data.coupon.code === alarmHasSetted.data.coupon.code) {
//                 alarms.splice(i, 1);
//                 break;
//             }
//         }
//
//         const result = yield AsyncStorage.setItem(`${STORAGE}:coupon_alarms`, JSON.stringify(alarms), error => {
//             console.log(error);
//         });
//         console.log('removeAlarms:saga:result:', result);
//
//         yield call(getCouponAlarm);
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export function* watchSetCouponAlarm() {
//     while (true) {
//         const {data} = yield take(SET_COUPON_ALARM);
//         yield call(setCouponAlarm, data);
//     }
// }
//
// export function* watchGetCouponAlarm() {
//     while (true) {
//         const {a} = yield take(GET_COUPON_ALARM);
//         yield call(getCouponAlarm, a);
//     }
// }
//
// export function* watchRemoveCouponAlarm() {
//     while (true) {
//         const {data} = yield take(REMOVE_COUPON_ALARM);
//         yield call(removeCouponAlarm, data);
//     }
// }