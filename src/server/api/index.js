import express from 'express'
// Se importa el cliente para realizar las peticiones al servidor de Tupale
import client from '../utils/tupaleClient'
import { orderedKeys, normalizeNames, filterByAutor } from '../utils/extraFunctions'

const Router = express.Router()

//GET / => Carga de datos inicial
Router.get('/', (req, res) => {
    client.getAllData()
    res.end()
})

// GET /posts => Esta ruta permite obtener todos los posts disponibles
Router.get('/posts', (req, res) => {
    client.getDataByParam('Agenda', (error, posts) => {
        if (error) {
            res.sendStatus(500).json(error)
        }
        let data = orderedKeys(posts)
        res.json(data)
    })
})

Router.get('/perfiles', (req, res) => {
    client.getDataByParam('Perfiles', (error, perfiles) => {
        if (error) {
            res.sendStatus(500).json(error)
        }
        let data = orderedKeys(perfiles)
        res.json(data)
    })
})

// GET /recursos => Esta ruta permite obtener todos los recursos disponibles
Router.get('/recursos', (req, res) => {
    client.getDataByParam('Recursos', (error, recursos) => {
        if (error) {
            res.sendStatus(500).json(error)
        }
        let data = orderedKeys(recursos)
        res.json(data)
    })
})


/*
* GET /contenidos
*/
Router.get('/contenidos', (req, res) => {
  client.getDataByParam('Contenidos', (error, contenidos) => {
    if (error) res.sendStatus(500).json(error)
    let data = orderedKeys(contenidos)
    res.json(data)
  })
})

/* POST /relaciones/
* Esta ruta permite encontrar toda la información relacionada a un Autor
* @param autor -> String (Nombre del autor)
*/

Router.post('/relaciones', (req, res) => {

  let autor = req.body.autor
  client.getAllData((error, jsons) => {
    if (error) res.sendStatus(500).json(error)
    let data = normalizeNames(jsons)
    let filterData = filterByAutor(autor, data)
    let result = orderedKeys(filterData)
    res.json(result)
  })
})

export default Router
