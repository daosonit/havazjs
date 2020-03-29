const path = require('path')
const _ = require('lodash')
const MixinTransformer = require(path.resolve('./kernel/Transformer/MixinTransformer.js'))
const AppEvents = require(path.resolve('./events/index.js'))

class BaseController {

    constructor() {
        const db = require(path.resolve('./models/index.js'));
        this.db = db
    }

    // Response paginate
    async paginate(data, transformer) {
        return await MixinTransformer.paginate(data, transformer)
    }

    // Response collection
    async collection(data, transformer) {
        return await MixinTransformer.collection(data, transformer)
    }

    // Response Item
    async item(data, transformer) {
        return await MixinTransformer.item(data, transformer)
    }

    // Exceoption 200
    async success(req, res, data = null) {
        let status = 200
        this.logReqAndRes(req, {
            status: status,
            data: data
        })

        return res.status(status).json(data)
    }

    // Exceoption 422
    async unprocessable(req, res, msg = null) {
        let status = 422
        let errors = [{
            msg: msg,
            param: "unprocessable",
            location: "controller"
        }]
        this.logReqAndRes(req, {
            status: status,
            data: errors
        })

        return res.status(status).json({
            errors: errors
        })
    }

    // Exceoption 500
    async error(req, res, err) {
        let status = (err && err.status) ? err.status : 500
        let strErr = (err) ? err.message.toString() : ''
        let data = {
            status: status,
            errors: true,
            message: strErr
        }
        this.logReqAndRes(req, {
            status: status,
            data: data
        })

        return res.status(status).json(data)
    }

    // Exceoption 401
    async authentication(req, res) {
        let status = 401
        let data = {
            status: status,
            errors: true,
            message: 'Tài khoản chưa xác thực.'
        }
        this.logReqAndRes(req, {
            status: status,
            data: data
        })

        return res.status(status).json(data)
    }

    // Tap update data
    async tap(object, inputs) {
        Object.keys(inputs).forEach(key => {
            if (key !== 'createdBy') object[key] = inputs[key]
        })

        return await object.save()
    }

    // Log request và response của truy cập
    async logReqAndRes(req, data) {
        // AppEvents.emit('LogRequestAndResponse', {req, data});
    }

    // Xử lý request
    async request(req) {
        let objBody = req.body
        let objParams = req.params
        let objAuth = req.Auth
        let objQuery = req.query
        let limit = await _.get(objQuery, 'limit', null)
        let offset = await _.get(objQuery, 'offset', null)
        let page = await _.get(objQuery, 'pages', 0)
        let pageSize = await _.get(objQuery, 'pageSize', 30)

        return {
            objBody,
            objParams,
            objAuth,
            objQuery,
            limit: (limit) ? parseInt(limit) : null,
            offset: (offset) ? parseInt(offset) : null,
            page: (page) ? parseInt(page) : 0,
            pageSize: (pageSize) ? parseInt(pageSize) : 30
        }
    }

    async allowPerms(perms) {
        return await perms.map(item => item.objectName + '_' + item.action)
    }

    async allowRoles(perms) {
        return await perms.map(item => item.objectName + '_' + item.action)
    }

}

module.exports = BaseController;