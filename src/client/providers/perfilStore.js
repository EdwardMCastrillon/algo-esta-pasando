import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = 'http://localhost:8082/api'

// const API = 'https://tupale.co/milfs/api.php?tipo=simple&id=183'
let _posts = {}
let _initCalled = false
let _changeListeners = []

const perfilStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSON(`${server}${apiEndpoints.perfiles}`, function (err, res) {
            res.forEach(function (item) {
                _posts[item.id] = item
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
        // _changeListeners  = _changeListeners.filter(function (l) {
        //     return listener !== l
        // })
    }
}

// localStorage.token = localStorage.token || (Date.now()*Math.random())

function getJSON(url, cb) {
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
