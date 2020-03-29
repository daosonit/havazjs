let path = require('path')
require('dotenv').config({
    path: path.resolve('./.env')
})

module.exports = {

    // Postgres
    POSTGRES: {
        DB_POSTGRES_HOST: process.env.DB_POSTGRES_HOST || '',
        DB_POSTGRES_PORT: process.env.DB_POSTGRES_PORT || '',
        DB_POSTGRES_USER: process.env.DB_POSTGRES_USER || '',
        DB_POSTGRES_PASSWORD: process.env.DB_POSTGRES_PASSWORD || '',
        DB_POSTGRES_DATABASE: process.env.DB_POSTGRES_DATABASE || '',
        DB_POSTGRES_DIALECT: process.env.DB_POSTGRES_DIALECT || '',
        DB_POSTGRES_STORAGE: process.env.DB_POSTGRES_STORAGE || ''
    },

    // Mysql
    MYSQL: {
        DB_MYSQL_HOST: process.env.DB_MYSQL_HOST || '',
        DB_MYSQL_PORT: process.env.DB_MYSQL_PORT || '',
        DB_MYSQL_USER: process.env.DB_MYSQL_USER || '',
        DB_MYSQL_PASSWORD: process.env.DB_MYSQL_PASSWORD || '',
        DB_MYSQL_DATABASE: process.env.DB_MYSQL_DATABASE || '',
        DB_MYSQL_DIALECT: process.env.DB_MYSQL_DIALECT || '',
        DB_STORAGE: process.env.DB_STORAGE || '',
    },

    // Kết nối mongo
    MONGO: {
        DB_MONGO_HOST: process.env.DB_MONGO_HOST || '',
        DB_MONGO_USER: process.env.DB_MONGO_USER || '',
        DB_MONGO_PASS: process.env.DB_MONGO_PASS || '',
    },

    // Redis
    REDIS: {
        DB_REDIS_HOST: process.env.DB_REDIS_HOST || '',
        DB_REDIS_PORT: process.env.DB_REDIS_PORT || '',
        DB_REDIS_KEY: process.env.DB_REDIS_KEY || '',
        DB_REDIS_PASSWORD: process.env.DB_REDIS_PASSWORD || '',
    },

    // Minio
    MINIO: {
        MINIO_END_POINT: process.env.MINIO_END_POINT || '',
        MINIO_PORT: process.env.MINIO_PORT || '',
        MINIO_USE_SSL: process.env.MINIO_USE_SSL || '',
        MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || '',
        MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || '',
    },

    // Elasticsearch
    ELASTICSEACH: {
        ELASTIC_NODE: process.env.ELASTIC_NODE || '',
        ELASTIC_USER_NAME: process.env.ELASTIC_USER_NAME || '',
        ELASTIC_PASSWORD: process.env.ELASTIC_PASSWORD || '',
    },

    // Rabitmq
    AMQP: {
        AMQP_HOST: process.env.AMQP_HOST || '',
        AMQP_PORT: process.env.AMQP_PORT || '',
        AMQP_USERNAME: process.env.AMQP_USERNAME || '',
        AMQP_PASSWORD: process.env.AMQP_PASSWORD || '',
    }
}