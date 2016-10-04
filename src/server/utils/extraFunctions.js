/*
* Module dependencies
*/

module.exports = {
  // Funcion para quitar los espacios de las claves de un objeto
  orderedKeys: (data) => {
    let orderData = {}
    data.forEach((object, index) => {
      for(let key in object) {
        let newKey = key.replace(/ /g, '')
        orderData[newKey] = object[key]
      }
    })
    return orderData
  }
}
