/*
* Module dependencies
*/
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'


import App from './containers/app'
import RouterApp from './routes'
import Inicio from './containers/inicio'
import Post from './components/post'
import "./style/Root.scss"

render((

    <Router history={browserHistory}>
        <Route component={App}>
            <IndexRoute component={Inicio} />
            <Route id={RouterApp.home.id} path={RouterApp.home.path} component={ Inicio } />
            <Route path="/post/:id" component={ Post } />
            <Route id={RouterApp.contenido.id} path={RouterApp.contenido.path} component={RouterApp.contenido.handler}/>
            <Route id={RouterApp.recursos.id} path={RouterApp.recursos.path} component={RouterApp.recursos.handler}/>
            <Route id={RouterApp.perfiles.id} path={RouterApp.perfiles.path} component={RouterApp.perfiles.handler}/>
        </Route>
    </Router>

), document.getElementById('app'))
