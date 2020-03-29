const path = require('path')
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const AppConfig = require(path.resolve('./configs/app.js'))
const {
    OauthAccessTokenService,
    AccountService
} = require(path.resolve('./services/index.js'))
let secretKey = AppConfig.JWT_SECRET

class Jwt {
    constructor() {
        this.optionAccessToken = {
            expiresIn: '365d'
        }
        this.optionRefreshToken = {
            expiresIn: '366d'
        }
    }

    async jwtDecode(token) {
        return await jwt.decode(token, {
            complete: true
        });
    }

    async signToken(payload) {
        return await jwt.sign(payload, secretKey, this.optionAccessToken)
    }

    async verifyToken(token) {
        return await jwt.verify(token, secretKey, this.optionAccessToken)
    }

    async saveAccessToken(payload, accessToken) {
        try {

            let params = {
                userId: payload.uuid,
                accessToken: accessToken,
                browser: payload.browser,
                deviceName: payload.browser,
                source: payload.type,
                ipRequest: payload.ipRequest,
                expiredAt: payload.expiredAt,
            }

            return await OauthAccessTokenService.createAuthAccessToken(params)
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async checkAccessTokenFromDatabase(option) {
        let objWhere = {
            uuid: option.userId,
            type: option.source,
            status: true,
            deletedAt: null
        }

        let promise = await Promise.all(
            [
                AccountService.findOneAdminAccount({
                    where: objWhere
                }),
                OauthAccessTokenService.countAuthAccessToken({
                    where: option
                })
            ]
        )

        let objAccount = _.get(promise, ['0'], null)
        let count = _.get(promise, ['1'], 0)

        return (count > 0 && objAccount)
    }

    async removeAccessTokenFromDatabase(option) {
        return await OauthAccessTokenService.countAuthAccessToken({
            where: option
        })
    }
}

module.exports = Jwt