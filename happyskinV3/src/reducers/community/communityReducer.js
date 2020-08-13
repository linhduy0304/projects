/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./communityInitialState').default;
const ConstantSystem = require('../../services/ConstantSystem');
const {Record} = require('immutable');
/**
 * ## Auth actions
 */
const {
  COMMUNITY_LOAD_REQUEST,
  COMMUNITY_LOAD_SUCCESS,
  COMMUNITY_LOAD_FAILURE,
  ON_QUESTION_FORM_FIELD_CHANGE,
  SUBMIT_QUESTION_REQUEST,
  SUBMIT_QUESTION_SUCCESS,
  SUBMIT_QUESTION_FAILURE,
  COMMUNITY_GROUP_REQUEST,
  COMMUNITY_GROUP_SUCCESS,
  COMMUNITY_GROUP_FAILURE,
  COMMUNITY_TAB_GROUP_REQUEST,
  COMMUNITY_TAB_GROUP_SUCCESS,
  COMMUNITY_TAB_GROUP_FAILURE,
  COMMUNITY_CREATE_OPTIONS,
  COMMUNITY_TAB_LOAD_MORE_REQUEST,
  COMMUNITY_TAB_LOAD_MORE_SUCCESS,
  COMMUNITY_TAB_LOAD_MORE_FAILURE,
  SUBMIT_TIP_REQUEST,
  SUBMIT_TIP_SUCCESS,
  SUBMIT_TIP_FAILURE,
  ON_TIP_FORM_FIELD_CHANGE,
  COMMUNITY_SEARCH_PRODUCT_LOAD_REQUEST,
  COMMUNITY_SEARCH_PRODUCT_LOAD_SUCCESS,
  COMMUNITY_SEARCH_PRODUCT_LOAD_FAILURE,
  COMMUNITY_TAB_CHANGE_DATA_SUCCESS,
  JOIN_GROUP_COMMUNITY_SUCCESS,
  DELETE_IMAGE_QUESTION,
  ON_REVIEW_FORM_FIELD_CHANGE,
  SUBMIT_REVIEW_REQUEST,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAILURE,
  UPDATE_LOOK_OF_THE_DAY,
  DELETE_ITEM_PRODUCT,
  SUBMIT_LOTD_REQUEST,
  SUBMIT_LOTD_SUCCESS,
  SUBMIT_LOTD_FAILURE,
  } = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function communityReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case JOIN_GROUP_COMMUNITY_SUCCESS:
      // if (action.data.dataGroup.is_join_group == 1) {
      //   return state.setIn(['groups'], state.getIn(['groups']).concat(action.data.dataGroup)).setIn(['tabs'], state.getIn(['tabs']).concat(action.data.dataGroup));
      // } else {
      //   for(let i = 0; i < state.getIn(['groups']).length; i++){
      //     if(state.getIn(['groups'])[i].id == action.data.dataGroup.id){
      //       state.setIn(['groups'], state.getIn(['groups']).splice(i,1));
      //     }
      //   }
      //   for(let j = 0; j < state.getIn(['tabs']).length; j++){
      //     if(state.getIn(['tabs'])[j].id == action.data.dataGroup.id){
      //       state.setIn(['tabs'], state.getIn(['tabs']).splice(j,1));
      //     }
      //   }
      // }
      if (action.data.dataGroup.is_join_group == 1) {
        return state.setIn(['groups'], state.getIn(['groups']).concat(action.data.dataGroup));
      } else {
        for(let i = 0; i < state.getIn(['groups']).length; i++){
          if(state.getIn(['groups'])[i].id == action.data.dataGroup.id){
            state.setIn(['groups'], state.getIn(['groups']).splice(i,1));
          }
        }
      }
      
    case COMMUNITY_TAB_CHANGE_DATA_SUCCESS:
      return state.setIn(['changeData'], false);

    case COMMUNITY_SEARCH_PRODUCT_LOAD_REQUEST:
      let communitySearch = state.setIn(['isFetching'], true);
      return communitySearch;

    case COMMUNITY_TAB_LOAD_MORE_REQUEST:
      let loadMoreState = state.setIn(['currentTab'], action.id).setIn(['tabIsFetching'], true).setIn(['postTabIds'], []);
      return loadMoreState;

    case COMMUNITY_TAB_LOAD_MORE_SUCCESS:
      let loadMoreSuccessState = state.setIn(['tabIsFetching'], false)
        .setIn(['postTabIds'], action.dataId)
        .setIn(['currentTab'], action.groupId);
      return loadMoreSuccessState;

    case COMMUNITY_SEARCH_PRODUCT_LOAD_SUCCESS:
      let searchState = state.setIn(['dataSearch'], action.data).setIn(['isFetching'], false);
      return searchState;

    case COMMUNITY_TAB_LOAD_MORE_FAILURE:
       let loadMoreFailureState = state.setIn(['tabIsFetching'], false).setIn(['postTabIds'], []);
      return loadMoreFailureState;

    case COMMUNITY_TAB_GROUP_REQUEST:
      let requestTabState =  state.setIn(['tabIsFetching'], true).setIn(['currentPage'], action.currentPage);
      return requestTabState;

    
    case COMMUNITY_GROUP_REQUEST:
    case COMMUNITY_LOAD_REQUEST:
      let requestState =  state.setIn(['isFetching'], true);
      return requestState;

    case SUBMIT_LOTD_REQUEST:
    case SUBMIT_TIP_REQUEST:
    case SUBMIT_QUESTION_REQUEST:
    case SUBMIT_REVIEW_REQUEST:
      let requestSubmitState =  state.setIn(['isFetching'], true).setIn(['disable'], true);
      return requestSubmitState;

    case COMMUNITY_LOAD_SUCCESS:
      let successState =  state.setIn(['tabs'], state.getIn(['tabs']).map(function(tab, index) {
      if (tab.id == '1') {
          tab.loadMore = (action.data.length < ConstantSystem.PER_PAGE) ? false : true;
          tab.page = 1;
          tab.posts = action.data;
        }
        return tab;
      }));
      return successState;

    case COMMUNITY_TAB_GROUP_SUCCESS:
      let communityTabSuccess =  state.setIn(['tabIsFetching'], false)
        .setIn(['tabs'], state.getIn(['tabs']).map(function(tab, index) {
          if (tab.id == state.getIn(['tabs'])[action.currentPage].id) {
            tab.loadMore = (action.data.length < ConstantSystem.PER_PAGE) ? false : true;
            tab.page = 1;
            tab.posts = action.data;
          }s
          return tab;
        }))
        .setIn(['changeData'], true);
      return communityTabSuccess;

    case COMMUNITY_GROUP_SUCCESS:
      let groupSuccess =  state.setIn(['groups'], action.data)
        .setIn(['isFetching'], false)
        .setIn(['tabIsFetching'], false);
      return groupSuccess;

    case COMMUNITY_TAB_GROUP_FAILURE:
      let tabFailsState =  state.setIn(['tabIsFetching'], false);
      return tabFailsState;
    case COMMUNITY_GROUP_FAILURE:
    case COMMUNITY_LOAD_FAILURE:
      let failsState =  state.setIn(['isFetching'], false);
      return failsState;

    case SUBMIT_LOTD_SUCCESS:
      let submitLOTDSuccess =
        state.setIn(['disable'], false)
          .setIn(['isFetching'], false)
          .setIn(['lookOfTheDay', 'content'], '')
          .setIn(['lookOfTheDay', 'products'], [])
          .setIn(['lookOfTheDay', 'image'], '');
      return submitLOTDSuccess;

    case SUBMIT_QUESTION_SUCCESS:
      let submitQuestionSuccess =
        state.setIn(['disable'], false)
          .setIn(['isFetching'], false)
          .setIn(['isError'],false)
          .setIn(['isSuccess'], true)
          .setIn(['question', 'content'], '')
          .setIn(['question', 'images'], []);
      return submitQuestionSuccess;

    case SUBMIT_TIP_SUCCESS:
      let submitTipSuccess =
        state.setIn(['disable'], false)
          .setIn(['isFetching'], false)
          .setIn(['isError'],false)
          .setIn(['isSuccess'], true)
          .setIn(['tips', 'content'], '')
          .setIn(['tips', 'images'], []);
      return submitTipSuccess;

    case SUBMIT_REVIEW_SUCCESS:
      let submitReviewSuccess =
        state.setIn(['disable'], false)
          .setIn(['isFetching'], false)
          .setIn(['isError'],false)
          .setIn(['isSuccess'], true)
          .setIn(['review', 'content'], '')
          .setIn(['review', 'images'], [])
          .setIn(['review', 'product_id'], '');
      return submitReviewSuccess;

    case SUBMIT_LOTD_FAILURE:
    case COMMUNITY_SEARCH_PRODUCT_LOAD_FAILURE:
    case SUBMIT_QUESTION_FAILURE:
    case SUBMIT_TIP_FAILURE:
    case SUBMIT_REVIEW_FAILURE:
      let submitQuestionFail =  state.setIn(['disable'], false)
        .setIn(['isFetching'], false)
        .setIn(['isError'],true)
        .setIn(['isSuccess'], false)
        .setIn(['error'],action.error);
      return submitQuestionFail;

    case ON_QUESTION_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState =
        state.setIn(['question', field], value)
          .setIn(['isError'],false);
      var finalState = nextState.setIn(['isValid'],false);
      return finalState;
    }

    case ON_TIP_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState =
        state.setIn(['tips', field], value)
          .setIn(['isError'],false);
      var tipState = nextState.setIn(['isValid'],false);
      return tipState;
    }

    case ON_REVIEW_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState =
        state.setIn(['review', field], value)
          .setIn(['isError'],false);
      var reviewState = nextState.setIn(['isValid'],false);
      return reviewState;
    }

    case UPDATE_LOOK_OF_THE_DAY: {
      const {field, value} = action.payload;
      let lookOfTheDayState;
      if(field == 'products'){
        let dataProducts = state.getIn(['lookOfTheDay', 'products']);
        let products = dataProducts.concat([value]);
        lookOfTheDayState = state.setIn(['lookOfTheDay', field], products);
      }else{
        lookOfTheDayState = state.setIn(['lookOfTheDay', field], value);
      }
      return lookOfTheDayState;
    }

    case DELETE_ITEM_PRODUCT:
      var products = state.getIn(['lookOfTheDay', 'products']);
          products.splice(action.key,1);
          let deleteItemProductState = state.removeIn(['lookOfTheDay', 'products']).setIn(['lookOfTheDay', 'products'], products);
          return deleteItemProductState;

    case COMMUNITY_CREATE_OPTIONS:
      return state.setIn(['tabs'], action.options);

    case DELETE_IMAGE_QUESTION: {
        if(action.feedtype == "question") {
          var images = state.getIn(['question', 'images']);
          images.splice(action.key,1);
          let questionDeleteImage = state.removeIn(['question', 'images']).setIn(['question', 'images'], images);
          return questionDeleteImage;
        }
        else if(action.feedtype == "tips") {
          var images = state.getIn(['tips', 'images']);
          images.splice(action.key,1);
          let tipsDeleteImage =  state.removeIn(['tips', 'images']).setIn(['tips', 'images'], images);
          return tipsDeleteImage;
        }
        else {
          var images = state.getIn(['review', 'images']);
          images.splice(action.key,1);
          let reviewDeleteImage = state.removeIn(['review', 'images']).setIn(['review', 'images'], images);
          return reviewDeleteImage;
        }
    }
  }
  /**
   * ## Default
   */
  return state;
}
