const InitialState = require('./pageGroupInitialState').default;
let ConstantSystem = require('../../services/ConstantSystem');

const {
  PAGE_GROUP_LOAD_REQUEST,
  PAGE_GROUP_LOAD_SUCCESS,
  PAGE_GROUP_LOAD_FAILURE,
  PAGE_GROUP_LOAD_MORE_REQUEST,
  PAGE_GROUP_LOAD_MORE_SUCCESS,
  PAGE_GROUP_LOAD_MORE_FAILURE,
  PAGE_GROUP_REFRESH_REQUEST,
  PAGE_GROUP_REFRESH_SUCCESS,
  PAGE_GROUP_REFRESH_FAILURE,
  GROUP_DETAIL_REQUEST,
  GROUP_DETAIL_SUCCESS,
  GROUP_DETAIL_FAILURE,
  UPDATE_PAGE_GROUP_POST_ID,
  UPDATE_PAGE_GROUP_POST_ID_LOAD_MORE
  } = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function pageGroupReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case UPDATE_PAGE_GROUP_POST_ID_LOAD_MORE:
      var dataPostId = state.setIn(['post_ids'], state.getIn(['post_ids']).concat(action.dataId));
      return dataPostId;
    case UPDATE_PAGE_GROUP_POST_ID:
      var dataPostId = state.setIn(['post_ids'],(action.dataId));
      return dataPostId;

    case PAGE_GROUP_REFRESH_REQUEST:
      let refreshRequestState = state.setIn(['isRefreshing'], true);
      return refreshRequestState;

    case PAGE_GROUP_REFRESH_SUCCESS:
      let refreshSuccessState = state.setIn(['post_ids'], action.dataId).setIn(['isRefreshing'], false)
        .setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true);
      return refreshSuccessState;

    case GROUP_DETAIL_SUCCESS:
      let groupSuccessState = state.setIn(['isFetching'], false)
        .setIn(['groups'], action.data);
      return groupSuccessState;

    case PAGE_GROUP_REFRESH_FAILURE:
      let refreshFailureState = state.setIn(['isRefreshing'], false);
      return refreshFailureState;

    case PAGE_GROUP_LOAD_MORE_REQUEST:
    case PAGE_GROUP_LOAD_MORE_FAILURE:
      return state;

    case PAGE_GROUP_LOAD_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['post_ids'], []);

    case GROUP_DETAIL_REQUEST:
      let nextState =  state.setIn(['isFetching'], true);
      return nextState;

    case PAGE_GROUP_LOAD_SUCCESS:
      let successState =  state.setIn(['isFetching'], false)
        .setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true);
      return successState;

    case PAGE_GROUP_LOAD_MORE_SUCCESS:
      let loadMoresuccesState = state.setIn(['loadMore'], (action.data.length < ConstantSystem.PER_PAGE) ? false : true);
      return loadMoresuccesState;

    case PAGE_GROUP_LOAD_FAILURE:
    case GROUP_DETAIL_FAILURE:
      let failState =  state.setIn(['isFetching'], false);
      return failState;
  }
  return state;
}
