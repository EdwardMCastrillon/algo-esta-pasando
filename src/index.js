import React from 'react'
import { render } from 'react-dom'
import { Router,Route, browserHistory } from 'react-router'

import App from './containers/app'
import Inicio from './components/inicio'
import Contenido from './components/contenido'

import RouterApp from './routes'

console.log(RouterApp.home.path);

if (process.env.BROWSER) {
    require("style/Root.scss");

}
function prueba(){
    // console.log(Inicio.updateprueba())
}
render((

    <Router history={browserHistory}>
        <Route component={App}>
            <Route path={RouterApp.home.path} component={RouterApp.home.handler} onEnter={prueba}/>
            <Route path={RouterApp.home.path} component={RouterApp.home.handler} onEnter={prueba}/>
            <Route path={RouterApp.contenido.path} component={RouterApp.contenido.handler} onEnter={prueba}/>
        </Route>
    </Router>

), document.getElementById('app'))
