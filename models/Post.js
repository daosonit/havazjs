'use strict';
const path = require('path')
const helpers = require(path.resolve('./kernel/Helper/index.js'))
const paginate = require(path.resolve('./kernel/Sequelize/Paginate.js'))
const AppEvents = require(path.resolve('./events/index.js'))

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV5,
        primaryKey: true
      },
      content: DataTypes.STRING,
      like: DataTypes.INTEGER,
      comment: DataTypes.INTEGER,
      image: DataTypes.INTEGER,
      images: DataTypes.INTEGER,
      createdBy: DataTypes.UUID,
      status: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: 'posts',
    }
  )

  Post.associate = (models) => {
    let optMember = {
      as: 'refMember',
      foreignKey: "createdBy",
      targetKey: "id"
    }

    Post.belongsTo(models.Member, optMember);
  };

  Post.beforeCreate(async (instance, options) => {
    instance.id = helpers.genUuid()

    return instance
  })

  Post.beforeUpdate(async (instance, options) => {
    return instance
  })

  paginate.paginate(Post)

  return Post;
}