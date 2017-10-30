import React from 'react'
import { Router, Route, IndexRedirect, Redirect } from 'react-router'
import { Switch } from 'react-router-dom'
import {
  Base,
  Home,
  Page1,
  Page2,
} from '../containers';

export default () => (
  <div>
    <Route path="/" component={Base}/>
    <Switch>
      <Route path="/Page1" component={Page1}/>
      <Route path="/Page2" component={Page2}/>
      <Redirect from="*" to="/Page1" />
    </Switch>
  </div>
)
