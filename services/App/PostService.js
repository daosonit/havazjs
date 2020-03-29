const path = require('path')
const _ = require('lodash')
const db = require(path.resolve('./models/Rental/index.js'));
const helpers = require(path.resolve('./kernel/Helper/index.js'))

class PostService {
  // == start ====
  async findAllPost(options) {
    return await db.Post.findAll(options);
  }

  async findOnePost(options) {
    return await db.Post.findOne(options);
  }

  async paginatePost(options) {
    return await db.Post.paginate(options);
  }

  async createPost(inputs) {
    return await db.Post.create(inputs)
  }

  async findByPkPost(id) {
    return await db.Post.findByPk(id)
  }

  async bulkCreatePost(option) {
    return await db.Post.bulkCreate(option)
  }

  async countPost(option) {
    return await db.Post.count(option)
  }
  // == end ====
}

module.exports = new PostService();