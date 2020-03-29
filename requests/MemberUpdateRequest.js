const path = require('path');
const _ = require('lodash');
const vld = require('express-validator');
const VldExtention = require(path.resolve('./requests/Rule/VldExtention.js'))

module.exports = {
	rules: [
		vld.check('content')
		.not().isEmpty().withMessage('Nội dung tin đăng là thông tin bắt buộc'),
	]
}