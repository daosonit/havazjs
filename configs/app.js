'use strict'
let path = require('path')
require('dotenv').config({ path: path.resolve('./.env') })
const rateLimit = require('express-rate-limit')

module.exports = {
    PORT: process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET || '',
    TOKEN_KEY_FCM: process.env.TOKEN_KEY_FCM || '',

    allLimiter: rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 5, // start blocking after 5 requests
        message: 'Too many request from this IP, please try again after an hour'
    })

}
