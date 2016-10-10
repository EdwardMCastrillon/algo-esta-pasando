/*
* Module dependencies
*/

module.exports = {
    // Funcion para quitar los espacios de las claves de un objeto
    orderedKeys: (data) => {
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
    },

    normalizeNames: (data) => {
        data.forEach((array, index) => {
          array.forEach((object, idx) => {
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
          })
        })
        return data
    },

    normalizeHtml: (data) => {
        data.forEach((data, index) => {
            if (data.Descripcióndelaactividad) {
                data.Descripcióndelaactividad = this.replace(data.Descripcióndelaactividad)
            }

            if (data['Número(Edición)deAlgoestápasando']) {
                data['Número(Edición)deAlgoestápasando'] = this.replace(data['Número(Edición)deAlgoestápasando'])
            }

            if (data['EDITOR(Recurso)']) {
                data['EDITOR(Recurso)'] = this.replace(data['EDITOR(Recurso)'])
            }
        })
        return data
    },

    replace: (str) => {
        return str.replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&amp;/g, '&')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&apos;/g, "'")
    },

    filterByAutor: (autor, data) => {
        let result = []
        data.forEach((array, index) => {
          array.forEach((object, idx) => {
            if (object.Autor === autor) result.push(object)
          })
        })
        return result
    }
}
