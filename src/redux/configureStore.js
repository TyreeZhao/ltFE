import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './routReducer'

export default function configureStore(initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  const middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
  )

  // Create final store and subscribe router in debug env ie. for devtools
  // let store = createStore(rootReducer, middleware)
  let store = middleware(createStore)(rootReducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  )

  if (module.hot) {
    module.hot.accept('./routReducer', () => {
      const nextRootReducer = require('./routReducer').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }
  // return createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(thunk)
  // )
  return store
}
