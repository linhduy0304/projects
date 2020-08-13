import { combineReducers } from 'redux';
import loginReducer from '../components/login/reducer';
//StoreInfo
import storeInfoReducer from '../components/detail/storemenu/reducer';
//Location
import locationReducer from '../utils/locationmanager/reducer';
//keyword search deal
import keywordSearchDealHistoryReducer from '../components/searchDeal/keywordInput/reducer';

import couponDataChangeReducer from '../components/detail/booking/reducer'

//collection reducer
import collectionActionReducer from '../components/collection/data/reducer'
//deal reducer
import dealActionReducer from '../components/detail/reducer'

//config reducer
import configReducer from '../components/config/reducer'

import homeReducer from '../components/home/repo/reducer'

const allReducers = combineReducers({
    loginReducer,
    storeInfoReducer,
    locationReducer,
    keywordSearchDealHistoryReducer,
    // notificationReducer,
    couponDataChangeReducer,
    collectionActionReducer,
    dealActionReducer,

    configReducer,
    homeReducer
    //Add more reducer here
});

export default allReducers;
