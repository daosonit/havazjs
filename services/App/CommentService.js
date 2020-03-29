const path = require('path')
const _ = require('lodash')
const db = require(path.resolve('./models/Rental/index.js'));
const helpers = require(path.resolve('./kernel/Helper/index.js'))

class CommentService {
  // == start ====
  async findAllComment(options) {
    return await db.Comment.findAll(options);
  }

  async findOneComment(options) {
    return await db.Comment.findOne(options);
  }

  async paginateComment(options) {
    return await db.Comment.paginate(options);
  }

  async createComment(inputs) {
    return await db.Comment.create(inputs)
  }

  async findByPkComment(id) {
    return await db.Comment.findByPk(id)
  }

  async bulkCreateComment(option) {
    return await db.Comment.bulkCreate(option)
  }

  async countComment(option) {
    return await db.Comment.count(option)
  }
  // == end ====
}

module.exports = new CommentService();