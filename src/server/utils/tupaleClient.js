/*
* Module dependencies
*/
import http from 'http'
import request from 'request'
import endpoints from '../utils/endpoints'


// Funciones para consultar la API de tupale.
module.exports = {
    /*
    * @param callback() recibe los datos o el error
    */
    getAllPosts: (callback) => {
        // Obtener el endpoint correspondiente a los posts
        let endpoint = endpoints.posts
        // Hacer el request al endpoint de tupale para obtener todos los posts
        request({
            url: endpoint,
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (error) {
                callback(error)
            } else {
                callback(null, body)
            }
        })
    },

    getAllPerfiles: (callback) => {
        // Obtener el endpoint correspondiente a los posts
        let endpoint = endpoints.perfiles
        // Hacer el request al endpoint de tupale para obtener todos los posts

        request({
            url: endpoint,
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (error) {
                callback(error)
            } else {
                callback(null, body)
            }
        })
    },

    getAllResources: (callback) => {
        // Obtener el endpoint correspondiente a los recursos
        let endpoint = endpoints.recursos

        // Hacer el request al endpoint de tupale para obtener todos los recursos
        request({
            url: endpoint,
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (error) callback(error)
            callback(null, body)
        })
    },

    getAllData: (callback) => {
        /*
        * Recursos, Contenidos, Bitacoras, comentarioRedaccion
        */

        let recursosPromise = new Promise((resolve, reject) => {
          let endpoint = endpoints.recursos
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) reject(error)
              resolve(body)
          })
        })

        let contenidosPromise = new Promise((resolve, reject) => {
          let endpoint = endpoints.contenidos
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) reject(error)
              resolve(body)
          })
        })

        let comentarioRedaccionPromise = new Promise((resolve, reject) => {
          let endpoint = endpoints.comentariosRedaccion
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) reject(error)
              resolve(body)
          })
        })

        const Promises = [
          recursosPromise,
          contenidosPromise,
          comentarioRedaccionPromise
        ]

        Promise
              .all(Promises)
              .then((jsons) => {
                callback(null, jsons)
              })
              .catch((error) => {
                callback(error)
              })

    }
}
