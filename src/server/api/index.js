import express from 'express'
// Se importa el cliente para realizar las peticiones al servidor de Tupale
import client from '../utils/tupaleClient'
import { orderedKeys, normalizeNames, filterByAutor } from '../utils/extraFunctions'

const Router = express.Router()

// GET /posts => Esta ruta permite obtener todos los posts disponibles
Router.get('/posts', (req, res) => {
  client.getAllPosts((error, posts) => {
    if (error) {
      res.sendStatus(500).json(error)
    }
    let data = orderedKeys(posts)
    res.json(data)
  })
})

Router.get('/perfiles', (req, res) => {
  client.getAllPerfiles((error, perfiles) => {
    if (error) {
      res.sendStatus(500).json(error)
    }
    let data = orderedKeys(perfiles)
    res.json(data)
  })
})

// GET /recursos => Esta ruta permite obtener todos los recursos disponibles
Router.get('/recursos', (req, res) => {
  client.getAllResources((error, recursos) => {
    if (error) {
      res.sendStatus(500).json(error)
    }
    let data = orderedKeys(recursos)
    res.json(data)
  })
})

/* POST /relaciones/:autor
* Esta ruta permite encontrar toda la información relacionada a un Autor
* @param autor -> String (Nombre del autor)
*/

Router.post('/relaciones', (req, res) => {
  let autor = req.body.autor
  client.getAllData((error, jsons) => {
    if (error) res.sendStatus(500).json(error)
    let data = normalizeNames(jsons)
    let filterData = filterByAutor(autor, data)
    res.json(filterData)
  })
})

export default Router
