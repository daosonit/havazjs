let path = require('path')
const Minio = require("minio");
const Connection = require(path.resolve('./configs/connections.js'))
let ConfigMinIO = Connection.MINIO

let minioClient = new Minio.Client({
    endPoint: ConfigMinIO.MINIO_END_POINT,
    port: ConfigMinIO.MINIO_PORT,
    useSSL: ConfigMinIO.MINIO_USE_SSL,
    accessKey: ConfigMinIO.MINIO_ACCESS_KEY,
    secretKey: ConfigMinIO.MINIO_SECRET_KEY
});

module.exports = minioClient


