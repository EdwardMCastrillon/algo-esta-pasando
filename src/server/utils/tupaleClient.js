/*
* Module dependencies
*/
import request from 'request'
import endpoints from '../utils/endpoints'
import Extras from '../utils/extraFunctions'
import levelup from 'level'


let tempData = {
  Contenidos: [],
  Agenda: [],
  Bitacoras: [],
  Perfiles: [],
  Recursos: [],
  Comentarios: [],
  All: [] // 0 = perfiles, 1 = agenda, 2 = recursos, 3 = contenidos, 4 = comentarios
}


const extras = new Extras()
const db = levelup('../temp/aep.db')

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
                let orderData = extras.orderedKeys(body)
                callback(null, orderData)
            })   
        }
    },

    getAllData: (callback) => {
        /*
        * Este metodo consume todas las API´s y almacena la información de manera temporal
        */
        db.get('All', (error, data) => {
            if (error) console.error(error)
            let result = JSON.parse(data)
            let All = []
            if (result.length > 0) {
                callback(null, result)
            } else {
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
                    let result = extras.normalizeNames(perfiles)
                    let orderData = extras.orderedKeys(result)
                    let inHtml = extras.normalizeHtml(orderData)
                    db.put('Perfiles', inHtml)
                    All[0] = inHtml
                    db.put('All', JSON.stringify(All))
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
                    let orderData = extras.orderedKeys(agenda)
                    let result = extras.normalizeNames(orderData)
                    let inHtml = extras.normalizeHtml(result)
                    db.put('Agenda', JSON.stringify(inHtml))
                    All[1] = inHtml
                    db.put('All', JSON.stringify(All))
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
                    let orderData = extras.orderedKeys(recursos)
                    let result = extras.normalizeNames(orderData)
                    let inHtml = extras.normalizeHtml(result)
                    db.put('Recursos', JSON.stringify(inHtml))
                    All[2] = inHtml
                    db.put('All', JSON.stringify(All))
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
                    let orderData = extras.orderedKeys(contenidos)
                    let result = extras.normalizeNames(orderData)
                    let inHtml = extras.normalizeHtml(result)
                    db.put('Contenidos', JSON.stringify(inHtml))
                    All[3] = inHtml
                    db.put('All', JSON.stringify(All))
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
                    let orderData = extras.orderedKeys(comentarios)
                    let result = extras.normalizeNames(orderData)
                    let inHtml = extras.normalizeHtml(result)
                    db.put('Comentarios', JSON.stringify(inHtml))
                    All[4] = inHtml
                    db.put('All', JSON.parse(All))
                }).catch((error) => {
                    console.error(error)
                })
            }
        })
    },

    getRelations: (autor) => {
        let result = extras.filterByAutor(autor, tempData.All)
        return result
    }
}
