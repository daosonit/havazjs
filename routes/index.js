const path = require('path')
const fs = require('fs')
const basename = path.basename(__filename)

const express = require("express")
const Router = express.Router()
const Request = require(path.resolve('./requests/index.js'))
const Controller = require(path.resolve('./controllers/App/index.js'))
const Middleware = require(path.resolve('./middleware/index.js'))
const objMulter = require('multer')
const Multer = objMulter()

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
}).forEach(file => {
    let filePath = path.join(__dirname, file)
    let func = require(filePath)

    let App = {
        Router, 
        Request, 
        Controller, 
        Middleware, 
        Multer
    }

    if (typeof func === "function") func(App)
})

module.exports = Router
