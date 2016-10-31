import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _editorial = {}
let _initCalled = false
let _changeListeners = []

const EditorialStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSONEditorial(`${server}${apiEndpoints.editorial}`, function (err, res) {
            res.forEach(function (item) {
                _editorial[item.id] = item
            })
            EditorialStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getEditorials: function () {
        const array = []
        for (const id in _editorial)
        array.push(_editorial[id])

        return array
    },
    getEditorial: function (id) {
        return _editorial[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONEditorial(url, cb) {
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


export default EditorialStore
