import React from 'react'
import {Route, IndexRedirect, Redirect} from 'react-router'

import ShopList from '../views/ShopList'
import Home from '../views/Home'
import CoreLayout from '../CoreLayout'

export default () => (
  <Route>
    <Route path="/" component={CoreLayout}>
      <IndexRedirect to={"/home"} />
      <Route path="home" component={Home} />
      <Route path="shoplist" component={ShopList} />
    </Route>
    <Redirect from="*" to="/order" />
  </Route>
)
