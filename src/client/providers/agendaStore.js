import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = 'http://localhost:8082/api'

let _agenda = {}
let _initCalled = false
let _changeListeners = []

const AgendaStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONAgenda(`${server}${apiEndpoints.agenda}`, function (err, res) {
            res.forEach(function (item) {
                _agenda[item.id] = item
            })
            AgendaStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getAgendas: function () {
        const array = []
        for (const id in _agenda)
        array.push(_agenda[id])

        return array
    },
    getAgenda: function (id) {
        return _agenda[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONAgenda(url, cb) {

    request
    .get(url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}


export default AgendaStore
