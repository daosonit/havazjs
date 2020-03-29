const path = require('path')
const _ = require('lodash')
const db = require(path.resolve('./models/Rental/index.js'));
const dbSocial = require(path.resolve('./models/Social/index.js'));
const {
  NotFoundException
} = require(path.resolve('./exception/index.js'))
const helpers = require(path.resolve('./kernel/Helper/index.js'))

class ArticleService {
  // == start ====
  async findAllArticle(options) {
    return await db.Article.findAll(options);
  }

  async findOneArticle(options) {
    return await db.Article.findOne(options);
  }

  async paginateArticle(options) {
    return await db.Article.paginate(options);
  }

  async createArticle(inputs) {
    return await db.Article.create(inputs)
  }

  async findByPkArticle(id) {
    return await db.Article.findByPk(id)
  }

  async bulkCreateArticle(option) {
    return await db.Article.bulkCreate(option)
  }

  async countArticle(option) {
    return await db.Article.count(option)
  }
  // == end ====
  // == start ====
  async findAllPost(options) {
    return await dbSocial.Post.findAll(options);
  }

  async findOnePost(options) {
    return await dbSocial.Post.findOne(options);
  }

  async paginatePost(options) {
    return await dbSocial.Post.paginate(options);
  }

  async createPost(inputs) {
    return await dbSocial.Post.create(inputs)
  }

  async findByPkPost(id) {
    return await dbSocial.Post.findByPk(id)
  }

  async bulkCreatePost(option) {
    return await dbSocial.Post.bulkCreate(option)
  }

  async countPost(option) {
    return await dbSocial.Post.count(option)
  }
  // == end ====
  // == start ====
  async findAllComment(options) {
    return await dbSocial.Comment.findAll(options);
  }

  async findOneComment(options) {
    return await dbSocial.Comment.findOne(options);
  }

  async paginateComment(options) {
    return await dbSocial.Comment.paginate(options);
  }

  async createComment(inputs) {
    return await dbSocial.Comment.create(inputs)
  }

  async findByPkComment(id) {
    return await dbSocial.Comment.findByPk(id)
  }

  async bulkCreateComment(option) {
    return await dbSocial.Comment.bulkCreate(option)
  }

  async countComment(option) {
    return await dbSocial.Comment.count(option)
  }
  // == end ====
}

module.exports = new ArticleService();