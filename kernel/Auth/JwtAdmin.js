const path = require('path')
const _ = require('lodash')
const AppConfig = require(path.resolve('./configs/app.js'))
const Jwt = require(path.resolve('./kernel/Auth/Jwt.js'))
const db = require(path.resolve('./models/Rental/index.js'));
let secretKey = AppConfig.JWT_SECRET

class JwtAdmin extends Jwt {

    async genAccessToken(payload = new Object()) {

        let accessToken = await this.signToken(payload)
        let refreshToken = null
        await this.saveAccessToken(payload, accessToken, refreshToken)

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async verifyAccessToken(token) {
        try {
            let payloadDecode = await this.jwtDecode(token)
            let userId = _.get(payloadDecode, 'payload.uuid', null)
            if (!userId) return false
            let option = {
                userId: userId,
                accessToken: token,
                source: db.OauthAccessToken.SOURCE_ADMIN
            }
            let verifyAccessToken = await this.verifyToken(token, secretKey, this.optionAccessToken)
            let checkAccessToken = await this.checkAccessTokenFromDatabase(option)

            return (checkAccessToken) ? verifyAccessToken : false
        } catch (error) {
            console.error(error)
            await this.removeAccessTokenFromDatabase(option)
            return false
        }
    }
}

module.exports = JwtAdmin