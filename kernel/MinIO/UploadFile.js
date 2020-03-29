const path = require('path')
const moment = require('moment')
const Minio = require("minio");

const ConnectionConfig = require(path.resolve('./configs/connections.js'))
let ConfigMinIO = ConnectionConfig.MINIO

class UploadFile {
    constructor() {
        this.path = 'xxxx' 
        this.minioClient = new Minio.Client({
            endPoint: ConfigMinIO.MINIO_END_POINT,
            port: ConfigMinIO.MINIO_PORT,
            useSSL: ConfigMinIO.MINIO_USE_SSL,
            accessKey: ConfigMinIO.MINIO_ACCESS_KEY,
            secretKey: ConfigMinIO.MINIO_SECRET_KEY
        });
    }

    async makeBucket(bucketName) {
        return await this.minioClient.makeBucket(bucketName)
    }

    async bucketExists(bucketName) {
        return await this.minioClient.bucketExists(bucketName)
    }

    async putObject(bucketName, fileName, buffer) {
        return await this.minioClient.putObject(bucketName, fileName, buffer)
    }

    async removeBucket() {

    }

    async listObjects() {

    }

    async listIncompleteUploads() {

    }

    async uploadImage(objFile, prefix = '') {
        const bucketImages = 'images'
        let _prefix = (prefix) ? prefix : Math.random().toString(36).substring(7)
        console.log("===================================================")
        console.log(_prefix)
        let checkBucket = await this.bucketExists(bucketImages)
        if (!checkBucket) await this.makeBucket(bucketImages)

        let ext = 'png'

        let fileName = _prefix + '_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.' + ext
        let objBuffer = objFile.buffer

        await this.putObject(bucketImages, fileName, objBuffer)

        return `${this.path}${bucketImages}/${fileName}`
    }

    async uploadFile(objFile, prefix = '') {
        const bucketFile = 'files'
        let checkBucket = await this.bucketExists(bucketFile)
        if (!checkBucket) await this.makeBucket(bucketFile)

        let fileName = objFile.originalname
        let objBuffer = objFile.buffer

        await this.putObject(bucketFile, fileName, objBuffer)

        return `${this.path}${bucketFile}/${fileName}`
    }
}

module.exports = UploadFile;