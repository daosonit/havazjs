const path = require('path');
const _ = require('lodash');
const vld = require('express-validator');

const VldExtention = require(path.resolve('./requests/Rule/VldExtention.js'))

module.exports = {
    rules: [
        vld.check('account')
            .not().isEmpty().withMessage('Tài khoản là thông tin bắt buộc'),

        vld.check('password')
            .not().isEmpty().withMessage('Ngày sinh là thông tin bắt buộc')
    ]
}
