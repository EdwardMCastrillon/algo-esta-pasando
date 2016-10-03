/*
* Module dependencies
*/
import request from 'superagent'

// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'

// Direccion url del server
const server = 'http://localhost:8082/api'

// Este objeto sirve como cliente para comunicacion con el servidor
const Provider = {

  getAllPosts: (callback) => {
    let URI = `${server}${apiEndpoints.posts}`
    request
      .get(URI)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (! err ) {
          callback(null, res.body)
        } else {
          callback(err)
        }
      })
  },

}

export default Provider
