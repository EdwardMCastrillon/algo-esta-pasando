/*
* Module dependencies
*/
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'


import App from './containers/app'
import RouterApp from './routes'
import Inicio from './containers/inicio'
import "./style/Root.scss"

render((

    <Router history={browserHistory}>
        <Route component={App}>
            <IndexRoute component={Inicio} />
            <Route path={RouterApp.home.path} component={ RouterApp.home.handler } />
            <Route path={RouterApp.posContenido.path} component={ RouterApp.posContenido.handler } />
            <Route path={RouterApp.posAeP.path1} component={ RouterApp.posAeP.handler1 } />
            <Route path={RouterApp.posAeP.path} component={ RouterApp.posAeP.handler } />
            <Route path={RouterApp.postAgenda.path} component={ RouterApp.postAgenda.handler } />
            <Route path={RouterApp.sobre_algo_esta_pasando.path} component={RouterApp.sobre_algo_esta_pasando.handler}/>
            <Route path={RouterApp.posSobre_algo_esta_pasando.path} component={RouterApp.posSobre_algo_esta_pasando.handler}/>

            <Route path={RouterApp.publicar_en_aep.path} component={RouterApp.publicar_en_aep.handler}/>
            <Route path={RouterApp.editorial.path} component={RouterApp.editorial.handler}/>

            <Route path={RouterApp.recursos.path} component={RouterApp.recursos.handler}/>
            <Route path={RouterApp.posRecursos.path} component={RouterApp.posRecursos.handler}/>

            <Route path={RouterApp.agenda.path} component={RouterApp.agenda.handler}/>

            <Route path={RouterApp.perfiles.path} component={RouterApp.perfiles.handler}/>
            <Route path={RouterApp.perfil.path} component={RouterApp.perfil.handler}/>
            <Route path={RouterApp.posComentarios.path} component={RouterApp.posComentarios.handler}/>
            <Route path={RouterApp.map.path} component={RouterApp.map.handler}/>
            <Route path={RouterApp.ediciones.path} component={RouterApp.ediciones.handler}/>
        </Route>
    </Router>

), document.getElementById('app'))
