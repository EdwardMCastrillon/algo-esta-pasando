import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _Edicion = []
let _initCalled = false
let _changeListeners = []

const Edicion = {

    init: function () {
        if (_initCalled)
        return
        getInitialData()
        _initCalled = true
        getJSONEdicion(`${server}${apiEndpoints.edicion}`, function (err, res) {
            let r,l,init;
            // res.forEach(function (item,k) {
            //     _Edicion = item;
            // })
            _Edicion = res
            Edicion.notifyChange();
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getEdicion: function () {
        const array = []
        debugger
        for (const id in _Edicion)
        array.push(_Edicion[id])

        return array
    },
    // getContenido: function (id) {
    //     return _Edicion[id]
    // },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONEdicion(url, cb) {
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
function getInitialData() {
    request
    .get('/api/')
    .end()
}

export default Edicion
