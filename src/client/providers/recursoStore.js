import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = 'http://localhost:8082/api'

let _recurso = {}
let _initCalled = false
let _changeListeners = []

const RecursoStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONRecurso(`${server}${apiEndpoints.recursos}`, function (err, res) {
            res.forEach(function (item) {
                _recurso[item.id] = item
            })
            RecursoStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getRecursos: function () {
        const array = []
        for (const id in _recurso)
        array.push(_recurso[id])

        return array
    },
    getRecurso: function (id) {
        return _recurso[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONRecurso(url, cb) {

    request
    .get(url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        console.log(res.body);
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}


export default RecursoStore
