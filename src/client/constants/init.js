import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _Init = false
let _initCalled = false
let _changeListeners = []
const Init = {
    init: function () {
        getJSONInit(`${server}`, function (err, res) {
            _Init = res;
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
    .get(url)
    .end(function(err, res){
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}
export default Init
