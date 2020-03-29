let path = require('path')
let amqp = require('amqplib')
const ConnectionConfig = require(path.resolve('./configs/connections.js')).AMQP

const strConnection = `amqp://${ConnectionConfig.AMQP_USERNAME}:${ConnectionConfig.AMQP_PASSWORD}@${ConnectionConfig.AMQP_HOST}:${ConnectionConfig.AMQP_PORT}`

let connection = amqp.connect(strConnection)

module.exports = connection