/*
* Module dependencies
*/
import levelup from 'level'

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

    removeCharacters(data) {
        data.map((objeto) => {
            for(let i in objeto) {
                objeto[i] = objeto[i].toString().replace(/&aacute;/g, 'á')
                                                .replace(/&eacute;/g, 'é')
                                                .replace(/&iacute;/g, 'í')
                                                .replace(/&oacute;/g, 'ó')
                                                .replace(/&uacute;/g, 'ú')
                                                .replace(/&ntilde;/g, 'ñ')
                                                .replace(/&uuml;/g, 'ü')
            }
        })
        return data
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
            if (data['textCopyLeft']) {
                data['textCopyLeft'] = data['textCopyLeft'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
            if (data['font_grid_resumen']) {
                data['font_grid_resumen'] = data['font_grid_resumen'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }

            if (data['font_menu_izq']) {
                data['font_menu_izq'] = data['font_menu_izq'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")

            }
            if (data['font_grid_titulos']) {
                data['font_grid_titulos'] = data['font_grid_titulos'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
            if (data['font_menu_up_secciones']) {
                data['font_menu_up_secciones'] = data['font_menu_up_secciones'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
            if (data['font_subtitles']) {
                data['font_subtitles'] = data['font_subtitles'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
            if (data['font_parrafos']) {
                data['font_parrafos'] = data['font_parrafos'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }
            if (data['font_titulos']) {
                data['font_titulos'] = data['font_titulos'].replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&apos;/g, "'")
            }

        })
        return data
    }

    filterByAutor (autor, edicion, data) {
        // data [0] => perfiles, agenda, recursos, contenidos, comentarios
        let result = []

        data.forEach((array, index) => {
            array.forEach((object, idx) => {
                if (object.Autor && object.Autor.trim() === autor) {
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
                        if (object['Número(Edición)deAlgoestápasando'] && object['Número(Edición)deAlgoestápasando'].trim() === edicion) {
                          object.origen = 'Contenidos'
                          result.push(object)
                        }
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
                        name:'',
                        text: '',
                    }
                    switch(index) {
                        case 0:
                          partial.type = 'Perfil'
                          partial.id = obj['id']
                          if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                          partial.name = obj['Nombres']+" "+obj['Apellidos']
                          partial.text = obj['Perfil'].substr(0, 200) + '...'
                          break
                        case 1:
                          partial.type = 'Agenda'
                          partial.id = obj['id']
                          if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                          partial.name = obj['Nombredelaactividad']
                          partial.text = obj['Descripcióndelaactividad'].substr(0, 200) + '...'
                          break
                        case 2:
                          partial.type = 'Recurso'
                          partial.id = obj['id']
                          if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                          if (obj['Resumen']) {
                              if (obj['Resumen'] == "Falta resumen" || obj['Resumen'] == "Falta Resumen") {
                                  partial.name = obj['Título']
                                  let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                                  partial.text = text
                              } else {
                                  let text = obj['Resumen']
                                  partial.text = text
                                  partial.name = obj['Título']
                              }
                          } else {
                              let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                              partial.name = obj['Título']
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
                                  partial.name = obj['Título']
                              } else {
                                  let text = obj['Resumen']
                                  partial.text = text
                                  partial.name = obj['Título']
                              }
                          } else {
                              let text = obj['Escribir/Párrafos/Texto'].substr(0, 200) + '...'
                              partial.name = obj['Título']
                              partial.text = text
                          }
                          if (obj['AgregaunaImagen']) partial.image = obj['AgregaunaImagen']
                          break
                    }
                    if(partial.name != '' && partial.text != ''){
                        result.push(partial)
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

    customSearch (data, query) {
        let [ filtro1, filtro2, filtro3, input ] = query
        let recursos = 2, contenidos = 3
        let result = []
        data.forEach((array, index) => {
            array.forEach((obj, idx) => {
                if (input != "") {
                    if (index == 1 || index == 2 || index == 3) {
                        for(let x in obj) {
                            if (typeof obj[x] == 'string') {
                                if (obj[x].indexOf(input) !== -1) {
                                    result.push(obj)
                                }
                            }
                        }
                    }
                } else {
                    let keyFiltro1 = filtro1.name
                    let keyFiltro2 = filtro2.name
                    let keyFiltro3 = filtro2.name
                    let origen = ""

                    switch(index) {
                        case 0:
                            origen = "Perfiles"
                            break;
                        case 1:
                            origen = "Agenda"
                            break;
                        case 2:
                            origen = "Recursos"
                            break;
                        case 3:
                            origen = "Contenido"
                            break;
                        case 4:
                            origen = "Comentarios"
                            break;
                        case 5:
                            origen = "Bitacoras"
                            break;
                        case 6:
                            origen = "Manifiesto"
                            break;
                        case 7:
                            origen = "Ediciones"
                            break;
                        case 8:
                            origen = "Sobre"
                            break;
                        default:
                            break;
                    }

                    if(obj[keyFiltro1] && obj[keyFiltro1] === filtro1.value) {
                        obj.origen = origen
                        if(!result.includes[obj]) result.push(obj)
                    }

                    if(obj[keyFiltro2] && obj[keyFiltro2] === filtro2.value) {
                        obj.origen = origen
                        if(!result.includes[obj]) result.push(obj)
                    }

                    if(obj[keyFiltro3] && obj[keyFiltro3] === filtro3.value) {
                        obj.origen = origen
                        if(!result.includes[obj]) result.push(obj)
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

    filterByEtiqueta (etiqueta, data) {
        let result = data.filter((obj) => {
            if (obj['SeccionesAEP'] && obj['SeccionesAEP'].trim() == etiqueta) return obj
        })
        return result
    }

    searchFilters (ediciones, data) {
        let filtros = []
        let result = {}
        ediciones.map((edicion) => {
            let filtro1 = "", filtro2 = "", filtro3 = ""
            result[edicion['Título']] = {}
            if (edicion.FILTRO_1) {
                filtro1 = edicion.FILTRO_1.replace(/ /g, '')
                result[edicion['Título']][filtro1] = []
            }
            if (edicion.FILTRO_2) {
                filtro2 = edicion.FILTRO_2.replace(/ /g, '')
                result[edicion['Título']][filtro2] = []
            }
            if (edicion.FILTRO_3) {
                filtro3 = edicion.FILTRO_3.replace(/ /g, '')
                result[edicion['Título']][filtro3] = []
            }
            data.forEach((array, index) => {
                array.forEach((obj, idx) => {
                    if (filtro1 != "" && obj[filtro1]) {
                        if (! result[edicion['Título']][filtro1].includes(obj[filtro1])) result[edicion['Título']][filtro1].push(obj[filtro1])
                    }
                    if (filtro2 != "" && obj[filtro2]) {
                        if (! result[edicion['Título']][filtro2].includes(obj[filtro2])) result[edicion['Título']][filtro2].push(obj[filtro2])
                    }
                    
                    if (filtro3 != "" && obj[filtro3]) {
                        if (! result[edicion['Título']][filtro3].includes(obj[filtro3])) result[edicion['Título']][filtro3].push(obj[filtro3])
                    }
                })
            })
        })
        return result
    }

}
