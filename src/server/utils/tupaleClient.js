/*
* Module dependencies
*/
import request from 'request'
import endpoints from '../utils/endpoints'
import { orderedKeys, normalizeNames, filterByAutor } from '../utils/extraFunctions'

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
            console.log('Here2')
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
                callback(null, body)
            })   
        }
    },

    getAllData: (callback) => {
        /*
        * Este metodo consume todas las API´s y almacena la información de manera temporal
        */
        if (tempData.All.length > 0) return callback(null, tempData.All)
        console.log('Here')
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
            tempData.All[0] = perfiles
            tempData.Perfiles = perfiles
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
            tempData.All[1] = agenda
            tempData.Agenda = agenda
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
            tempData.All[2] = recursos
            tempData.Recursos = recursos
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
            tempData.All[3] = contenidos
            tempData.Contenidos = contenidos
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
            tempData.All[4] = comentarios
            tempData.Comentarios = comentarios
        }).catch((error) => {
            console.error(error)
        })
    }
}
