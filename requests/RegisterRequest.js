const path = require('path');
const _ = require('lodash');
const vld = require('express-validator');

const VldExtention = require(path.resolve('./requests/Rule/VldExtention.js'))

module.exports = {
    rules: [
        vld.check('firstName')
        .not().isEmpty().withMessage('Tên là thông tin bắt buộc'),

        vld.check('lastName')
        .not().isEmpty().withMessage('Họ là thông tin bắt buộc'),

        vld.check('gender')
        .not().isEmpty().withMessage('Giới tính là thông tin bắt buộc'),

        vld.check('phone')
        .exists().withMessage('Số điện thoại là thông tin bắt buộc'),

        vld.check('email')
        .exists().withMessage('Email là thông tin bắt buộc'),

        vld.check('identityCard')
        .exists().withMessage('CMND là thông tin bắt buộc'),

        vld.check('birthday')
        .exists().withMessage('Ngày sinh là thông tin bắt buộc'),

        vld.check('provinceId')
        .exists().withMessage('Tỉnh thành là thông tin bắt buộc'),

        vld.check('districtId')
        .exists().withMessage('Quận huyện là thông tin bắt buộc'),

        vld.check('townId')
        .exists().withMessage('Phường xã là thông tin bắt buộc'),

        vld.check('vilage')
        .exists().withMessage('Thôn xóm là thông tin bắt buộc')
    ]
}
