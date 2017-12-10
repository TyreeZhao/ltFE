import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import user from './reducers/user'

export default combineReducers({
  user,
  router,
})
