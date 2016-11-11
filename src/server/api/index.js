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
    let edicion = req.body.edicion
    client.getRelations(autor, edicion, (error, relaciones) => {
        res.json(relaciones)
    })
})
/* POST /ediciones/
* Esta ruta permite obtener las diferentes ediciones
* @param autor -> String (Nombre del autor)
*/

Router.get('/ediciones', (req, res) => {
    client.getEdiciones((error, ediciones) => {
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
* GET /search?edicion=Imaginarios de paz&autor=María Juliana Yepes Burgos
* @param edicion, autor, destacados (Querystring)
*/
Router.post('/search', (req, res) => {
    console.log(res.body);
    let params = [req.body.filtro1, req.body.filtro2, req.body.filtro3, req.body.input]
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

Router.get('/refreshData', (req, res) => {
    client.getAllData((error, confirm) => {
        if (!error && confirm == "ok") {
            res.send("La información se actualizo correctamente")
        }
    })
})

/*
* GET /ultimosPosts?edicion=Imanarios de paz
* @param Nombre de la edicion
*/
Router.get('/ultimosPosts', (req, res) => {
    console.log(req.query);
    let edicion = req.query.edicion
    client.getLastContenidos(edicion, (error, posts) => {
        if (error) res.sendStatus(500).json(error)
        res.json(posts)
    })
})

/*
* GET /relacionesPost?etiqueta=Imanarios de paz
* @param Nombre de la etiqueta para filtrar
* Esta ruta devuele los posts y los contenidos asociados a una etiqueta especifica
*/
Router.get('/relacionesPost', (req, res) => {
    let etiqueta = req.query.etiqueta
    client.getRelacionesEtiqueta(etiqueta, (error, resultados) => {
        if (error) res.sendStatus(500).json(error)
        res.json(resultados)
    })
})

Router.get('/sobre', (req, res) => {
    client.getSobre((error, sobre) => {
        if (error) res.sendStatus(500).json(error)
        res.json(sobre)
    })
})

export default Router
