// import {StringUtil} from './string-util'
// import {AnalyticsUtil} from "../components/common/analytics/analytics";
// import Navigator from "./Navigator";
// import {DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../const";
//
// function _openDealDetailScreen(navigation, slug, from) {
//     navigation.push('DealDetail', {
//         "source_deal_detail": from,
//         "slug": slug
//     })
// }
//
// function checkToOpenDealDetail(navigation, slug, from) {
//     if (StringUtil.isEmpty(slug)) return;
//
//     const routes = Navigator.getRoutes();
//     if (!routes || routes.length < 1) {
//         _openDealDetailScreen(navigation, slug, from);
//         return;
//     }
//
//     const mains = routes.filter((r, i) => !!r.routeName && r.routeName === 'Main');
//     if (!mains || mains.length < 1) {
//         _openDealDetailScreen(navigation, slug, from);
//         return;
//     }
//
//     const screens = mains[0].routes;
//
//     const lastScreen = screens[screens.length - 1];
//     if (!lastScreen) {
//         _openDealDetailScreen(navigation, slug, from);
//         return;
//     }
//
//     const lastScreenParams = lastScreen.params;
//     if (!lastScreenParams) {
//         _openDealDetailScreen(navigation, slug, from);
//         return;
//     }
//
//     if (lastScreen.routeName === 'DealDetail') {
//         if (!!lastScreenParams.onAction) lastScreenParams.onAction('open_deal_detail', {slug: slug});
//         _openDealDetailScreen(navigation, slug, from);
//     }
//     else {
//         _openDealDetailScreen(navigation, slug, from);
//     }
// }
//
// function _openCollectionDetailScreen(navigation, slug){
//     navigation.navigate('CollectionDetail', { "cslug": slug })
// }
//
// function checkToOpenCollectionDetail(navigation, slug, from) {
//     console.log('checkToOpenCollectionDetail', slug)
//     if (StringUtil.isEmpty(slug)) return;
//
//     const routes = Navigator.getRoutes();
//     if (!routes || routes.length < 1) {
//         _openCollectionDetailScreen(navigation, slug);
//         return;
//     }
//
//     const mains = routes.filter((r, i) => !!r.routeName && r.routeName === 'Main');
//     if (!mains || mains.length < 1) {
//         _openCollectionDetailScreen(navigation, slug);
//         return;
//     }
//
//     const screens = mains[0].routes;
//
//     const lastScreen = screens[screens.length - 1];
//     if (!lastScreen) {
//         _openCollectionDetailScreen(navigation, slug);
//         return;
//     }
//
//     const lastScreenParams = lastScreen.params;
//     if (!lastScreenParams) {
//         _openCollectionDetailScreen(navigation, slug);
//         return;
//     }
//
//     if (lastScreen.routeName !== 'CollectionDetail' || lastScreenParams.cslug !== slug) {
//         _openCollectionDetailScreen(navigation, slug);
//     }
// }
//
// function _openCouponDetailScreen(navigation, deal_type, coupon_id) {
//     if (deal_type === DEAL_TYPE_EXCLUSIVE) {
//         navigation.navigate('ExclusiveReservationInfo', { couponId: coupon_id });
//     }
//     else if (deal_type === DEAL_TYPE_LAST_MIN) {
//         navigation.navigate('LastMinReservationInfo', { couponId: coupon_id });
//     }
//     else if (deal_type === DEAL_TYPE_MOVIE) {
//         navigation.navigate('MovieReservationInfo', { couponId: coupon_id });
//     }
// }
//
// function checkToOpenCouponDetail(navigation, deal_type, coupon_id, from) {
//     if (StringUtil.isEmpty(coupon_id) || StringUtil.isEmpty(deal_type)) return;
//
//     const routes = Navigator.getRoutes();
//     if (!routes || routes.length < 1) {
//         _openCouponDetailScreen(navigation, deal_type, coupon_id);
//         return;
//     }
//
//     const mains = routes.filter((r, i) => !!r.routeName && r.routeName === 'Main');
//     if (!mains || mains.length < 1) {
//         _openCouponDetailScreen(navigation, deal_type, coupon_id);
//         return;
//     }
//
//     const screens = mains[0].routes;
//
//     const lastScreen = screens[screens.length - 1];
//     if (!lastScreen) {
//         _openCouponDetailScreen(navigation, deal_type, coupon_id);
//         return;
//     }
//
//     const lastScreenParams = lastScreen.params;
//     if (!lastScreenParams) {
//         _openCouponDetailScreen(navigation, deal_type, coupon_id);
//         return;
//     }
//
//     if (lastScreen.routeName === 'ExclusiveReservationInfo' ||
//         lastScreen.routeName === 'LastMinReservationInfo' ||
//         lastScreen.routeName === 'MovieReservationInfo') {
//
//         if (lastScreenParams.couponId === coupon_id) {
//             if (!!lastScreenParams.onAction) lastScreenParams.onAction('refresh');
//         }
//         else {
//             _openCouponDetailScreen(navigation, deal_type, coupon_id);
//         }
//     }
//     else {
//         _openCouponDetailScreen(navigation, deal_type, coupon_id);
//     }
// }
//
// function _openCommentScreen(navigation, data) {
//     navigation.push('AllComments', {
//         did: data.did,
//         nofData: data
//     });
// }
//
// function checkToOpenComment(navigation, did, pid, deal_slug, from) {
//     if (StringUtil.isEmpty(pid) || StringUtil.isEmpty(did)) return;
//
//     const data = {
//         did: did,
//         pid: pid,
//         deal_slug: deal_slug
//     }
//
//     const routes = Navigator.getRoutes();
//     if (!routes || routes.length < 1) {
//         _openCommentScreen(navigation, data);
//         return;
//     }
//
//     const mains = routes.filter((r, i) => !!r.routeName && r.routeName === 'Main');
//     if (!mains || mains.length < 1) {
//         _openCommentScreen(navigation, data);
//         return;
//     }
//
//     const screens = mains[0].routes;
//
//     const lastScreen = screens[screens.length - 1];
//     if (!lastScreen) {
//         _openCommentScreen(navigation, data);
//         return;
//     }
//
//     const lastScreenParams = lastScreen.params;
//     if (!lastScreenParams) {
//         _openCommentScreen(navigation, data);
//         return;
//     }
//
//     if (lastScreen.routeName === 'DealDetail' || lastScreen.routeName === 'AllComments') {
//         if (!!lastScreenParams.onAction) lastScreenParams.onAction('open_comment', data);
//         _openCommentScreen(navigation, data);
//     }
//     else {
//         _openCommentScreen(navigation, data);
//     }
// }
//
// function checkToOpenCollectionList(navigation) {
//     console.log('checkToOpenCollectionList')
//     const routes = Navigator.getRoutes();
//     if (!routes || routes.length < 1) {
//         navigation.navigate('Collections');
//         return;
//     }
//
//     const mains = routes.filter((r, i) => !!r.routeName && r.routeName === 'Main');
//     if (!mains || mains.length < 1) {
//         navigation.navigate('Collections');
//         return;
//     }
//
//     const screens = mains[0].routes;
//
//     const lastScreen = screens[screens.length - 1];
//     if (!lastScreen) {
//         navigation.navigate('Collections');
//         return;
//     }
//
//     const lastScreenParams = lastScreen.params;
//     if (!lastScreenParams) {
//         navigation.navigate('Collections');
//         return;
//     }
//
//     if (lastScreen.routeName !== 'Collections') {
//         navigation.navigate('Collections');
//     }
// }
//
// const NavigationUtils = {
//     checkToOpenDealDetail,
//     checkToOpenCollectionDetail,
//     checkToOpenCouponDetail,
//     checkToOpenComment,
//     checkToOpenCollectionList
// };
//
// exports.NavigationUtils = NavigationUtils;