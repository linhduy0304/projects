// import {Alert, Platform, StatusBar} from 'react-native';
// import { AppState, StyleSheet, BackHandler } from "react-native";
// import {ScrollableTab, Tab, Tabs} from 'native-base'
// import { connect } from 'react-redux';
// import moment from 'moment/min/moment-with-locales';
// import React  from 'react';
//
// import HomeTabItem from './common/HomeTabItem';
// import TabBooking from './tabBooking/TabBooking';
// import TabDiscovery from './tabDiscovery/TabDiscovery';
// import {COLOR_LINE} from "../resources/colors";
// import {couponApi} from '../api/coupon-api'
// import NotificationAndTrackingService from './common/analytics/NotificationAndTrackingService'
// import JJLocationManager from '../utils/locationmanager/JJLocationManager'
// import {BasePureComponent} from "./common/BasePureComponent";
// import {ConfigDb} from "../api/storage/ConfigDb";
// import {provinceChanged} from "../utils/locationmanager/action";
// import {updateFirstCampaignSource} from "./config/action";
// import TabEvent from './tabEvent'
// import {StringUtil} from '../utils/string-util'
// import {AnalyticsUtil} from './common/analytics/analytics'
//
// moment.locale('vi');
//
// const ios = Platform.OS === 'ios';
//
// class Home extends BasePureComponent {
//
//     hasRequestChangeProvince = false;
//     lastAppState = undefined;
//     currentPage = 0;
//     locationManager: JJLocationManager;
//
//     static navigationOptions = {
//         header: null,
//     }
//
//     constructor(props, context) {
//         super(props, context);
//         this.notificationAndTrackingService = new NotificationAndTrackingService(props.navigation, props.dispatch);
//         this.locationManager = new JJLocationManager(props.dispatch);
//         if (!ios) {
//             this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
//                 BackHandler.addEventListener('hardwareBackPress', this._onBackPressListener)
//             );
//         }
//
//         let currentEventTabData = undefined;
//         if (!!props && !!props.eventConfig && props.eventConfig.size > 0) {
//             currentEventTabData = props.eventConfig.find((e, i) => e.get('province') === props.selectedProvinceId);
//         }
//
//         this.state = {
//             currentEventTabData,
//             supportEvent: !!currentEventTabData
//         };
//     }
//
//     render() {
//         return (
//             <Tabs
//                 ref={'ScrollableTab'}
//                 style={styles.container}
//                 locked={true}
//                 scrollWithoutAnimation={true}
//                 initialPage={0}
//                 tabBarPosition='bottom'
//                 renderTabBar={this._renderTabBar}
//                 onChangeTab={this._onTabMainChangeListener}
//             >
//
//                 <Tab key={'tab_discovery'}
//                      heading={'search_deal_o:Dạo xem'}>
//                     <TabDiscovery
//                         goToBookingTab={this.goToTabBooking}
//                         onToggleBurger={this.props.onToggleBurger}
//                         setOnScrollToTopMethod={this._onSetTabDiscoveryListScrollable}
//                         navigation={this.props.navigation}/>
//                 </Tab>
//
//                 {
//                     !!this.state.currentEventTabData &&
//                     <Tab key={'tab_event'}
//                          heading={'search_deal_o:Event'}>
//                         <TabEvent
//                             notSupport={!this.state.supportEvent}
//                             config={this.state.currentEventTabData}
//                             onToggleBurger={this.props.onToggleBurger}
//                             navigation={this.props.navigation}/>
//
//                     </Tab>
//                 }
//
//                 <Tab key={'tab_booking'}
//                      heading={'booking_o:Đặt chỗ'}>
//                     <TabBooking
//                         onToggleBurger={this.props.onToggleBurger}
//                         setOnScrollToTopMethod={this._onSetTabBookingListScrollable}
//                         navigation={this.props.navigation}/>
//                 </Tab>
//
//             </Tabs>
//         )
//     }
//
//     _renderTabBar = () => <ScrollableTab renderTab={this._renderTab}
//                                          backgroundColor={'white'}
//                                          style={{borderWidth: 0}}
//                                          underlineStyle={{height: 0, backgroundColor: 'white', borderWidth: 0}}
//                                          tabsContainerStyle={{borderTopWidth: 1, borderTopColor: COLOR_LINE, borderBottomWidth: 0}}/>;
//
//     _renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
//
//         let tabName = undefined;
//         let tabIcon = undefined;
//         let tabIconUri = undefined;
//
//         switch (page) {
//             case 0:
//                 tabName = 'Dạo xem';
//                 tabIcon = 'search_deal_o';
//                 break;
//
//             case 2:
//                 tabName = 'Đặt chỗ';
//                 tabIcon = 'booking_o';
//                 break;
//
//             default:
//                 if (!!this.state.currentEventTabData) {
//                     tabName = this.state.currentEventTabData.get('icon_title', '');
//                     tabIconUri = this.state.currentEventTabData.get('icon', '');
//                 }
//                 else {
//                     tabName = 'Đặt chỗ';
//                     tabIcon = 'booking_o';
//                 }
//                 break;
//         }
//
//         return (
//             <HomeTabItem key={`${name}_${page}`}
//                          name={tabName}
//                          active={isTabActive}
//                          icon={tabIcon}
//                          uri={tabIconUri}
//                          page={page}
//                          navigation={this.props.navigation}
//                          onLayoutHandler={onLayoutHandler}
//                          onPressHandler={onPressHandler}/>
//         )
//     }
//
//     _onSetTabDiscoveryListScrollable = (scrollView) => {
//         this.tabDiscoveryListScrollable = scrollView;
//     }
//
//     _onSetTabBookingListScrollable = (scrollView) => {
//         this.tabBookingListScrollable = scrollView;
//     }
//
//     _onTabMainChangeListener = (tab) => {
//         if (tab.i === this.currentPage) {
//             if (tab.i === 0) {
//                 if (!!this.tabDiscoveryListScrollable) this.tabDiscoveryListScrollable();
//             }
//             else if (!!this.state.currentEventTabData && tab.i === 2) {
//                 if (!!this.tabBookingListScrollable) this.tabBookingListScrollable();
//             }
//             else if (!this.state.currentEventTabData && tab.i === 1) {
//                 if (!!this.tabBookingListScrollable) this.tabBookingListScrollable();
//             }
//         }
//         else {
//             this._updateStatusBar(tab.i);
//         }
//         this.currentPage = tab.i;
//     }
//
//     _updateStatusBar = (tabIndex) => {
//         try {
//             let style = 'dark-content';
//             let statusBackgroundColor = 'transparent';
//
//             if (tabIndex === 0) {
//                 if (!this.props.brandDayTheme) style = 'dark-content';
//                 if (this.props.brandDayTheme === 'dark') style = 'light-content';
//             }
//             else if (tabIndex === 1) {
//                 if (!!this.state.currentEventTabData) {
//                     statusBackgroundColor = this.state.currentEventTabData.get('theme_color', 'transparent');
//                     style = 'light-content';
//                 }
//                 else {
//                     statusBackgroundColor = 'white';
//                 }
//             }
//             else if (tabIndex === 2) {
//                 statusBackgroundColor = 'white';
//             }
//
//             StatusBar.setBarStyle(style, true);
//             StatusBar.setBackgroundColor(statusBackgroundColor);
//         } catch (e) {
//             console.log(e);
//             AnalyticsUtil.logCrash(e, 0, '_updateStatusBar');
//         }
//     }
//
//     goToTabBooking = () => this.refs.ScrollableTab.goToPage(!!this.state.currentEventTabData ? 2 : 1);
//
//     _getUnRateCoupon = () => {
//         if (!!this.props.isLoginnedMerchant || !this.props.isLoginned) return;
//         couponApi.getUnRateCoupon()
//             .then(response => {
//                 console.log('_getUnRateCoupon', response)
//
//                 if (response === undefined || response === null || !response.hasOwnProperty('objects')) return;
//                 let coupons = response.objects;
//                 if (coupons === undefined || coupons === null || coupons.length < 1) return;
//                 this._openRateCoupon(coupons)
//             })
//             .catch(error => {
//                 console.log('getUnRateCoupon:error', error);
//             })
//     }
//
//     _openRateCoupon = (cps) => {
//         const coupons = [];
//         if (cps === undefined || cps === null || cps.length < 1) return;
//         let timeNow = moment();
//         for (let i = 0; i < cps.length; i++) {
//             let coupon = cps[i];
//             let now = moment.utc(coupon.created).local().diff(timeNow, 'minutes');
//             if (now < -30) coupons.push(coupon);
//         }
//         if (coupons.length < 1) return;
//         this.props.navigation.navigate('RateCoupon', { coupons: coupons })
//     }
//
//     _handleAppState = (newState) => {
//         console.log('***Home:_handleAppState:', newState, this.lastAppState);
//         // if (newState === 'active' && this.lastAppState === 'background' && !!this.locationManager)  this.locationManager.fetchLocationCoordinate();
//         this.lastAppState = newState;
//     }
//
//     _onBackPressListener = () => {
//         if (this.props.navigation.isFocused() && this.refs.ScrollableTab.state.currentPage === 1) {
//             this.refs.ScrollableTab.goToPage(0);
//             return true;
//         }
//         return false;
//     }
//
//     _onProvinceChanged = (province) => {
//         console.log('_onProvinceChanged', province);
//         if (!this.props.selectedProvince) return;
//
//         if (this.props.navigation.isFocused() && !this.hasRequestChangeProvince && this.props.selectedProvince.get('id') !== province.id) {
//             this.hasRequestChangeProvince = true;
//             Alert.alert(
//                 'Lưu ý',
//                 `JAMJA nhận thấy bạn không còn ở khu vực ${this.props.selectedProvince.get('name', '')}. Bạn có muốn thay đổi khu vực đến ${province.name} để xem các khuyến mãi xung quanh?`,
//                 [
//                     { text: "ĐÓNG" },
//                     {
//                         text: "ĐỒNG Ý",
//                         onPress: () => {
//                             ConfigDb.updateSelectedProvince(province);
//                             this.props.dispatch(provinceChanged(province));
//                         }
//                     }
//                 ],
//                 {
//                     cancelable: true
//                 }
//             )
//         }
//     }
//
//     async componentDidMount() {
//         super.componentDidMount();
//
//         if (!!this.props.locationSupport) {
//             this.locationManager.setProvinceSupport(this.props.locationSupport);
//         }
//         this.locationManager.startInitLocation(this._onProvinceChanged);
//
//         AppState.addEventListener('change', this._handleAppState);
//         if (!ios) {
//             this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
//                 BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener)
//             );
//         }
//
//         if (!!this.notificationAndTrackingService) this.notificationAndTrackingService.startHandler();
//
//         setTimeout(() => this.props.dispatch(updateFirstCampaignSource()), 6000);
//
//         setTimeout(() => {
//             this._getUnRateCoupon();
//         }, 500);
//
//         try {
//             setTimeout(() => {
//                 if (!!this.state.currentEventTabData &&
//                     !!this.state.currentEventTabData.get('app_event_active', false) &&
//                     !!this.refs &&
//                     !!this.refs.ScrollableTab) {
//
//                     this.refs.ScrollableTab.goToPage(1);
//                     this.currentPage = 1;
//                 }
//             }, 500);
//         } catch (e) {
//             console.log(e);
//         }
//     }
//
//     async componentWillUnmount() {
//         console.log('***Home:componentWillUnmount');
//         AppState.removeEventListener('change', this._handleAppState);
//         if (!ios) {
//             BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);
//             this._didFocusSubscription && this._didFocusSubscription.remove();
//             this._willBlurSubscription && this._willBlurSubscription.remove();
//         }
//
//         if (!!this.notificationAndTrackingService) this.notificationAndTrackingService.stopHandler();
//         if (!!this.locationManager) this.locationManager.stop();
//         super.componentWillUnmount();
//     }
//
//     async componentWillReceiveProps(nextProps) {
//         if (!!nextProps.locationSupport && !this.props.locationSupport) this.locationManager.setProvinceSupport(nextProps.locationSupport);
//
//         if (!StringUtil.isEmpty(this.props.selectedProvinceId) && nextProps.selectedProvinceId !== this.props.selectedProvinceId) {
//
//             if (!!this.props.eventConfig && this.props.eventConfig.size > 0) {
//                 const nextConfig = this.props.eventConfig.find((e, i) => e.get('province') === nextProps.selectedProvinceId);
//
//                 if (!nextConfig) {
//                     this.setState({
//                         ...this.state,
//                         supportEvent: false
//                     });
//                     return;
//                 }
//
//                 this.setState({
//                     ...this.state,
//                     currentEventTabData: nextConfig,
//                     supportEvent: true
//                 })
//             }
//         }
//
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         isLoginned: state.loginReducer.isLoginned,
//         //Merchant
//         isLoginnedMerchant: state.loginMerchantReducer.isLoginnedMerchant,
//         //Location
//         selectedProvinceId: state.locationReducer.getIn(['province', 'id'], ''),
//         selectedProvince: state.locationReducer.get('province'),
//         locationSupport: state.locationReducer.get('locationSupport'),
//
//         eventConfig: state.homepageDealsReducer.get('eventConfig'),
//         brandDayTheme: state.homepageDealsReducer.get('brandDayTheme')
//     };
// }
//
// export default connect(mapStateToProps)(Home);
//
// const styles = StyleSheet.create({
//     container: {
//         marginTop: 0,
//         borderBottomWidth: 0,
//         borderBottomColor: 'white'
//     }
// })