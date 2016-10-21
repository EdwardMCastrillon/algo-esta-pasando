import express from 'express'
// Se importa el cliente para realizar las peticiones al servidor de Tupale
import client from '../utils/tupaleClient'
import Extras from '../utils/extraFunctions'

const Router = express.Router()
const extras = new Extras()

//GET / => Carga de datos inicial
Router.get('/', (req, res) => {
    res.json('ok')
})

// GET /posts => Esta ruta permite obtener todos los posts disponibles
Router.get('/agenda', (req, res) => {
    client.getDataByParam('Agenda', (error, agenda) => {
        if (error) {
            res.sendStatus(500).json(error)
        }
        res.json(agenda)
    })
})

Router.get('/perfiles', (req, res) => {
    client.getDataByParam('Perfiles', (error, perfiles) => {
        if (error) {
            res.sendStatus(500).json(error)
        }
        res.json(perfiles)
    })
})

// GET /recursos => Esta ruta permite obtener todos los recursos disponibles
Router.get('/recursos', (req, res) => {
    client.getDataByParam('Recursos', (error, recursos) => {
        if (error) {
            res.sendStatus(500).json(error)
        }
        res.json(recursos)
    })
})


/*
* GET /contenidos
*/
Router.get('/contenidos', (req, res) => {
    client.getDataByParam('Contenidos', (error, contenidos) => {
        if (error) res.sendStatus(500).json(error)
        res.json(contenidos)
    })
})
/*
* GET /comentarios
*/
Router.get('/comentarios', (req, res) => {
    client.getDataByParam('Comentarios', (error, comentarios) => {
        if (error) res.sendStatus(500).json(error)
        res.json(comentarios)
    })
})

/* POST /relaciones/
* Esta ruta permite encontrar toda la información relacionada a un Autor
* @param autor -> String (Nombre del autor)
*/

Router.post('/relaciones', (req, res) => {
    let autor = req.body.autor
    client.getRelations(autor, (error, relaciones) => {
        res.json(relaciones)
    })
})
/* POST /ediciones/
* Esta ruta permite obtener las diferentes ediciones
* @param autor -> String (Nombre del autor)
*/

Router.get('/ediciones', (req, res) => {
    client.getEdiciones('ediciones', (error, ediciones) => {
        if (error) res.sendStatus(500).json(error)
        res.json(ediciones)
    })
})
/* POST /AeP/
*
* @param autor -> String (Nombre del autor)
*/

Router.get('/aeP', (req, res) => {
    client.getDataByParam('AeP', (error, aep) => {
        if (error) res.sendStatus(500).json(error)
        res.json(aep)
    })
})

/*
* POST /contenidoEdicion
* @param nombreEdicion -> String (Nombre de la edicion)
* Esta ruta devuelve solo el contenido asociado a una Edicion
*/

Router.post('/contenidoEdicion', (req, res) => {
    let edicion = req.body.edicion
    client.getDataByEdition(edicion, (error, contenidos) => {
        if (error) res.sendStatus(500)
        res.json(contenidos)
    })
})

/*
* GET /infoMapa
* Esta ruta devuelve un conjunto de coordenadas separadas por API.
*/
Router.get('/infoMapa', (req, res) => {
    client.getMapCoords((error, coords) => {
        if (error) res.sendStatus(500).json(error)
        res.json(coords)
    })
})

/*
* GET /search?edicion=0&autor=María Juliana Yepes Burgos
* @param edicion, autor, destacados (Querystring)
*/

Router.get('/search', (req, res) => {
    let params = [req.query.edicion, req.query.autor]
    client.customSearch(params, (error, data) => {
        if (error) res.sendStatus(500).json(error)
        res.json(data)
    })
})

/*
* POST /bitacoras
* @param FechaArticulo
*/

Router.post('/bitacoras', (req, res) => {
    let fechaArticulo = req.body.fecha
    client.getBitacorasByPost(fechaArticulo, (error, data) => {
        if (error) res.sendStatus(500).json(error)
        res.json(data)
    })
})

/*
* GET /manifiesto
* Obtiene el manifiesto de AEP
*/
Router.get('/manifiesto', (req, res) => {
    client.getManifiestos((error, manifiestos) => {
        if (error) res.sendStatus(500).json(error)
        res.json(manifiestos)
    })
})

export default Router
