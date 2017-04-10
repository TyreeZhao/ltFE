import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'

import Home from './components/Home'

render((
	<Router history={hashHistory}>
		<Router path={"/"}>
			<IndexRedirect to="/Home" />
		</Router>
		<Router path="*" component={Home}/>
	</Router>
), document.getElementById('react-app'));
