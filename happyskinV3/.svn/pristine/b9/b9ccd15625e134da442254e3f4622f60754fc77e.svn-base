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
const InitialState = require('./skintestInitialState').default;
let ConstantSystem = require('../../services/ConstantSystem')

/**
 * ## Auth actions
 */
const {
  SKINTEST_LOAD_REQUEST,
  SKINTEST_LOAD_SUCCESS,
  SKINTEST_LOAD_FAILURE,
  SKINTEST_SLIDE_CHANGE,
  SKINTEST_SLIDE_SELECT_VALUE,
  SKINTEST_SAVE_REQUEST,
  SKINTEST_SAVE_SUCCESS,
  SKINTEST_SAVE_CONTINUE,
  SKINTEST_SAVE_FAILURE,
  SKINTEST_UPDATE_CONTINUE_PAGE,
  SKINTEST_UPDATE_QUESTIONS,
  SKINRESULT_LOAD_GROUP_SUGGESS,
  SKINTEST_PRODUCT_LOAD_REQUEST,
  SKINTEST_PRODUCT_LOAD_SUCCESS,
  SKINTEST_PRODUCT_LOAD_FAILURE,
  SKINTEST_PRODUCT_LOAD_MORE_REQUEST,
  SKINTEST_PRODUCT_LOAD_MORE_SUCCESS,
  SKINTEST_PRODUCT_LOAD_MORE_FAILURE,
  SKINTEST_PRODUCT_REFRESH_REQUEST,
  SKINTEST_PRODUCT_REFRESH_SUCCESS,
  SKINTEST_PRODUCT_REFRESH_FAILURE,
  SKINTEST_OPEN_MODAL_CATEGORY,
  SKINTEST_OPEN_MODAL_BRAND,
  SKINTEST_CLOSE_MODAL_CATEGORY,
  SKINTEST_CLOSE_MODAL_BRAND,
  SKINTEST_LOAD_CATEGORY_REQUEST,
  SKINTEST_LOAD_CATEGORY_SUCCESS,
  SKINTEST_LOAD_CATEGORY_FAILURE,
  SKINTEST_FILTER_SUCCESS,
  SKINTEST_FILTER_FAILURE,
} = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function skintestReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case SKINTEST_PRODUCT_LOAD_MORE_REQUEST:
    case SKINTEST_PRODUCT_REFRESH_REQUEST:
      return state;

    case SKINTEST_OPEN_MODAL_CATEGORY:
      return state.setIn(['showBrand'], false).setIn(['showCategory'], true);

    case SKINTEST_OPEN_MODAL_BRAND:
      return state.setIn(['showCategory'], false).setIn(['showBrand'], true);

    case SKINTEST_CLOSE_MODAL_CATEGORY:
      return state.setIn(['showCategory'], false);

    case SKINTEST_CLOSE_MODAL_BRAND:
      return state.setIn(['showBrand'], false);

    case SKINTEST_LOAD_REQUEST:
    case SKINTEST_SAVE_REQUEST:
    case SKINTEST_PRODUCT_LOAD_REQUEST:
      return state.setIn(['isFetching'], true);

    case SKINTEST_LOAD_CATEGORY_REQUEST:
      return state.setIn(['showBrand'], false)
        .setIn(['showCategory'], false)
        .setIn(['isFetching'], true);

    case SKINTEST_LOAD_SUCCESS:
      let succesState =  state.setIn(['questions'], action.data)
                              .setIn(['isFetching'], false);
      return succesState;
    case SKINTEST_LOAD_FAILURE:
      let failsState =  state.setIn(['isFetching'], false);
      return failsState;
    case SKINTEST_SLIDE_CHANGE:
      var currnet_slide = action.index == 0 ? 1 : action.index;
      let slideState = state.setIn(['currentSlide'], currnet_slide);
      return slideState;
    case SKINTEST_SLIDE_SELECT_VALUE:
      var slideIndex = state.currentSlide <54 ? state.currentSlide +1 : 54;
      var countDone = 0;
      let selectedState = state.setIn(['questions'], state.getIn(['questions']).map(question => {
          if ( question.id == action.id ) {
            question.value = action.value;
          }
          if (question.value != -1) {
            countDone =countDone +1;
          }
          return question;
      })).setIn(['currentSlide'], slideIndex).setIn(['countDone'], countDone);
      return selectedState;
    case SKINTEST_SAVE_SUCCESS:
      let saveSuccessState =  state.setIn(['isFetching'], false)
                                  .setIn(['isFinished'], 1)
                                  .setIn(['results'], action.data);
      return saveSuccessState;
    case SKINTEST_SAVE_CONTINUE:
      let saveContinueState =  state.setIn(['isFetching'], false)
                                  .setIn(['isFinished'], 0)
                                  .setIn(['continuePage'], action.page);
      return saveContinueState;
    case SKINTEST_PRODUCT_LOAD_SUCCESS:
      let successState =  state.setIn(['products'], action.data)
        .setIn(['isFetching'], false)
        .setIn(['categories'], action.dataCategories)
        .setIn(['brands'], action.dataBrands)
        .setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true)
        .setIn(['page'], 1);
      return successState;

    case SKINTEST_PRODUCT_LOAD_MORE_SUCCESS:
      let loadMoresuccesState = state.setIn(['page'], action.data.page).setIn(['products'], state.getIn(['products']).concat(action.data))
        .setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true)
        .setIn(['page'], action.page);
      return loadMoresuccesState;

    case SKINTEST_PRODUCT_REFRESH_SUCCESS:
      let refreshSuccessState = state.setIn(['products'], action.data)
        .setIn(['page'], 1)
        .setIn(['isRefreshing'], false)
        .setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true);
      return refreshSuccessState;

    case SKINTEST_LOAD_CATEGORY_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['categories'], action.data);

    case SKINTEST_FILTER_SUCCESS:
      let filterState = state.setIn(['filterCategory'], action.data.filterCategory)
        .setIn(['filterBrand'], action.data.filterBrand)
        .setIn(['nameCategory'], action.data.nameCategory)
        .setIn(['nameBrand'], action.data.nameBrand)
        .setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true)
        .setIn(['page'], 1)
        .setIn(['products'], action.data.products)
        .setIn(['isFetching'], false);
      return filterState;
    case SKINTEST_SAVE_FAILURE:
    case SKINTEST_PRODUCT_LOAD_FAILURE:
    case SKINTEST_PRODUCT_LOAD_MORE_FAILURE:
    case SKINTEST_LOAD_CATEGORY_FAILURE:
      let saveFailsState =  state.setIn(['isFetching'], false);
      return saveFailsState;
    case SKINTEST_UPDATE_CONTINUE_PAGE:
      var page = !action.page || action.page == -1 ? 1: action.page;
      let continuePageState = state.setIn(['continuePage'], page).setIn(['currentSlide'], page);
      return continuePageState;
    case SKINTEST_UPDATE_QUESTIONS:
      var countDone = 0;
      var continuePage = 1;
      action.questions.map((question, index) => {
          if (question.value != -1) {
            countDone =countDone +1;
          } else {
            if (continuePage == 1) {
              continuePage = index;
            }
          }
      });
      let updateQuestionState = state.setIn(['questions'], action.questions).setIn(['continuePage'], continuePage)
          .setIn(['currentSlide'], continuePage).setIn(['countDone'], countDone);
      return updateQuestionState;
    case SKINRESULT_LOAD_GROUP_SUGGESS:
      return state.setIn(['groupSuggess'], action.groups);
    case SKINTEST_PRODUCT_REFRESH_FAILURE:
      return state.setIn(['isRefreshing'], true);

    
  }
  /**
   * ## Default
   */
  return state;
}
