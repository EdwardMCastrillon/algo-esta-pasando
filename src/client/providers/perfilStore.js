import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = 'http://localhost:8082/api'

let _posts = {}
let _initCalled = false
let _changeListeners = []

const perfilStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONPerfil(`${server}${apiEndpoints.perfiles}`, function (err, res) {
            res.forEach(function (item, key) {
                _posts[key+1] = item
                _posts[key+1].keyId = key+1
                _posts[key+1].maxId = res.length;
            })
            perfilStore.notifyChange()
        })
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getPerfiles: function () {
        const array = []
        for (const id in _posts)
        array.push(_posts[id])

        return array
    },

    getPerfil: function (id) {
        return _posts[id]
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONPerfil(url, cb) {
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


export default perfilStore
