import {combineReducers} from 'redux-immutable';
import routerReducer from './routerReducer';

import user from './user';

const rootReducer = combineReducers({
    user,
    routing: routerReducer,
});

export default rootReducer;
