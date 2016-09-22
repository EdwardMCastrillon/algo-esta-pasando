import request from 'superagent'


const API = 'https://tupale.co/milfs/api.php?tipo=simple&id=183'
let _posts = {}
let _initCalled = false
let _changeListeners = []

const perfilStore = {

    init: function () {
        if (_initCalled)
        return

        _initCalled = true
        getJSON(API, function (err, res) {
            res.forEach(function (item) {
                _posts[item.id] = item
            })
            perfilStore.notifyChange()
        })
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getPosts: function () {
        const array = []

        for (const id in _posts)
        array.push(_posts[id])

        return array
    },

    getContact: function (id) {
        return _posts[id]
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
        // _changeListeners  = _changeListeners.filter(function (l) {
        //     return listener !== l
        // })
    }
}

// localStorage.token = localStorage.token || (Date.now()*Math.random())

function getJSON(url, cb) {
    request
    .get(url)
    // .set('Content-Type', 'application/json;charset=UTF-8')
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
