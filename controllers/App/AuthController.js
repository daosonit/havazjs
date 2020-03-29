const path = require('path')
const _ = require('lodash')
let { AccountService } = require(path.resolve('./services/index.js'))
const BaseController = require(path.resolve('./controllers/BaseController.js'))
const bcrypt = require(path.resolve('./kernel/Helper/bcrypt.js'))
const JwtSystem = require(path.resolve('./kernel/Auth/JwtSystem.js'))
const AuthTransformer = require(path.resolve('./transformer/System/AuthTransformer.js'))
const MinioClient = require(path.resolve('./kernel/MinIO/index.js'))
const { NotFoundException } = require(path.resolve('./exception/index.js'))

class AuthController extends BaseController {

    async signIn(req, res) {
        try {
            let { objBody, objParams, objAuth, objQuery } = await this.request(req)

            let objWhere = {
                email: objBody.email,
                type: this.db.CustomerAccount.IS_CUSTOMER,
                status: this.db.CustomerAccount.STATUS_ACTIVE
            }

            let objAccount = await AccountService.findOneCustomerAccount({ where: objWhere })
            if (!(objAccount instanceof this.db.CustomerAccount)) throw new NotFoundException('Tài khoản không tồn tại.')

            if (objAccount && await bcrypt.compareAgency(objAccount, objBody.password)) {
                let jwtSystem = new JwtSystem()
                let payload = await this.item(objAccount, new AuthTransformer())
                let infoToken = await jwtSystem.genAccessToken(payload)

                return this.success(req, res, { data: payload, meta: infoToken })
            } else {
                return this.authentication(req, res)
            }
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async signOut(req, res) {
        try {
            let { objBody, objParams, objAuth, objQuery } = await this.request(req)
            let accessToken = req.accessToken
            let result = await AccountService.removeAccessToken({ where: { accessToken: accessToken } })
            return this.success(req, res, { data: result })
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async profile(req, res) {
        try {
            let { objBody, objParams, objAuth, objQuery } = await this.request(req)

            let objWhere = {
                uuid: objAuth.uuid,
                type: this.db.CustomerAccount.IS_CUSTOMER,
                status: this.db.CustomerAccount.STATUS_ACTIVE
            }

            let objAccount = await AccountService.findOneCustomerAccount({ where: objWhere })
            if (!(objAccount instanceof this.db.CustomerAccount)) throw new NotFoundException('Tài khoản không tồn tại.')

            let data = await this.item(objAccount, new AuthTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async updateProfile(req, res) {
        try {
            let { objBody, objParams, objAuth, objQuery } = await this.request(req)

            let objWhere = {
                uuid: objAuth.uuid,
                type: this.db.CustomerAccount.IS_CUSTOMER,
                status: this.db.CustomerAccount.STATUS_ACTIVE
            }

            let objAccount = await AccountService.findOneCustomerAccount({ where: objWhere })
            if (!(objAccount instanceof this.db.CustomerAccount)) throw new NotFoundException('Tài khoản không tồn tại.')

            let inputs = {
                fullName: objBody.fullName,
                identityCard: objBody.identityCard,
                provinceId: objBody.provinceId,
                districtId: objBody.districtId,
                townId: objBody.townId,
                vilage: objBody.vilage,
                updatedBy: objAuth.uuid
            }

            let result = await this.tap(objAccount, inputs)

            let data = await this.item(result, new AuthTransformer())

            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async changePassword(req, res) {
        try {
            let { objBody, objParams, objAuth, objQuery } = await this.request(req)

            let objWhere = {
                uuid: objAuth.uuid,
                type: this.db.CustomerAccount.IS_CUSTOMER,
                status: this.db.CustomerAccount.STATUS_ACTIVE
            }

            let objAccount = await AccountService.findOneCustomerAccount({ where: objWhere })
            if (!(objAccount instanceof this.db.CustomerAccount)) throw new NotFoundException('Tài khoản không tồn tại.')

            let passwordOld = objBody.passwordOld
            let passwordNew = objBody.passwordNew

            // Kiểm tra mật khẩu cũ
            // Kiểm tra mật khẩu cũ
            let inputs = {
                password: passwordNew
            }

            let result = await this.tap(objAccount, inputs)

            let data = await this.item(result, new AuthTransformer())
            return this.success(req, res, data)
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }

    async uploadAvatar(req, res) {
        try {
            return this.success(req, res, { data: "ok" })
        } catch (error) {
            console.error(error)
            return this.error(req, res, error)
        }
    }
}

module.exports = new AuthController();
