import { NavigationActions } from 'react-navigation';

import { Router } from '../Router';

const initialState = Router.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  const nextState = Router.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
