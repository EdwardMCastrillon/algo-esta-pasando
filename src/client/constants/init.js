import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _Init = []
let _initCalled = false
let _changeListeners = []
// localStorage.setItem("edicion")
// localStorage.getItem("edicion")
const Init = {
    init: function () {
        if (_initCalled)
        return
        _initCalled = true
        getJSONInit(`${server}${apiEndpoints.edicion}`, function (err, res) {
            Init.notifyChange();
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getInit:function(){
        return _Init;
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONInit(url, cb) {
    request
    .get('/api/')
    .set('Accept', 'application/json')
    .end(function(err, res){
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}
// function getInitialData() {
//     request
//     .get('/api/')
//     .end(function(err, res){
//         console.log(res);
//     })
// }

export default Init
