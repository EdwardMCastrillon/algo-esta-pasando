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
    }
}
