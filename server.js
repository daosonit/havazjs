'use strict'
const path = require('path')
const http = require("http")
const AppConfig = require(path.resolve('./configs/app.js'))
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.json({
    limit: '50mb'
}))

app.use(cookieParser())
app.disable('x-powered-by')

/**************** ROUTER ****************/
app.use('/api', require(path.resolve('./routes/index.js')))

app.use((err, req, res, next) => {
    if (!err) return next()
    return res.status(500).sendFile(path.join(__dirname, "public", "500.html"))
})

app.use((req, res) => {
    return res.status(404).sendFile(path.join(__dirname, "public", "404.html"))
})

/**************** SCHEDUCE ****************/
require(path.resolve('./console/Schedule/index.js'))

let server = http.createServer(app)

server.listen(AppConfig.PORT, () => {
    console.info(AppConfig.PORT)
})

/**************** SOCKET IO ****************/
// const io = require('socket.io')(server)
// const socketIO = require(path.resolve('./sockets/index.js'))
// socketIO(io)