/*
* Module dependencies
*/
import request from 'request'
import endpoints from '../utils/endpoints'

let tempData = {
  Contenidos: [],
  Agenda: [],
  Perfiles: [],
  Recursos: [],
  All: []
}


// Funciones para consultar la API de tupale.
module.exports = {
    /*
    * @param callback() recibe los datos o el error
    */
    getAllPosts: (callback) => {
        // Obtener el endpoint correspondiente a los posts
        let endpoint = endpoints.agenda
        if (tempData.Agenda.length === 0) {
          // Hacer el request al endpoint de tupale para obtener todos los posts
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) callback(error)
              tempData.Agenda = body
              callback(null, body)
          })
        } else {
          callback(null, tempData.Agenda)
        }
    },

    getAllPerfiles: (callback) => {
        // Obtener el endpoint correspondiente a los perfiles
        let endpoint = endpoints.perfiles
        if (tempData.Perfiles.length === 0) {
          // Hacer el request al endpoint de tupale para obtener todos los perfiles
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) callback(error)
              tempData.Perfiles = body
              callback(null, body)
          })
        } else {
          callback(null, tempData.Perfiles)
        }
    },

    getAllResources: (callback) => {
        // Obtener el endpoint correspondiente a los recursos
        let endpoint = endpoints.recursos
        if (tempData.Recursos.length === 0) {
          // Hacer el request al endpoint de tupale para obtener todos los recursos
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) callback(error)
              tempData.Recursos = body
              callback(null, body)
          })
        } else {
          callback(null, tempData.Recursos)
        }

    },

    getAllData: (callback) => {
        /*
        * Recursos, Contenidos, Bitacoras, comentarioRedaccion
        */
        if (tempData.All.length === 0) {
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
                  tempData.All = jsons
                  callback(null, jsons)
                })
                .catch((error) => {
                  callback(error)
                })
        } else {
          callback(null, tempData.All)
        }

    },

    getAllContenidos: (callback) => {
        // Obtener el endpoint correspondiente a los recursos
        let endpoint = endpoints.contenidos
        if (tempData.Contenidos.length === 0) {
          // Hacer el request al endpoint de tupale para obtener todos los recursos
          request({
              url: endpoint,
              method: 'GET',
              json: true
          }, (error, response, body) => {
              if (error) callback(error)
              tempData.Contenidos = body
              callback(null, body)
          })
        } else {
          callback(null, tempData.Contenidos)
        }
    },
}
