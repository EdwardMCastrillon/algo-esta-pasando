/*
* Module Dependencies
*/
import http from 'http'
import path from 'path'
import express from 'express'
import cors from 'cors'
import api from './api'

const app = express()
const port = process.env.PORT || 8082

app.use(cors())
app.use('/api', api)

const server = http.createServer(app)

server.listen(port, () => console.log(`API Running on port: ${port}`))
