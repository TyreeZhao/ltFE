import {createStore as _createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {Map} from 'immutable'
import {persistStore} from 'utils/reduxPersistor'
import rootReducer from 'reducers'

const DEVELOPMENT = 'development' === process.env.NODE_ENV;

export function configureStore(initialState = Map({}), history) {

  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];

  let finalCreateStore;
  let store;

  if (DEVELOPMENT) {
    const {createLogger} = require('redux-logger');
    const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    finalCreateStore = compose(applyMiddleware(...middlewares, createLogger()))(_createStore);

    store = finalCreateStore(rootReducer, initialState, reduxDevToolsExtension);

    module.hot && module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });

  } else {
    finalCreateStore = compose(applyMiddleware(...middlewares))(_createStore);
    store = finalCreateStore(rootReducer, initialState);
  }

  const whiteList = ['routing', 'global'];

  store = persistStore(store, {
    whiteList,
  });

  return store;
}
