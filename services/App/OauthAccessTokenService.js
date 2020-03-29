const path = require('path')
const _ = require('lodash')
const db = require(path.resolve('./models/Rental/index.js'));
const helpers = require(path.resolve('./libraries/Helper/index.js'))

class OauthAccessTokenService {
  // == start ====
  async findAllAuthAccessToken(options) {
    return await db.OauthAccessToken.findAll(options);
  }

  async findOneAuthAccessToken(options) {
    return await db.OauthAccessToken.findOne(options);
  }

  async paginateAuthAccessToken(options) {
    return await db.OauthAccessToken.paginate(options);
  }

  async createAuthAccessToken(inputs) {
    return await db.OauthAccessToken.create(inputs)
  }

  async findByPkAuthAccessToken(id) {
    return await db.OauthAccessToken.findByPk(id)
  }

  async bulkCreateAuthAccessToken(option) {
    return await db.OauthAccessToken.bulkCreate(option)
  }

  async countAuthAccessToken(option) {
    return await db.OauthAccessToken.count(option)
  }

  async destroyAuthAccessToken(option) {
    return await db.OauthAccessToken.destroy(option)
  }
  // == end ====
}

module.exports = new OauthAccessTokenService()