/*
* Module dependencies
*/
import request from 'request'
import levelup from 'level'
import endpoints from '../utils/endpoints'
import Extras from '../utils/extraFunctions'

const extras = new Extras()
const db = levelup('../temp')
let All = []
db.del('Perfiles')
db.del('Agenda')
db.del('Contenidos')
db.del('Comentarios')
db.del('Recursos')
// Funciones para consultar la API de tupale.
module.exports = {
    /*
    * @param type  Indica el tipo de API a consultar
    * @param callback() recibe los datos o el error
    */
    getDataByParam: (type, callback) => {
        db.get(type, (error, data) => {
            if (! error) return callback(null, JSON.parse(data))
            let endpoint = ''
            console.log('Entro a consultar')
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
                case 'AeP':
                    endpoint = endpoints.aeP
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
                let result = extras.normalizeNames(body)
                let orderData = extras.orderedKeys(result)
                let inHtml = extras.normalizeHtml(orderData)
                callback(null, inHtml)
            })
        })
    },
    /*
    * Este metodo consume todas las API´s y almacena la información de manera temporal
    */
    getAllData: () => {
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
            db.put('Perfiles', JSON.stringify(inHtml))
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
            db.put('All', JSON.stringify(All))
        }).catch((error) => {
            console.error(error)
        })
    },

    getEdition: (callback) => {
        let endpoint = endpoints.parametrizacion
        let edicionPromise = new Promise((resolve, reject) => {
            request({
                url: endpoint,
                method: 'GET',
                json: true
            }, (error, response, body) => {
                if (error) reject(error)
                resolve(body)
            })
        }).then((ediciones) => {
            let result = extras.getEdition(ediciones)
            callback(null, result)
        }).catch((error) => {
            callback(e)
        })
    },

    getRelations: (autor, callback) => {
        db.get('All', { fillCache: false }, (error, data) => {
            let result = []
            if (! error) {
                result = extras.filterByAutor(autor, JSON.parse(data))
                callback(null, result)
            } else {
                result = extras.filterByAutor(autor, All)
                callback(null, result)
            }
        })
    },

    getEdiciones(e,callback){
        request({
            url: endpoints.ediciones,
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (error) callback(error)

            body = extras.formatEdicion(body)
            callback(null, body)
        })
    },

    getMapCoords: (callback) => {
        db.get('All', { fillCache: false }, (error, data) => {
            if (! error) {
                let result = extras.filterCoords(JSON.parse(data))
                callback(null, result)
            } else {
                callback(new Error('No hay datos para encontrar coordenadas, por favor ingrese nuevamente a la página'))
            }
        })
    },

    getDataByEdition: (edicion, callback) => {
        db.get('Contenidos', { fillCache: false }, (error, data) => {
            if (! error) {
                let result = extras.filterByEdition(edicion, JSON.parse(data))
                callback(null, result)
            } else {
                callback(error)
            }
        })
    },

    customSearch: (query, callback) => {
        db.get('All', { fillCache: false }, (error, data) => {
            if (! error) {
                let result = extras.customSearch(query, JSON.parse(data))
                callback(null, result)
            } else {
                callback(error)
            }
        })
    }
    
}
