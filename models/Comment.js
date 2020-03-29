'use strict';
const path = require('path')
const helpers = require(path.resolve('./kernel/Helper/index.js'))
const paginate = require(path.resolve('./kernel/Sequelize/Paginate.js'))
const AppEvents = require(path.resolve('./events/index.js'))

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV5,
        primaryKey: true
      },
      postId: DataTypes.UUID,
      commentId: DataTypes.UUID,
      content: DataTypes.STRING,
      like: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.INTEGER,
      images: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: 'comments',
    }
  )

  Comment.associate = (models) => {
    let optPost = {
      as: 'refPost',
      foreignKey: "postId",
      targetKey: "id"
    }
    let optMember = {
      as: 'refMember',
      foreignKey: "createdBy",
      targetKey: "id"
    }

    Comment.belongsTo(models.Member, optMember);
    Comment.belongsTo(models.Post, optPost);
  };

  Comment.beforeCreate(async (instance, options) => {
    instance.id = helpers.genUuid()

    return instance
  })

  Comment.beforeUpdate(async (instance, options) => {
    return instance
  })

  paginate.paginate(Comment)

  return Comment;
}