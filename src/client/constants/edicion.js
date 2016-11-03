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
            debugger
            if(_Edicion[_Edicion.length - 1]){
                localStorage.setItem("edicion",_Edicion.length - 1);
                localStorage.setItem("nameEdicion",_Edicion[_Edicion.length - 1].Título);
                return _Edicion[_Edicion.length - 1]
            }
        }

    },
    getObjectkeys(f){
        return _Edicion[localStorage.getItem("edicion")][f].replace(new RegExp(" ", 'g'), "");
    },
    getEdicionfiltros: function(f){
        // FILTRO_1
        // FILTRO_2
        // FILTRO_3
        if(!_Edicion[localStorage.getItem("edicion")][f]){
            return []
        }
        f = _Edicion[localStorage.getItem("edicion")][f].replace(new RegExp(" ", 'g'), "");
        return _Edicion[localStorage.getItem("edicion")].filtros[f]
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
            console.log(res.body);
            cb(null, ((res.body)))
        }
    });
}

export default Edicion
