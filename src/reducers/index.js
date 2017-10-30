import {combineReducers} from 'redux-immutable';

import routerReducer from './routerReducer';
import user from './user';

export default combineReducers({
  user,
  routing: routerReducer,
});
