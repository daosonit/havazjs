'use strict';
const path = require('path')
const helpers = require(path.resolve('./libraries/Helper/index.js'))
const paginate = require(path.resolve('./libraries/Sequelize/Paginate.js'))

module.exports = (sequelize, DataTypes) => {
    const OauthAccessToken = sequelize.define(
        'OauthAccessToken',
        {
            uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV5, primaryKey: true },
            userId: DataTypes.UUID,
            accessToken: DataTypes.TEXT,
            browser: DataTypes.STRING,
            deviceName: DataTypes.STRING,
            source: DataTypes.STRING,
            ipRequest: DataTypes.UUID,
            createdAt: DataTypes.DATE,
            expiredAt: DataTypes.DATE
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'oauthAccessTokens',
        }
    );

    OauthAccessToken.beforeCreate((instance, options) => {
        instance.uuid = helpers.genUuid()
        instance.createdAt = helpers.currentDateVn()

        return instance
    });

    paginate.paginate(OauthAccessToken)

    return OauthAccessToken;
};