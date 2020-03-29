const path = require('path')
const _ = require('lodash')
const db = require(path.resolve('./models/index.js'));
const helpers = require(path.resolve('./kernel/Helper/index.js'))

class MemberService {
  // == start ====
  async findAllMember(options) {
    return await db.Member.findAll(options);
  }

  async findOneMember(options) {
    return await db.Member.findOne(options);
  }

  async paginateMember(options) {
    return await db.Member.paginate(options);
  }

  async createMember(inputs) {
    return await db.Member.create(inputs)
  }

  async findByPkMember(id) {
    return await db.Member.findByPk(id)
  }

  async bulkCreateMember(option) {
    return await db.Member.bulkCreate(option)
  }

  async countMember(option) {
    return await db.Member.count(option)
  }
  // == end ====
}

module.exports = new MemberService();