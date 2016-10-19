/*
* Module dependencies
*/

export default class Extras {
    // Funcion para quitar los espacios de las claves de un objeto
    orderedKeys (data) {
        let result = [],
        orderObject = {},
        i = 0
        data.forEach((object, index) => {
            for(let key in object) {
                let newKey = key.replace(/ /g, '')
                orderObject[newKey] = object[key]
            }
            result[i] = orderObject
            orderObject = {}
            i++
        })
        return result
    }

    normalizeNames (data) {
        data.forEach((object, idx) => {
            if (object['Autor']) {
                let nombre = object['Autor'].replace(/&aacute;/g, 'á')
                .replace(/&eacute;/g, 'é')
                .replace(/&iacute;/g, 'í')
                .replace(/&oacute;/g, 'ó')
                .replace(/&uacute;/g, 'ú')
                .replace(/&ntilde;/g, 'ñ')
                .replace(/&uuml;/g, 'ü')
                .replace(/  /g, ' ')
                .trim()
                object['Autor'] = nombre
            }
        })
        return data
    }

    normalizeHtml (data) {
        data.forEach((data, index) => {
            if (data['Descripcióndelaactividad']) {
                data['Descripcióndelaactividad'] = data['Descripcióndelaactividad'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }

            if (data['Número(Edición)deAlgoestápasando']) {
                data['Número(Edición)deAlgoestápasando'] = data['Número(Edición)deAlgoestápasando'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }

            if (data['EDITOR(Recurso)']) {
                data['EDITOR(Recurso)'] = data['EDITOR(Recurso)'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }

            if (data['Escribir/Párrafos/Texto']) {
                data['Escribir/Párrafos/Texto'] = data['Escribir/Párrafos/Texto'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
        })
        return data
    }

    filterByAutor (autor, data) {
        // data [0] => perfiles, agenda, recursos, contenidos, comentarios
        let result = []

        data.forEach((array, index) => {
            array.forEach((object, idx) => {
                if (object.Autor && object.Autor === autor) {
                    switch(index) {
                        case 0:
                        object.origen = 'Perfiles'
                        result.push(object)
                        break
                        case 1:
                        object.origen = 'Agenda'
                        result.push(object)
                        break
                        case 2:
                        object.origen = 'Recursos'
                        result.push(object)
                        break
                        case 3:
                        object.origen = 'Contenidos'
                        result.push(object)
                        break
                        case 4:
                        object.origen = 'Comentarios'
                        result.push(object)
                        break
                        default:
                        break;
                    }
                }
            })
        })
        return result
    }

    formatEdicion(body){
        let menu = {}
        for (var r = 0; r < body.length; r++) {
            for (var i = 1; i < 10; i++) {
                if(body[r][`menu${i}name`]){
                    let name = body[r][`menu${i}name`].toLowerCase().replace(new RegExp(" ", 'g'), "_");
                    if(!menu[name]){
                        menu[name] ={
                            'color': body[r][`menu${i}color`],
                            'path': body[r][`menu${i}path`],
                            'name': body[r][`menu${i}name`]
                        }
                    }
                }
            }
            body[r].menu = menu;
        }

        return body;
    }

    filterCoords (data) {
        let result = {
            'Perfiles': [],
            'Agenda': [],
            'Recursos': [],
            'Contenidos': [],
            'Comentarios': []
        }
        data.forEach((array, index) => {
            console.log(array[0])
            array.forEach((obj, idx) => {
                if (obj['Georreferencia(mapa)']) {
                    let [ latitud, longitud, num ] = obj['Georreferencia(mapa)'].split(' ')
                    switch(index) {
                        case 0:
                            result.Perfiles.push({ latitud: latitud, longitud: longitud })
                            break
                        case 1:
                            result.Agenda.push({ latitud: latitud, longitud: longitud })
                            break
                        case 2:
                            result.Recursos.push({ latitud: latitud, longitud: longitud })
                            break
                        case 3:
                            result.Contenidos.push({ latitud: latitud, longitud: longitud })
                            break
                        case 1:
                            result.Comentarios.push({ latitud: latitud, longitud: longitud })
                            break
                    }
                }
            })
        })
        return result
    }

    filterByEdition (edicion, data) {
        let result = []
        data.forEach((obj, index) => {
            if (obj['Número(Edición)deAlgoestápasando'] && obj['Número(Edición)deAlgoestápasando'].trim() === edicion) {
                result.push(obj)
            }
        })
        return result
    }
    
    getEdition (data) {
        let mayor = 0
        data.forEach((value, index) => {
            if (parseInt(value['EDNUMERO']) > mayor) {
                mayor = value['EDNUMERO']
            }
        })
        return mayor
    }


    replaceAll(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    customSearch (...query) {
        let [ edicion, autor, destacados ] = query

    }

}
