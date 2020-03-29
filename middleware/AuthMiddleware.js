'use strict'
const path = require('path')
const JwtAdmin = require(path.resolve('./kernel/Auth/JwtAdmin.js'))
const Middleware = require(path.resolve('./middleware/Middleware.js'))

class AdminAuthMiddleware extends Middleware {
	async handle(req, res, next) {
		try {
			const accessToken = req.header('Authorization')
			if (accessToken) {
				let objJwt = new JwtAdmin()
				let result = await objJwt.verifyAccessToken(accessToken)
				if (result) {
					req.Auth = result
					req.Auth.accessToken = accessToken
					return next()
				} else {
					throw new Error('Not authorized to access this resource')
				}
			} else {
				throw new Error('Not authorized to access this resource')
			}
		} catch (err) {
			console.error(err)
			return res.status(401).json({ error: err, message: 'Tài khoản của bạn chưa được xác thực.' })
		}
	}
}

module.exports = new AdminAuthMiddleware()
