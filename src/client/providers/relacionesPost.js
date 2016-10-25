import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'

let _posts = {}
let _initCalled = false
let _changeListeners = []

const server = '/api'

const relacionesPost = {

    init: function (name) {
        // if (_initCalled)
        // return
        _posts = {};
        _initCalled = true
        getJSONRpost(`${server}${apiEndpoints.relacionesPost}`,name, function (err, res) {
            // res.forEach(function (item, key) {
            //     _posts[key+1] = item
            //     _posts[key+1].keyId = key+1
            //     _posts[key+1].maxId = res.length;
            // })
            _posts = res
            relacionesPost.notifyChange()
        })
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getRposts: function () {
        const array = []
        for (const id in _posts)
        array.push(_posts[id])

        return array
    },

    getRpost: function (id) {
        return _posts[id]
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONRpost(url,name, cb) {
    request
    .get(url)
    .query({ etiqueta: name})
    .set('Accept', 'application/json')
    .end(function(err, res){
        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}


export default relacionesPost
