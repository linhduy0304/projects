
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';

export function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export function mapDispatchToProps(dispatch, actions) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}