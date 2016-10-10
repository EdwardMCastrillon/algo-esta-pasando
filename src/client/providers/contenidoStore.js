import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _Contenidos = {}
let _initCalled = false
let _changeListeners = []

const ContenidosStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONContenidos(`${server}${apiEndpoints.contenidos}`, function (err, res) {
            res.forEach(function (item) {
                _Contenidos[item.id] = item
            })
            ContenidosStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getContenidoss: function () {
        const array = []
        for (const id in _Contenidos)
        array.push(_Contenidos[id])

        return array
    },
    getContenidos: function (id) {
        return _Contenidos[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONContenidos(url, cb) {
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


export default ContenidosStore
