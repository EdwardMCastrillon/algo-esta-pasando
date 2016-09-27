/*
* Module dependencies
*/
import request from 'superagent'
import endpoints from '../utils/endpoints.js'

// Funciones para consultar la API de tupale.
/*
* @return Posts
*/
module.exports = {
  getAllPosts: (callback) => {
    // Obtener el endpoint correspondiente a los posts
    let endpoint = endpoints.posts
    // Hacer el request al endpoint de tupale para obtener todos los posts
    request
      .get(endpoint)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (! err ) {
          callback(null, res.body)
        }
        callback(err)
      })
  }
}
