import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _Edicion = []
let _initCalled = false
let _changeListeners = []
// localStorage.setItem("edicion")
// localStorage.getItem("edicion")
const Edicion = {

    init: function () {
        if (_initCalled)
        return
        getInitialData()
        _initCalled = true
        getJSONEdicion(`${server}${apiEndpoints.edicion}`, function (err, res) {
            let r,l,init;

            res.forEach(function (item,k) {
                _Edicion[item.EDNUMERO] = item;
            })
            Edicion.notifyChange();
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getEdiciones:function(){
        return _Edicion;
    },
    getEdicion: function () {
        const array = []
        if(localStorage.getItem("edicion") && parseInt(localStorage.getItem("edicion")) >= 0){
            return _Edicion[localStorage.getItem("edicion")]
        }else{
            localStorage.setItem("edicion",_Edicion.length - 1);
            return _Edicion[_Edicion.length - 1]
        }

    },
    getEdicionId: function (id) {
        localStorage.setItem("edicion",id);
        return _Edicion[id]
    },
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
    .end(function(err, res){
        console.log(res);
    })
}

export default Edicion
