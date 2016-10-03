import express from 'express'
// Se importa el cliente para realizar las peticiones al servidor de Tupale
import client from '../utils/tupaleClient.js'

const Router = express.Router()


// GET /posts => Este metodo permite obtener todos los posts disponibles
Router.get('/posts', (req, res) => {
  client.getAllPosts((error, posts) => {
    if (error) {
      res.sendStatus(500).json(error)
    }

    res.json(posts)
  })
})

export default Router
