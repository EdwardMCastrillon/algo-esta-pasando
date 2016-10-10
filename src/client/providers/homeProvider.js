import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _home = {}
let _initCalled = false
let _changeListeners = []

const HomeStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONHome(`${server}${apiEndpoints.posts}`, function (err, res) {
            res.forEach(function (item) {
                _home[item.id] = item
            })
            HomeStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getHomes: function () {
        const array = []
        for (const id in _home)
        array.push(_home[id])

        return array
    },
    getHome: function (id) {
        return _home[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONHome(url, cb) {
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


export default HomeStore
