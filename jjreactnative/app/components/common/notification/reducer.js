// import {
//     GET_COUPON_ALARM_SUCCESS
// } from './action';
// import {fromJS} from 'immutable'
//
// const initState = fromJS({
//     alarms: []
// })
//
// const notificationReducer = (state = initState, action) => {
//     switch (action.type) {
//         case GET_COUPON_ALARM_SUCCESS:
//             console.log('GET_COUPON_ALARM_SUCCESS', action)
//             return state.updateIn(['alarms'], () => fromJS(action.alarms || []));
//         default:
//             return state;
//     }
// }
//
// export default notificationReducer;