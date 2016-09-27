import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'


import App from './containers/app'
import RouterApp from './routes'
require("./style/Root.scss");

render((

    <Router history={browserHistory}>
        <Route component={App}>
            <Route id={RouterApp.home.id} path={RouterApp.home.path} component={RouterApp.home.handler}>
                <Route path="p/:id" component={RouterApp.home.handlerid}/>
            </Route>
            <Route id={RouterApp.home.id} path={RouterApp.home.path} component={RouterApp.home.handler}/>
            <Route id={RouterApp.contenido.id} path={RouterApp.contenido.path} component={RouterApp.contenido.handler}/>
            <Route id={RouterApp.recursos.id} path={RouterApp.recursos.path} component={RouterApp.recursos.handler}/>
            <Route id={RouterApp.perfiles.id} path={RouterApp.perfiles.path} component={RouterApp.perfiles.handler}/>
        </Route>
    </Router>

), document.getElementById('app'))
