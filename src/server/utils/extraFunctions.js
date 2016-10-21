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
        let result = []
        data.forEach((array, index) => {
            array.forEach((obj, idx) => {
                if (obj['Georreferencia(mapa)']) {
                    let [ longitud, latitud, scala ] = obj['Georreferencia(mapa)'].split(' ')
                    let partial = {
                        lat: latitud,
                        lng: longitud,
                        scala: scala,
                        id: '',
                        type: '',
                        image: '',
                        text: '',
                    }
                    switch(index) {
                        case 0:
                            partial.type = 'Perfil'
                            partial.id = obj['id']
                            if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                            partial.text = obj['Perfil']
                            break
                        case 1:
                            partial.type = 'Agenda'
                            partial.id = obj['id']
                            if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                            partial.text = obj['Descripcióndelaactividad']
                            break
                        case 2:
                            partial.type = 'Recurso'
                            partial.id = obj['id']
                            if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                            if (obj['Resumen']) {
                                if (obj['Resumen'] == "Falta resumen" || obj['Resumen'] == "Falta Resumen") {
                                    let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                                    partial.text = text    
                                }
                            } else {
                                let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                                partial.text = text
                            }
                            break
                        case 3:
                            partial.type = 'Contenido'
                            partial.id = obj['id']
                            if (obj['Resumen']) {
                                if (obj['Resumen'] == "Falta resumen" || obj['Resumen'] == "Falta Resumen") {
                                    let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                                    partial.text = text    
                                }
                            } else {
                                let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                                partial.text = text
                            }
                            if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                            break
                        case 4:
                            partial.type = 'Comentario'
                            partial.id = obj['id']
                            if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                            partial.text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                            break
                    }
                    result.push(partial)
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

    customSearch (data, query) {
        let [ edicion, autor ] = query
        let result = []
        data.forEach((array, index) => {
            array.forEach((obj, idx) => {
                // Si llegaron los 3 parametros
                if (edicion != "" && autor != "") {
                    // Seccion Agenda 

                    // Seccion Contenidos
                    if (obj['Autor'] && obj['Autor'].trim() == autor) {
                        result.push(obj)
                    }
                    if (obj['Número(Edición)deAlgoestápasando'] && obj['Número(Edición)deAlgoestápasando'].trim() == edicion) {
                        result.push(obj)
                    }

                    // Seccion Recursos
                    if (obj['Otrosautores'] && obj['Otrosautores'].trim() == autor) {
                        result.push(obj)
                    }
                    if (obj['Otrosautores']) {
                        let autores = obj['Otrosautores'].split(' ')
                        for (let name in autores) {
                            if (name.trim() == autor) {
                                result.push(obj)
                            }
                        }
                    }
                // Si llegaron edicion y autor.
                } else if (edicion != "" && autor == "") {
                    // Seccion Agenda

                    // Seccion Contenidos
                    if (obj['Número(Edición)deAlgoestápasando'] && obj['Número(Edición)deAlgoestápasando'].trim() == edicion) {
                        result.push(obj)
                    }
                }

            })
        })
        return result
    }

    filterBitacoras (fecha, data) {
        let result = data.filter((obj) => {
            if (obj.timestamp && obj.timestamp < fecha) return obj
        })
        return result
    }

    filterLastContenidos (edicion, data) {
        let result = data.filter(obj => obj['Número(Edición)deAlgoestápasando'].trim() == edicion)
        for(let i = 0; i < result.length; i++) {
            if (result[i + 1] && Number(result[i].timestamp) < Number(result[i + 1].timestamp)) {
                let aux = result[i]
                result[i] = result[i + 1]
                result[i + 1] = aux
            }
        }
        switch (result.length) {
            case 1:
                return result
            case 2:
                return [result[0], result[1]]
            default:
                return [result[0], result[1], result[2]]
        }
    }

}
