import request from 'superagent'
// Importamos los endpoints de el servidor propio
import apiEndpoints from '../utils/apiEndpoints'
// Direccion url del server
const server = `/api`

let _search = {}
let _initCalled = false
let _changeListeners = []

const SearchStore = {

    init: function (getData) {
        // if (_initCalled)
        // return
        _search = {}
        _initCalled = true
        getJSONsearch(`${server}${apiEndpoints.search}`,getData, function (err, res) {
            let r,l,init;
            res.forEach(function (item,k) {
                _search[item.id] = item;
                if(res[k+1]){
                    r = (res[k+1].id);
                }else{
                    r = (r)? r: init;
                }
                if (k == 0) {
                    init = item.id;
                }
                _search[item.id].next = r;
                _search[item.id].prev = l;
                l = item.id;
            })
            SearchStore.notifyChange()
        })
    },
    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },
    getsearchs: function () {
        const array = []
        for (const id in _search)
        array.push(_search[id])

        return array
    },
    getsearch: function (id) {
        return _search[id]
    },
    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    }
}

function getJSONsearch(url,getData, cb) {
    request
    .post(url)
    .send(getData)
    .end(function(err, res){

        if (res.status === 404) {
            cb(new Error('not found'))
        } else {
            cb(null, (res.body))
        }
    });
}


export default SearchStore
