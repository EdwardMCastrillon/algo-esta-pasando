const API = 'https://tupale.co/milfs/api.php?tipo=simple&id='
let _posts = {}
let _initCalled = false
let _changeListeners = []

const ContactStore = {

    init: function (id) {
        if (_initCalled)
        return

        _initCalled = true
        getJSON(API+id, function (err, res) {
            res.forEach(function (item) {
                _posts[item.id] = item
            })
            ContactStore.notifyChange()
        })
    },

    notifyChange: function () {
        console.log("notifyChange");
        _changeListeners.forEach(function (listener) {
            console.log("notifyChange forEach  ");
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
        console.log("addChangeListener");
        _changeListeners.push(listener)
        console.log(_changeListeners);
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
    const req = new XMLHttpRequest()
    req.onload = function () {
        console.log("llama")
        if (req.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, JSON.parse(req.response))
        }
    }
    req.open('GET', url)
    // req.setRequestHeader('authorization', localStorage.token)
    req.send()
}


export default ContactStore
