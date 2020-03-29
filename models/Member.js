'use strict';
const path = require('path')
const helpers = require(path.resolve('./kernel/Helper/index.js'))
const paginate = require(path.resolve('./kernel/Sequelize/Paginate.js'))
const AppEvents = require(path.resolve('./events/index.js'))

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Member', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV5,
        primaryKey: true
      },
      account: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender: DataTypes.ENUM('MALE', 'FEMALE', 'UNKNOW'),
      sercretKey: DataTypes.STRING,
      identityCard: DataTypes.STRING,
      note: DataTypes.STRING,
      rank: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
      districtId: DataTypes.INTEGER,
      townId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      vilage: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    }, {
      freezeTableName: true,
      tableName: 'members',
    }
  )

  Member.associate = (models) => {};

  Member.beforeCreate(async (instance, options) => {
    instance.id = helpers.genUuid()

    return instance
  })

  Member.beforeUpdate(async (instance, options) => {
    return instance
  })

  paginate.paginate(Member)

  return Member;
}