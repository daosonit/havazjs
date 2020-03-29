let path = require('path')
require('dotenv').config({
  path: path.resolve('./.env')
})

module.exports = {
  development: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: ""
  },

  stagging: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: ""
  },

  production: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: ""
  }
}