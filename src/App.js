import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'
import { useRouterHistory } from 'react-router'
import makeRoutes from './routes'
import Root from './containers/Root'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import './common/common.css';

const initialState = window.__INITIAL_STATE__

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: '',
})

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router,
})

const routes = makeRoutes(store)

const render = () => {
  ReactDOM.render(
    (<Root history={browserHistory} routes={routes} store={store} />),
    document.getElementById('react-app')
  )
}

// Hot module replacement
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render()
  })
}
render()
