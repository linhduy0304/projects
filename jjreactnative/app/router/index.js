import React from 'react';
import { StatusBar, Easing, Animated } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { StringUtil } from '../utils/string-util';
import { ObjectUtil } from '../utils/object-utils';
import { AnalyticsUtil } from '../components/common/analytics/analytics';
import { getScreenTrackingParams } from '../common/analytics/TrackingUtil';
import { AppConfig } from '../common/config';
import { BACK, NAVIGATE, PUSH, REPLACE, REPLACE_WITH } from './navigation-actions';

import MenuDrawer from '../components/home/drawer/MenuDrawer';
import SplashScreen from '../components/home/splash';
import MainTabContainer from '../router/MainTabContainer';
import DealDetail from '../components/detail/DealDetail';
import ImageSlider from '../components/detail/imageslider/ImageSlider';
import ExclusiveReservationInfo from '../components/reservationInfo/ExclusiveReservationInfo';
import RedeemCode from '../components/redeemCode/RedeemCode';
import AllStoreMenu from '../components/detail/storemenu/AllStoreMenu';
import StoreDirection from '../components/detail/applyplace/StoreDirection';
import AllComments from '../components/detail/comment/AllComments';
import AllSameCollections from '../components/collection/samecollection/AllSameCollections';
import CollectionDetail from '../components/collection/detail/CollectionDetail';
import ShoppingMall from '../components/shoppingmall/ShoppingMall';
import AppVersion from '../components/appversion/AppVersion';
import AboutBrand from '../components/detail/brandinfo/AboutBrand';
import RateDetail from '../components/detail/dealrate/ratedetail/RateDetail';
import ReportDeal from '../components/detail/reportdeal/ReportDeal';
import LastMinReservationInfo from '../components/reservationInfo/LastMinReservationInfo';
import ListStores from '../components/detail/applyplace/liststore/ListStores';
import SelectCity from '../components/home/drawer/SelectCity';
import ShoppingMallDetail from '../components/shoppingmall/detail/ShoppingMallDetail';
import MaUuDai from '../screens/MyCoupon/MaUuDai';
// import DanhDau from '../components/tabwallet/dealSaved/DanhDau';
import DanhDau from '../screens/DealSaved/index';
import TheoDoi from '../components/tabwallet/brandFollowing/TheoDoi';
import BrandDetail from '../components/brandDetail/BrandDetail';
import SearchDeal from '../components/searchDeal/SearchDeal';
import SaleProductDetail from '../components/detail/saleproduct/SaleProductDetail';
import AllSaleProduct from '../components/detail/saleproduct/AllSaleProduct';
import FoodyReview from '../components/detail/foodyreview/FoodyReview';
import RateCoupon from '../components/rateCoupon/RateCoupon';
import UserProfile from '../components/userProfile/UserProfile';
import QRCodePreview from '../components/common/qrcode/QRCodePreview';
import PromoCodeDetail from '../components/detail/promoCode/PromoCodeDetail';
import DatePicker from '../components/detail/singledeal/booking/DatePicker';
import SlotPicker from '../components/detail/singledeal/booking/SlotPicker';
import StorePicker from '../components/detail/singledeal/booking/StorePicker';
import ConfirmBooking from '../components/detail/booking/ConfirmBooking';
import BookingSuccess from '../components/detail/booking/BookingSuccess';
import BookingCountDown from '../components/detail/booking/BookingCountDown';
import ExclusiveGetCode from '../components/detail/booking/ExclusiveGetCode';
import ExclusiveGetCodeSuccess from '../components/detail/booking/ExclusiveGetCodeSuccess';
import SearchFilter from '../components/filter/SearchFilter';
import SubCategory from '../components/category/subCategory/SubCategory';
import Collections from '../components/collection/Collections';
import InAppWebView from '../components/webview/InAppWebView';
import GameGetTurnIntro from '../components/campaign_11/game/GameGetTurnIntro';
import Campaign11Game from '../components/campaign_11/game';
import GameWebView from '../components/campaign_11/GameWebView';
import LoginByPhone from '../components/login/LoginByPhone';
import MovieRoom from '../components/detail/booking/movie/room/MovieRoom';
import BhdConfirmBooking from '../components/detail/booking/movie/confirm/BhdConfirmBooking';
import BhdPayment from '../components/detail/booking/movie/payment/BhdPayment';
import MovieBookingSuccess from '../components/detail/booking/movie/success/MovieBookingSuccess';
import MovieReservationInfo from '../components/reservationInfo/MovieReservationInfo';
import Login from '../components/login/Login';
import BlankScreen from '../screens/blank/BlankScreen';

import DeliveryConfirm from '../screens/DeliveryConfirm';
import DeliveryStatus from '../screens/DeliveryStatusScreen';
import DeliveryPickMenu from '../screens/DeliveryPickMenu';
import DeliveryOrderConfirmation from '../screens/DeliveryOrderConfirmation';

import PromoCodeDetailDialog from '../screens/promoCodeDetail/PromoCodeDetailDialog';
import AliasBookingSuccess from '../screens/AliasBookingSuccess';
import OutOfLocationZone from '../screens/OutOfLocationZone';

// import TestComponent from '../test';

const DRAWER_WIDTH = AppConfig.windowWidth * 0.85;

export const Home = createDrawerNavigator(
    {
        Main: MainTabContainer
    },
    {
        drawerWidth: DRAWER_WIDTH,
        drawerPosition: 'left',
        useNativeAnimations: true,
        drawerType: 'front',
        contentComponent: MenuDrawer
    }
);

const ModalStack = createStackNavigator(
    {
        BlankScreen: { screen: BlankScreen },
        StorePicker: { screen: StorePicker },
        SelectCity: { screen: SelectCity },
        DatePicker: { screen: DatePicker },
        SlotPicker: { screen: SlotPicker },
        PromoCodeDetailDialog: { screen: PromoCodeDetailDialog }
    },
    {
        mode: 'modal',
        headerMode: 'none',
        header: null,
        transparentCard: true,
        cardStyle: {
            shadowColor: 'transparent',
            backgroundColor: 'transparent',
            opacity: 1
        },
        transitionConfig: () => ({
            containerStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
        })
    }
);

const defaultModalGetStateForAction = ModalStack.router.getStateForAction;
ModalStack.router.getStateForAction = (action, state) => {
    const newState = defaultModalGetStateForAction(action, state);

    try {
        if (!!newState && !!newState.routes && newState.routes.length > 1) {
            const blankScreenIndex = newState.routes.findIndex(r => r.routeName === 'BlankScreen');
            if (blankScreenIndex < 0) return newState;

            newState.routes.splice(blankScreenIndex, 1);
            newState.index = newState.index - 1;
        }
    } catch (e) {
        console.log(e);
    }

    return newState;
};

const ScreenTransitionConfig = (transitionProps, prevTransitionProps, isModal) => {
    return {
        transitionSpec: {
            duration: 350,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true
        },
        screenInterpolator: sceneProps => {
            // console.debug('ScreenTransitionConfig', sceneProps, transitionProps, prevTransitionProps, isModal);
            if (!sceneProps) return null;
            const { layout, position, scene } = sceneProps;

            const thisSceneIndex = scene.index;
            const height = layout.initHeight;

            if (
                ObjectUtil.getValue(transitionProps, '', ['scene', 'route', 'routeName']) !== 'ModalStack' &&
                ObjectUtil.getValue(prevTransitionProps, '', ['scene', 'route', 'routeName']) !== 'ModalStack'
            ) {
                const opacity = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.99, thisSceneIndex],
                    outputRange: [1, 0, 0]
                });
                const width = layout.initWidth;

                const translateX = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex],
                    outputRange: [width, 0]
                });

                return {
                    opacity,
                    transform: [{ translateX }]
                };
            }

            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [height, 0, 0]
            });

            return {
                transform: [{ translateY }]
            };
        }
    };
};

export const RootStack = createStackNavigator(
    {
        SplashScreen: SplashScreen,

        ModalStack: ModalStack,

        Home: Home,
        Login: { screen: Login },

        MaUuDai: { screen: MaUuDai },
        DanhDau: { screen: DanhDau },
        TheoDoi: { screen: TheoDoi },

        DealDetail: { screen: DealDetail },
        ImageSlider: { screen: ImageSlider },
        ExclusiveReservationInfo: { screen: ExclusiveReservationInfo },
        RedeemCode: { screen: RedeemCode },
        AllStoreMenu: { screen: AllStoreMenu },
        StoreDirection: { screen: StoreDirection },
        AllComments: { screen: AllComments },
        AllSameCollections: { screen: AllSameCollections },
        CollectionDetail: { screen: CollectionDetail },
        ShoppingMall: { screen: ShoppingMall },
        AppVersion: { screen: AppVersion },
        AboutBrand: { screen: AboutBrand },
        RateDetail: { screen: RateDetail },
        ReportDeal: { screen: ReportDeal },
        LastMinReservationInfo: { screen: LastMinReservationInfo },
        ListStores: { screen: ListStores },
        ShoppingMallDetail: { screen: ShoppingMallDetail },
        BrandDetail: { screen: BrandDetail },
        SearchDeal: { screen: SearchDeal },
        SaleProductDetail: { screen: SaleProductDetail },
        AllSaleProduct: { screen: AllSaleProduct },
        FoodyReview: { screen: FoodyReview },
        RateCoupon: { screen: RateCoupon },
        UserProfile: { screen: UserProfile },
        QRCodePreview: { screen: QRCodePreview },
        PromoCodeDetail: { screen: PromoCodeDetail },
        ConfirmBooking: {
            screen: ConfirmBooking,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        BookingSuccess: {
            screen: BookingSuccess,
            params: {
                statusBarStyle: 'light-content',
                themeColor: '#171717'
            },
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        BookingCountDown: {
            screen: BookingCountDown,
            params: {
                statusBarStyle: 'light-content',
                themeColor: '#171717'
            },
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        ExclusiveGetCode: { screen: ExclusiveGetCode },
        ExclusiveGetCodeSuccess: { screen: ExclusiveGetCodeSuccess },
        SearchFilter: { screen: SearchFilter },
        SubCategory: { screen: SubCategory },
        Collections: { screen: Collections },
        InAppWebView: { screen: InAppWebView },

        GameGetTurnIntro: { screen: GameGetTurnIntro },
        Campaign11Game: { screen: Campaign11Game },
        GameWebView: { screen: GameWebView },
        LoginByPhone: { screen: LoginByPhone },

        MovieRoom: {
            screen: MovieRoom,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        BhdConfirmBooking: {
            screen: BhdConfirmBooking,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        BhdPayment: {
            screen: BhdPayment,
            navigationOptions: {
                gesturesEnabled: false,
                cardStack: {
                    gesturesEnabled: false
                },
                swipeEnabled: false
            }
        },
        MovieBookingSuccess: {
            screen: MovieBookingSuccess,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        MovieReservationInfo: {
            screen: MovieReservationInfo,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        DeliveryConfirm: DeliveryConfirm,
        DeliveryStatus: {
            screen: DeliveryStatus,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        DeliveryPickMenu: DeliveryPickMenu,
        DeliveryOrderConfirmation: DeliveryOrderConfirmation,
        AliasBookingSuccess: {
            screen: AliasBookingSuccess,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        OutOfLocationZone: {
            screen: OutOfLocationZone
        }
    },
    {
        initialRouteName: 'SplashScreen',
        headerMode: 'none',
        header: null,
        transparentCard: true,
        cardStyle: {
            shadowColor: 'transparent',
            backgroundColor: 'transparent',
            opacity: 1
        },
        transitionConfig: ScreenTransitionConfig
    }
);

const defaultRootGetStateForAction = RootStack.router.getStateForAction;
const defaultRootGetActionForPathAndParams = RootStack.router.getActionForPathAndParams;
const defaultRootGetPathAndParamsForState = RootStack.router.getPathAndParamsForState;
const defaultRootGetComponentForState = RootStack.router.getComponentForState;
const defaultRootGetComponentForRouteName = RootStack.router.getComponentForRouteName;

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (!route) return null;
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route;
}

RootStack.router.getStateForAction = (action, state) => {
    const lastRouter = getActiveRouteName(state);

    // console.debug('RootStack:getStateForAction:', action, state, lastRouter);
    try {
        let newState;

        if (!!state && !!action) {
            const currentRoutes = state.routes;
            const latestRoute = currentRoutes[currentRoutes.length - 1];

            if (!!latestRoute && action.routeName === 'DealDetail' && latestRoute.routeName === 'DealDetail') {
                let nextDealSlug = ObjectUtil.getValue(action, undefined, ['params', 'slug']);
                if (StringUtil.isEmpty(nextDealSlug)) {
                    nextDealSlug = ObjectUtil.getValue(action, undefined, ['params', 'deal', 'slug']);
                }
                let latestDealSlug = ObjectUtil.getValue(latestRoute, undefined, ['params', 'slug']);
                if (StringUtil.isEmpty(latestDealSlug)) {
                    latestDealSlug = ObjectUtil.getValue(latestRoute, undefined, ['params', 'deal', 'slug']);
                }

                if (!StringUtil.isEmpty(nextDealSlug) && nextDealSlug === latestDealSlug) {
                    return state;
                }
            } else if (action.type === REPLACE_WITH) {
                let { replaceIndex, routeName, params } = action;
                let currentRoutes = state.routes;
                if (!!currentRoutes && currentRoutes.length > replaceIndex + 1) {
                    if (!replaceIndex || replaceIndex < 0) replaceIndex = 1;

                    currentRoutes.splice(currentRoutes.length - replaceIndex, replaceIndex);

                    const stateChanged = state;
                    stateChanged.routes = currentRoutes;
                    stateChanged.index = currentRoutes.length - 1;

                    newState = defaultRootGetStateForAction({ type: 'Navigation/PUSH', routeName, params }, stateChanged);
                }
            } else if (action.routeName === 'DeliveryStatus') {
                const internal = ObjectUtil.getValue(action, undefined, ['params', 'internal']);
                if (!!internal && (internal.indexOf('deep_link') >= 0 || internal.indexOf('push') >= 0)) {
                    const couponId = ObjectUtil.getValue(action, undefined, ['params', 'couponId']);
                    let currentRoutes = state.routes;

                    currentRoutes = currentRoutes.filter(r => {
                        return !(
                            !!r.routeName &&
                            ObjectUtil.getValue(r, undefined, ['params', 'couponId']) === couponId &&
                            (r.routeName.indexOf('DeliveryConfirm') >= 0 ||
                                r.routeName.indexOf('DeliveryPickMenu') >= 0 ||
                                r.routeName.indexOf('DeliveryOrderConfirmation') >= 0)
                        );
                    });

                    const stateChanged = state;
                    stateChanged.routes = currentRoutes;
                    stateChanged.index = currentRoutes.length - 1;

                    newState = defaultRootGetStateForAction(action, stateChanged);
                }
            }
        }

        if (!newState) {
            newState = defaultRootGetStateForAction(action, state);
        }

        const newRouter = getActiveRouteName(newState);

        try {
            if (!!action && !!action.type) {
                const actionType = action.type.toLowerCase();

                if (
                    actionType.indexOf(NAVIGATE) >= 0 ||
                    actionType.indexOf(PUSH) >= 0 ||
                    actionType.indexOf(REPLACE) >= 0 ||
                    actionType.indexOf(REPLACE_WITH) >= 0
                ) {
                    AnalyticsUtil.logNormalEvent(
                        'open_screen',
                        getScreenTrackingParams(action.routeName, !!lastRouter ? lastRouter.routeName : 'not_set', action.params),
                        'screen'
                    );
                } else if (!!lastRouter && actionType.indexOf(BACK) >= 0) {
                    AnalyticsUtil.logNormalEvent(
                        'close_screen',
                        getScreenTrackingParams(
                            !!newRouter.routeName ? newRouter.routeName : 'not_set',
                            !!lastRouter.routeName ? lastRouter.routeName : 'not_set',
                            !!lastRouter.params ? lastRouter.params : {}
                        ),
                        'screen'
                    );
                }
            }
        } catch (e) {
            console.log(e);
        }

        if (!!newRouter) {
            const statusBarStyle = ObjectUtil.getValue(newRouter, 'dark-content', ['params', 'statusBarStyle']);
            const themeColor = ObjectUtil.getValue(newRouter, 'transparent', ['params', 'themeColor']);

            const barStyle = !!statusBarStyle && statusBarStyle.indexOf('light') >= 0 ? 'light-content' : 'dark-content';

            StatusBar.setBarStyle(barStyle, true);
            if (!AppConfig.ios) {
                StatusBar.setTranslucent(true);
                StatusBar.setBackgroundColor(themeColor);
            }
        }

        return newState;
    } catch (e) {
        console.log(e);
    }

    return defaultRootGetStateForAction(action, state);
};

/**
 * Deep link trigger will open here
 * @param path
 * @param params
 * @returns {{}}
 */
RootStack.router.getActionForPathAndParams = (path, params) => {
    // console.log('RootStack:getActionForPathAndParams:\npath: ', path, '\nparams:', params);

    // return defaultRootGetActionForPathAndParams(path, params);
    return {};
};

RootStack.router.getPathAndParamsForState = state => {
    // console.log('RootStack:getPathAndParamsForState: ', state);
    return defaultRootGetPathAndParamsForState(state);
};

RootStack.router.getComponentForState = state => {
    // console.log('RootStack:getComponentForState: ', state);
    return defaultRootGetComponentForState(state);
};

RootStack.router.getComponentForRouteName = routeName => {
    // console.log('RootStack:getComponentForRouteName: ', routeName);
    return defaultRootGetComponentForRouteName(routeName);
};

export const AppContainer = createAppContainer(RootStack);
