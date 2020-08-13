

import {NavigationActions,StackActions} from 'react-navigation';
import Root from '../router/Root';


const firstAction = Root.router.getActionForPathAndParams('app');
const tempNavState = Root.router.getStateForAction(firstAction);
const secondAction = Root.router.getActionForPathAndParams('login');
const initialNavState = Root.router.getStateForAction(
  firstAction,
);

function nav(state = initialNavState, action) {
  let nextState;
  // console.log(action.type)
  switch (action.type) {
    case 'JUMP_TO_TAB':
      nextState = Root.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'pay' }),
        state
      );
      break;
    case 'CHECK_SERVER_SUCCESS':
      nextState = Root.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'login' }),
        state
      );
      break;
    case 'LOGIN_SUCCESS':
      nextState = Root.router.getStateForAction(
        StackActions.push({ routeName: 'tab' }),
        state
      );
      break;
    default:
      nextState = Root.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}


export default nav