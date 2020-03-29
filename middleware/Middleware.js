const path = require('path')

class Middleware {
  async handle(req, res, next) {
    return next()
  }
}

module.exports = Middleware