const redis = require("redis")
const Connection = require(path.resolve('./configs/connections.js'))
const conRedis = Connection.REDIS

const redisClient = redis.createClient({
  host: conRedis.DB_REDIS_HOST,
  port: conRedis.DB_REDIS_PORT,
  password: conRedis.DB_REDIS_PASSWORD
})

redisClient.on("ready", (ready) => {
  console.error("Ready Redis!")
})

redisClient.on("connect", (ready) => {
  console.error("Connect Redis!")
})

redisClient.on("reconnecting", (ready) => {
  console.error("Reconnecting Redis!")
})

redisClient.on("error", (error) => {
  console.error("Error Redis!")
})

redisClient.on("end", (error) => {
  console.error("End Redis!")
})

redisClient.on("warning", (error) => {
  console.error("Warning Redis!")
})

module.exports = redisClient