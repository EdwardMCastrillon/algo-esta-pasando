




import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _posts = {}
let _initCalled = false
let _changeListeners = []

const perfilStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONPerfil(`${server}${apiEndpoints.perfiles}`, function (err, res) {
            let r,l,init;
            res.forEach(function (item,k) {
                _posts[item.id] = item;
                if(res[k+1]){
                    r = (res[k+1].id);
                }

                if(l != item.id && l != undefined){
                    _posts[item.id].next = l;
                }
                if(r != item.id && r != undefined){
                    _posts[item.id].prev = r;
                }
                l = item.id;
                _posts[item.id] = perfilStore.nombreCompleto(_posts[item.id])
            })

            perfilStore.notifyChange()
        })
    },
    nombreCompleto(obj){
        let nombre = obj.Nombres.trim()
        let Apellido = obj.Apellidos.trim()
        obj.nombreCompleto = `${nombre} ${Apellido}`
        return obj
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
    getPerfilName(name){

        if(name){
            for (const id in _posts){
                let nombre = _posts[id].nombreCompleto
                name = name.replace("  ","")
                name = name.trim()
                if(nombre.toLowerCase() == name.toLowerCase()){
                    return _posts[id];
                }
            }
        }
    },
    getPerfil: function (id) {
        return _posts[id]
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONPerfil(url, cb) {
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
