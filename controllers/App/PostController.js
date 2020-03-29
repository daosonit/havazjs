const path = require('path')
const _ = require('lodash')
const moment = require('moment')
const momenttz = require('moment-timezone')
let {
    PostRepo,
    MemberRepo,
    CommentRepo
} = require(path.resolve('./repository/index.js'))
const BaseController = require(path.resolve('./controllers/BaseController.js'))
const {
    NotFoundException
} = require(path.resolve('./exception/index.js'))
const PostTransformer = require(path.resolve('./transformer/Website/PostTransformer.js'))

class PostController extends BaseController {

    async indexPost(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery,
                page,
                pageSize,
                limit
            } = await this.request(req)

            let objWhere = new Object()
            const options = {
                where: objWhere,
                page: page,
                pageSize: pageSize
            }

            let posts = await PostRepo.paginatePost(options)
            let data = await this.paginate(posts, new PostTransformer())

            return this.success(req, res, data)
        } catch (error) {
            return this.error(req, res, error)
        }
    }

    async showPost(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let objWhere = {
                id: objParams.id
            }

            let objPost = await PostRepo.findOnePost({
                where: objWhere
            })
            if (!(objPost instanceof this.dbSocial.Post)) throw new NotFoundException('Không tìm thấy bản ghi.')
            let data = await this.item(objPost, new PostTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async storePost(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let objFile = req.file
            // let uploadFile = new UploadFile()
            // await uploadFile.uploadImage(objFile)

            let inputs = {
                content: objBody.content,
                like: 0,
                comment: 0,
                image: null,
                images: null,
                createdBy: (objAuth) ? objAuth.uuid : null,
                status: true,
            }

            let objPost = await PostRepo.createPost(inputs)
            let data = await this.item(objPost, new PostTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async updatePost(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let objWhere = {
                id: objParams.id
            }

            let objPost = await PostRepo.findOnePost({
                where: objWhere
            })

            if (!(objPost instanceof this.dbSocial.Post)) throw new NotFoundException('Không tìm thấy bản ghi.')

            let inputs = {
                content: objBody.content,
                status: true,
            }

            let result = await this.tap(objPost, inputs)
            let data = await this.item(result, new PostTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async destroyPost(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let objWhere = {
                id: objParams.id
            }

            let objPost = await PostRepo.findOnePost({
                where: objWhere
            })

            if (!(objPost instanceof this.dbSocial.Post)) throw new NotFoundException('Không tìm thấy bản ghi.')

            let inputs = {
                content: objBody.content,
                status: true,
            }

            let result = await this.tap(objPost, inputs)
            let data = await this.item(result, new PostTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async likePost(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let objWhere = {
                id: objParams.id
            }

            let objPost = await PostRepo.findOnePost({
                where: objWhere
            })

            if (!(objPost instanceof this.dbSocial.Post)) throw new NotFoundException('Không tìm thấy bản ghi.')

            let inputs = {
                content: objBody.content,
                status: true,
            }

            let result = await this.tap(objPost, inputs)
            let data = await this.item(result, new PostTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }
    // Comment
    async indexComment(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery,
                page,
                pageSize,
                limit
            } = await this.request(req)

            let objWhere = new Object()

            if (objQuery.name) where.name = {
                $like: `%${objQuery.name}%`
            }


            const options = {
                where: objWhere,
                page: page,
                pageSize: pageSize
            }

            let posts = await PostRepo.paginatePost(options)
            let data = await this.paginate(posts, new TourTransformer())

            return this.success(req, res, data)
        } catch (error) {
            return this.error(req, res, error)
        }
    }

    async showComment(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)
            let id = objParams.id
            let objPost = await PostRepo.findOnePost({
                where: {
                    id: id
                }
            })
            if (!(objPost instanceof this.db.Tour)) throw new NotFoundException('Không tìm thấy bản ghi.')
            let data = await this.item(objPost, new TourTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async storeComment(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)
            // return this.success(req, res, { objBody, objParams, objAuth, objQuery })
            let objFile = req.file

            let uploadFile = new UploadFile()
            // await uploadFile.uploadImage(objFile)

            return this.success(req, res, objFile)

            let inputs = {
                code: objBody.code,
                type: objBody.type,
                locationStartId: objBody.locationStartId,
                locationStart: objBody.locationStart,
                locationEndId: objBody.locationEndId,
                locationEnd: objBody.locationEnd,
                numberOfDays: objBody.numberOfDays,
                numberOfNights: objBody.numberOfNights,
                journeys: objBody.journeys,
                description: objBody.status,
                status: objBody.UUID,
                supplierId: objAuth.supplierId,
                createdBy: objAuth.uuid,
                updatedBy: objAuth.uuid,
            }

            let objPost = await PostRepo.createPost(inputs)
            let data = await this.item(objPost, new TourTransformer())

            return this.success(req, res, {
                status: 'ok'
            })
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async updateComment(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let id = objParams.id
            let objPost = await PostRepo.findOnePost({
                where: {
                    id: id
                }
            })
            if (!(objPost instanceof this.db.Tour)) throw new NotFoundException('Không tìm thấy bản ghi.')

            let inputs = {
                code: objBody.code,
                type: objBody.type,
                locationStartId: objBody.locationStartId,
                locationStart: objBody.locationStart,
                locationEndId: objBody.locationEndId,
                locationEnd: objBody.locationEnd,
                numberOfDays: objBody.numberOfDays,
                numberOfNights: objBody.numberOfNights,
                journeys: objBody.journeys,
                description: objBody.status,
                status: objBody.UUID,
                supplierId: objAuth.supplierId,
                updatedBy: objAuth.uuid,
            }

            let result = await this.tap(objPost, inputs)
            let data = await this.item(result, new TourTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async destroyComment(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let id = objParams.id
            let objPost = await PostRepo.findOnePost({
                where: {
                    id: id
                }
            })
            if (!(objPost instanceof this.db.Tour)) throw new NotFoundException('Không tìm thấy bản ghi.')

            let inputs = {
                status: objBody.status,
                updatedBy: objAuth.uuid,
            }

            let result = await this.tap(objPost, inputs)
            let data = await this.item(result, new TourTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async likeComment(req, res) {
        try {
            let {
                objBody,
                objParams,
                objAuth,
                objQuery
            } = await this.request(req)

            let id = objParams.id
            let objPost = await PostRepo.findOnePost({
                where: {
                    id: id
                }
            })
            if (!(objPost instanceof this.db.Tour)) throw new NotFoundException('Không tìm thấy bản ghi.')

            let inputs = {
                status: objBody.status,
                updatedBy: objAuth.uuid,
            }

            let result = await this.tap(objPost, inputs)
            let data = await this.item(result, new TourTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }
}

module.exports = new PostController();