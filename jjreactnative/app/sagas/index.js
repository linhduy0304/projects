import {fork} from 'redux-saga/effects';

//Login
import {watchloginUser, watchLogoutUser, watchLoginUserSuccess} from '../components/login/saga';
import {watchFetchBrandInfo} from '../components/detail/brandinfo/saga';
//Store Info
import {watchFetchStoreInfo} from '../components/detail/storemenu/saga';
//Current Location 
import {watchFetchProvinceSelected, watchFetchLocationSupport} from '../utils/locationmanager/saga';
//Collections
import {watchFetchCollection} from '../components/collection/samecollection/saga';
//Homepage deals
import {
	watchFetchHomePagesAction,
	watchFetchEventAction,
	watchFetchUserInfo,
	watchFetchBanner
} from '../components/home/repo/saga';
//keyword search deal history
import {
	watchKeywordSearchDeal,
	watchAddKeywordSearchDeal,
	watchRemoveKeywordSearchDeal
} from '../components/searchDeal/keywordInput/saga'
//Exclusive deal in deal detail
import {watchFetchExclusiveDeals} from '../components/detail/exclusivedeal/saga';
//rate coupon
import {watchRateCoupon} from '../components/rateCoupon/saga'
//notification
import {watchCouponDataChanged} from '../components/detail/booking/saga'
//collection
import {watchSaveCollection} from '../components/collection/data/saga'

//deal
import {
	watchLikeDeal,
	watchDisLikeDeal,
	watchSaveDeal,
	watchCheckInDeal,
	watchFollowBrand,
	watchShareDeal
} from '../components/detail/saga'
//config
import {
	watchUpdateCampaignSourceAction,
	watchUpdateCampaignSourceFromNofDataAction,
	watchUpdateFirstCampaignSourceAction,
} from '../components/config/saga'

export default function* rootSaga() {
    yield [
        //Login
        fork(watchloginUser),
        fork(watchLoginUserSuccess),
        fork(watchLogoutUser),
        //Brand Info
        fork(watchFetchBrandInfo),
        //Store Info
        fork(watchFetchStoreInfo),
        //Location
        fork(watchFetchProvinceSelected),
        fork(watchFetchLocationSupport),
        //Colections
        fork(watchFetchCollection),
        //Homepage deals
        fork(watchFetchHomePagesAction),
        fork(watchFetchEventAction),
        fork(watchFetchUserInfo),
        fork(watchFetchBanner),
        //keyword search deal
        fork(watchKeywordSearchDeal),
        fork(watchAddKeywordSearchDeal),
        fork(watchRemoveKeywordSearchDeal),
        //exclusive deals in deal detail
        fork(watchFetchExclusiveDeals),
        //rate coupon
        fork(watchRateCoupon),
        //notification
        fork(watchCouponDataChanged),
        //collection
        fork(watchSaveCollection),
        //deal
        fork(watchLikeDeal),
        fork(watchDisLikeDeal),
        fork(watchSaveDeal),
        fork(watchCheckInDeal),
        fork(watchFollowBrand),
        fork(watchShareDeal),

        //config
        fork(watchUpdateCampaignSourceAction),
        fork(watchUpdateCampaignSourceFromNofDataAction),
        fork(watchUpdateFirstCampaignSourceAction)
	];
}