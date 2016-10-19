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
        getJSONInit(`${server}${apiEndpoints.edicion}`, function (err, res) {
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
        console.log(_Init);
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
    .get('/api')
    // .set('Accept', 'application/json')
    .end(function(err, res){
        console.log(res);
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}
export default Init
