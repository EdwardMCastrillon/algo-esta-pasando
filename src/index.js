import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './app'

import Inicio from './components/inicio'
import Contenido from './components/contenido'


if (process.env.BROWSER) {
    require("style/Root.scss");
}
render((
    <div>
        <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path="/inicio" component={Inicio}/>
            <Route path="/contenido" component={Contenido}/>
        </Route>
    </Router>
</div>
), document.getElementById('app'))
