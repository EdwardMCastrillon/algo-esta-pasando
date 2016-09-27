import http from 'http'
import express from 'express'
import api from './api'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8082

app.use('/api', api)

server.listen(port, () => console.log(`API Running on port: ${port}`))
