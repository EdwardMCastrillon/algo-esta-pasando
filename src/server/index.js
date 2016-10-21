/*
* Module Dependencies
*/
import http from 'http'
import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import api from './api'
import Client from './utils/tupaleClient'

const app = express()
const port = process.env.PORT || 8082

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', api)

// Redireccionar todas las peticiones al front
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

const server = http.createServer(app)

server.listen(port, () => console.log(`API Running on port: ${port} \nCargando Datos...`))


Client.getAllData((error, response) => {
    console.log('Datos iniciales cargados correctamente')
})

setInterval(() => {
  Client.getAllData((error, response) => {
    console.log('Se actualizaron los datos correctamente a las: ' + new Date().getHours())
  })  
}, 3600000)

