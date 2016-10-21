import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _Comentarios = {}
let _initCalled = false
let _changeListeners = []

const ComentarioStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONComentario(`${server}${apiEndpoints.comentarios}`, function (err, res) {
            let r,l,init;
            res.forEach(function (item,k) {
                _Comentarios[item.id] = item;
                if(res[k+1]){
                    r = (res[k+1].id);
                }else{
                    r = (r)? r: init;
                }
                if (k == 0) {
                    init = item.id;
                }
                _Comentarios[item.id].next = r;
                _Comentarios[item.id].prev = l;
                l = item.id;
            })
            ComentarioStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getComentarios: function () {
        const array = []
        for (const id in _Comentarios)
        array.push(_Comentarios[id])

        return array
    },
    getComentario: function (id) {
        return _Comentarios[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONComentario(url, cb) {
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


export default ComentarioStore
