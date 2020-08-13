
'use strict';
const InitialState = require('./exploreInitialState').default;

const {
  EXPLORE_REQUEST,
  EXPLORE_SUCCESS,
  EXPLORE_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
  PICK_CATEGORY_REQUEST,
  PICK_CATEGORY_SUCCESS,
  PICK_CATEGORY_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function exploreReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    //pick unpick actegory
    case PICK_CATEGORY_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case PICK_CATEGORY_SUCCESS:
      if(action.data.is_like == 1) {
        var category = state.getIn(['explore']);
        category.favoritecategories.map((item, index) => {
          if(item.id == action.data.id) {
            item.is_like = 0;
            return item
          }
        })
        var del = category.favoritecategories.filter(aa => aa.id != action.data.id);
        category.favoritecategories = del;
        // add
        category.categories.unshift(action.data);
        return state.removeIn(['explore']).setIn(['explore'], category).setIn(['isFetching'], null)
      }else {
        var category = state.getIn(['explore']);
        category.categories.map((item, index) => {
          if(item.id == action.data.id) {
            item.is_like = 1;
            return item
          }
        })
        var del = category.categories.filter(aa => aa.id != action.data.id);
        category.categories = del;
        //add
        category.favoritecategories.unshift(action.data);
        return state.removeIn(['explore']).setIn(['explore'], category).setIn(['isFetching'], null)
      }
        

    case PICK_CATEGORY_FAIL: 
      return state.setIn(['isFetching'], null)

    //category
    case CATEGORY_REQUEST:
      switch(action.action) {
        case 'L':
          return state.setIn(['isFetching'], true).setIn(['posts'], null).setIn(['loadMore'], null);
        default:
          return state.setIn(['isFetching'], null)
      }

    case CATEGORY_SUCCESS:
      if(action.action == 'LM') {
        var posts = state.getIn(['posts']);
        posts = posts.concat(action.posts)
        return state.setIn(['posts'], posts)
                    .setIn(['loadMore'], action.posts.length >= 15 ? true : null)
                    .setIn(['isFetching'], null);
      } else {
        return state.setIn(['isFetching'], null)
                    .setIn(['category'], action.category)
                    .setIn(['posts'], action.posts)
                    .setIn(['loadMore'], action.posts.length >= 15 ? true : null);
      }

    case CATEGORY_FAIL: 
      return state.setIn(['isFetching'], null)

    //explore
    case EXPLORE_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case EXPLORE_SUCCESS:
        return state.setIn(['isFetching'], null).setIn(['explore'], action.data);

    case EXPLORE_FAIL: 
      return state.setIn(['isFetching'], null)

  }
  return state;
}
