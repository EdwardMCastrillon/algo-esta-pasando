import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _location = []
let _initCalled = false
let _changeListeners = []

const locationMap = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONLocation(`${server}${apiEndpoints.infoMapa}`, function (err, res) {
            _location = res
            console.log("locationMap ")
            locationMap.notifyChange()
        })
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getLocations: function () {
        // const array = []
        // for (const id in _location)
        // array.push(_location[id])
        return _location
    },

    getLocation: function (id) {
        return _location[id]
    },

    addChangeListener: function (listener) {
        console.log("addChangeListener");
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONLocation(url, cb) {
    request
    .get(url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        console.log("getJSONLocation");
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}


export default locationMap
