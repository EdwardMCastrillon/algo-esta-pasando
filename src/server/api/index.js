import express from 'express'
// Se importa el cliente para realizar las peticiones al servidor de Tupale
import client from '../utils/tupaleClient'
import { orderedKeys } from '../utils/extraFunctions'

const Router = express.Router()

// GET /posts => Esta ruta permite obtener todos los posts disponibles
Router.get('/posts', (req, res) => {
  client.getAllPosts((error, posts) => {
    if (error) {
      res.sendStatus(500).json(error)
    }
    res.json(posts)
  })
})

Router.get('/perfiles', (req, res) => {
  client.getAllPerfiles((error, perfiles) => {
    if (error) {
      res.sendStatus(500).json(error)
    }
    res.json(perfiles)
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

export default Router
