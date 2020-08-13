// import React from 'react'
// import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native'
// import {Text} from 'native-base'
// import JJIcon from '../JJIcon'
// import PropTypes from 'prop-types'
// import {BasePureComponent} from "../BasePureComponent";
// import {DIMENSION_BUTTON_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER} from "../../../resources/dimens";
// import {connect} from "react-redux";
// import {setCouponAlarm, getCouponAlarm, removeCouponAlarm} from '../../common/notification/action'
// import {AnalyticsUtil} from '../analytics/analytics'
//
// class AlarmButton extends BasePureComponent {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             isActive: false
//         }
//     }
//
//     render() {
//         console.log('AlarmButton:render', this.state)
//         return (
//             <TouchableOpacity style={[styles.buttonAlarm]}
//                               onPress={() => this._onChangeAlarmAction()}>
//                 <JJIcon name={this.state.isActive ? 'bell_off_o' : 'bell_o'}
//                         color={'#ef863b'}
//                         size={14}
//                         style={{paddingTop: 2, marginRight: 5}}/>
//
//                 <Text style={{fontSize: DIMENSION_TEXT_HEADER, paddingLeft: 0, color: '#ef863b', fontWeight: 'bold'}}>
//                     {this.state.isActive ? 'Huỷ nhắc nhở' : 'Đặt nhắc nhở'}
//                 </Text>
//             </TouchableOpacity>
//         )
//     }
//
//     _onChangeAlarmAction = () => {
//         console.log('_onChangeAlarmAction', this.props.coupon);
//         const trackingParams = {
//             action_location: !!this.props.from ? this.props.from : 'alarm_button',
//             action_name: 'click_alarm_button',
//             item_id: this.props.coupon.getIn(['deal', 'id'], ''),
//             item_name: this.props.coupon.getIn(['deal', 'id'], ''),
//             item_brand: this.props.coupon.getIn(['deal', 'brand', 'id'], ''),
//             deal_type: this.props.coupon.getIn(['deal', 'deal_type'], ''),
//             coupon: this.props.coupon.get('id', '')
//         }
//         if (this.state.isActive) {
//             AnalyticsUtil.logNormalEvent(
//                 'cancel_coupon_reminder_alert',
//                 trackingParams,
//                 'action_coupon'
//             );
//             Alert.alert(
//                 'Chú ý',
//                 'Bạn có chắc chắn muốn hủy nhắc nhở sử dụng mã đặt chỗ?',
//                 [
//                     { text: "ĐÓNG" },
//                     { text: "ĐỒNG Ý", onPress: () => {
//                             AnalyticsUtil.logNormalEvent(
//                                 'cancel_coupon_reminder_confirm',
//                                 trackingParams,
//                                 'action_coupon'
//                             );
//                         this.props.dispatch(removeCouponAlarm(this.props.coupon))
//                     } }
//                 ],
//                 {
//                     cancelable: true
//                 }
//             )
//         } else {
//             AnalyticsUtil.logNormalEvent(
//                 'set_coupon_reminder_alert',
//                 trackingParams,
//                 'action_coupon'
//             );
//             Alert.alert(
//                 'Để nhắc bạn khỏi quên',
//                 'JAMJA sẽ nhắc bạn sử dụng mã đặt chỗ vào thời điểm thích hợp!',
//                 [
//                     { text: "ĐÓNG" },
//                     { text: "ĐỒNG Ý", onPress: () => {
//                             AnalyticsUtil.logNormalEvent(
//                                 'set_coupon_reminder_confirm',
//                                 trackingParams,
//                                 'action_coupon'
//                             );
//                             this.props.dispatch(setCouponAlarm(this.props.coupon))
//                     } }
//                 ],
//                 {
//                     cancelable: true
//                 }
//             )
//         }
//     }
//
//     componentDidMount() {
//         super.componentDidMount();
//         this.props.dispatch(getCouponAlarm())
//     }
//
//     componentWillReceiveProps(nextProps) {
//         const alarms = nextProps.alarms;
//         console.log('AlarmButton:componentWillReceiveProps:', 'alarms:', alarms);
//         if (!alarms) return;
//         const result = alarms.filter(
//             (alarm, index) => {
//                 return alarm.get('type') === 'coupon_alarm' && alarm.get('data') && alarm.get('data').get('coupon') && alarm.get('data').get('coupon').get('code') === this.props.coupon.get('code', '');
//             }
//         );
//         this.setState({isActive: result.size > 0})
//     }
// }
//
// AlarmButton.propTypes = {
//     coupon: PropTypes.object.isRequired,
//     from: PropTypes.any
// };
//
// const styles = StyleSheet.create({
//     buttonAlarm: {
//         flex: 1,
//         height: DIMENSION_BUTTON_MEDIUM,
//         borderWidth: 1,
//         borderColor: '#ef863b',
//         borderRadius: DIMENSION_RADIUS_MEDIUM,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row'
//     },
// });
//
// function mapStateToProps(state) {
//     return {
//         alarms: state.notificationReducer.get('alarms')
//     };
// }
//
// export default connect(mapStateToProps)(AlarmButton);