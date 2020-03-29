'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const config = require(path.resolve('./configs/connections.js')).MYSQL
const ActivityLog = require(path.resolve('./kernel/ActivityLog/index.js'))
const db = new Object()

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
}

const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DB_DIALECT,
    operatorsAliases,
    benchmark: true, // Pass query execution time in milliseconds as second argument to logging function (options.logging).
    logging: (query, milliseconds) => {
        if (1) {
            console.log(chalk.yellow("**************************" + new Date().toJSON() + "**************************"))
            console.info(chalk.green(query))
            console.log(chalk.red.bold("Time query: " + milliseconds + " ms"))
            console.log(chalk.yellow("****************************************************************************"))
        }
    },
    pool: {
        max: 5, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 60000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released.
        evict: 1000, // The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
    },
    define: {
        hooks: {
            afterCreate(instance, options) {
                ActivityLog.log(instance, 'CREATE')
            },

            afterUpdate(instance, options) {
                ActivityLog.log(instance, 'UPDATE')
            },

            afterDestroy(instance, options) {
                ActivityLog.log(instance, 'DESTROY')
            },

            afterBulkCreate(instances, options) {
                for (let instance of instances) ActivityLog.log(instance, 'CREATE')
            }
        }
    }
})

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
})

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) db[modelName].associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db