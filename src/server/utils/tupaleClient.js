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
// Funciones para consultar la API de tupale.
module.exports = {
    /*
    * @param type  Indica el tipo de API a consultar
    * @param callback() recibe los datos o el error
    */
    getDataByParam: (type, callback) => {
        db.get(type, { fillCache: false }, (error, data) => {
            if (! error) return callback(null, JSON.parse(data))
            console.log('Consulta')
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
                case 'AeP':
                endpoint = endpoints.aeP
                console.log(endpoint);
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

    getRelations: (autor, callback) => {
        db.get('All', { fillCache: false }, (error, data) => {
            let result = []
            if (! error) {
                result = extras.filterByAutor(autor, JSON.parse(data))
                callback(null, result)
            } else {
                console.log('Entro en la vble ', All)
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

            body = this.formatEdicion(body)
            callback(null, body)
        })
    },
    formatEdicion(body){
        let menu = {}
        for (var i = 1; i < 10; i++) {
            if(body[0][`menu${i}name`]){
                let name = body[0][`menu${i}name`].toLowerCase().replace(new RegExp(" ", 'g'), "_");
                if(!menu[name]){
                    menu[name] ={
                        'color': body[0][`menu${i}color`],
                        'path': body[0][`menu${i}path`],
                        'name': body[0][`menu${i}name`]
                    }
                }
            }
        }
        body[0].menu = menu;
        return body;
    }
}

/*
menu[body[0][`menu${i}name`] = {
'color': body[0][`menu${i}color`],
'path': body[0][`menu${i}path`],
'name': body[0][`menu${i}name`]
}

*/
