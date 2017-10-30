import React from 'react'
// import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router'
import {configureStore} from './stores/configureStore'
import {ConnectedRouter} from 'react-router-redux'
import {Map} from 'immutable'
import makeRoutes from './routes'
import Root from './containers/Root'

import './common/common.css';

// import {
//   Base,
//   Home,
//   Page1,
//   Page2,
// } from './containers';

const initState = Map({});
let history = createHistory();
const store = configureStore(initState, history);

// const AppRoutes = () => (
//   <Provider store={store}>
//     <AppContainer>
//       <Base>
//         <ConnectedRouter history={history}>
//           <div>
//             <Route exact path="/" component={Home}/>
//             <Route path="/page1" component={Page1}/>
//             <Route path="/page2" component={Page2}/>
//           </div>
//         </ConnectedRouter>
//       </Base>
//     </AppContainer>
//   </Provider>
// );

// const $reactRoot = document.getElementById('reactRoot');
const routes = makeRoutes(store)

const render = () => {
  ReactDOM.render(
    (<Root history={history} routes={routes} store={store} />),
    document.getElementById('reactRoot')
  )
}

// Hot module replacement
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render()
  })
}
render()

//
// if (module.hot) {
//   module.hot.accept(AppRoutes, () => render(AppRoutes(), $reactRoot));
// }
