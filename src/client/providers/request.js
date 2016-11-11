import request from 'superagent'

import Edicion from '../constants/edicion'
import apiEndpoints from '../utils/apiEndpoints'

let _posts = []
let _r = 0;
let _initCalled = false
let _changeListeners = []

const server = '/api'

const letReguest = {

    init: function (p) {
        // if (_initCalled)
        // return
        _posts = [];
        _initCalled = true
        let url = Edicion.getEdicion()[p]//.replace("amp;","");
        let data ={
            "Título": '',
            "Escribir/Párrafos/Texto":''
        };
        getJSONRAutor(url, function (err, res) {

            res.forEach(function (item) {
                switch (item.campo_nombre) {
                    case "Título":
                    data.Título = item.contenido;
                    break;
                    case "Escribir / Párrafos / Texto":
                    data["Escribir/Párrafos/Texto"] = `${data["Escribir/Párrafos/Texto"]}  ${item.contenido}`
                    break;
                }
            })
            data = letReguest.normalizeHtml(data)
            _posts = data
            letReguest.notifyChange()
        })
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },

    getletReguest: function () {
        return _posts
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },
    removeChangeListener: function (listener) {
        _changeListeners = []
    },
    normalizeHtml: function (data) {
        // data.forEach((data, index) => {
            if (data['Escribir/Párrafos/Texto']) {
                data['Escribir/Párrafos/Texto'] = data['Escribir/Párrafos/Texto'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
        // })
        return data
    }
}

function getJSONRAutor(url, cb) {
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


export default letReguest
