import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = '/api'

let _AeP = {}
let _initCalled = false
let _changeListeners = []

const Aep = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONAeP(`${server}${apiEndpoints.aep}`, function (err, res) {
            res.forEach(function (item,k) {
                _AeP[item.id] = item;
            })
            console.log(_AeP);
            Aep.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getAePs: function () {
        const array = []
        for (const id in _AeP)
        array.push(_AeP[id])

        return array
    },
    getAeP: function (id) {
        console.log(_AeP);
        return _AeP[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONAeP(url, cb) {

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


export default Aep
