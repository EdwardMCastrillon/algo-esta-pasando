/*
* Module dependencies
*/
import request from 'request'
import endpoints from '../utils/endpoints'
import { orderedKeys, normalizeNames, filterByAutor, normalizeHtml } from '../utils/extraFunctions'

let tempData = {
  Contenidos: [],
  Agenda: [],
  Bitacoras: [],
  Perfiles: [],
  Recursos: [],
  Comentarios: [],
  All: [] // 0 = perfiles, 1 = agenda, 2 = recursos, 3 = contenidos, 4 = comentarios
}


// Funciones para consultar la API de tupale.
module.exports = {
    /*
    * @param type  Indica el tipo de API a consultar
    * @param callback() recibe los datos o el error
    */
    getDataByParam: (type, callback) => {
        if (tempData[type].length > 0) {
            callback(null, tempData[type])
        } else {
            let endpoint = ''
            switch(type) {
                case 'Perfiles':
                    endpoint = endpoints.perfiles
                    break;

                case 'Agenda':
                    endpoint = endpoints.agenda
                    break;

                case 'Recursos':
                    endpoint = endpoints.recursos
                    break;

                case 'Contenidos':
                    endpoint = endpoints.contenidos
                    break;
                case 'Comentarios':
                    endpoint = endpoints.comentariosRedaccion
                    break;
                default:
                    break; 
            }
            
            request({
                url: endpoint,
                method: 'GET',
                json: true
            }, (error, response, body) => {
                if (error) callback(error)
                let orderData = orderedKeys(body)
                callback(null, orderData)
            })   
        }
    },

    getAllData: (callback) => {
        /*
        * Este metodo consume todas las API´s y almacena la información de manera temporal
        */
        if (tempData.All.length > 0) return tempData.All
        let perfilesPromise = new Promise((resolve, reject) => {
            let endpoint = endpoints.perfiles
            request({
                url: endpoint,
                method: 'GET',
                json: true
            }, (error, response, body) => {
                if (error) reject(error)
                resolve(body)
            })
        }).then((perfiles) => {
            let result = normalizeNames(perfiles)
            let orderData = orderedKeys(result)
            let inHtml = normalizeHtml(orderData)
            tempData.All[0] = inHtml
            tempData.Perfiles = inHtml
        }).catch((error) => {
            console.error(error)
        })

        let agendaPromise = new Promise((resolve, reject) => {
            let endpoint = endpoints.agenda
            request({
                url: endpoint,
                method: 'GET',
                json: true
            }, (error, response, body) => {
                if (error) reject(error)
                resolve(body)
            })
        }).then((agenda) => {
            let orderData = orderedKeys(agenda)
            let result = normalizeNames(orderData)
            let inHtml = normalizeHtml(result)
            tempData.All[1] = inHtml
            tempData.Agenda = inHtml
        }).catch((error) => {
            console.error(error)
        })
        
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
        }).then((recursos) => {
            let orderData = orderedKeys(recursos)
            let result = normalizeNames(orderData)
            let inHtml = normalizeHtml(result)
            tempData.All[2] = inHtml
            tempData.Recursos = inHtml
        }).catch((error) => {
            console.error(error)
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
        }).then((contenidos) => {
            let orderData = orderedKeys(contenidos)
            let result = normalizeNames(orderData)
            let inHtml = normalizeHtml(result)
            tempData.All[3] = inHtml
            tempData.Contenidos = inHtml
        }).catch((error) => {
            console.error(error)
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
        }).then((comentarios) => {
            let orderData = orderedKeys(comentarios)
            let result = normalizeNames(orderData)
            let inHtml = normalizeHtml(result)
            tempData.All[4] = inHtml
            tempData.Comentarios = inHtml
        }).catch((error) => {
            console.error(error)
        })
    },

    getRelations: (autor) => {
        let result = filterByAutor(autor, tempData.All)
        return result
    }
}
