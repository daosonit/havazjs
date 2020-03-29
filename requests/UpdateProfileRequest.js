const path = require('path');
const _ = require('lodash');
const vld = require('express-validator');
const CustomerRule = require(path.resolve('./requests/Rule/CustomerRule.js'))
const VldExtention = require(path.resolve('./requests/Rule/VldExtention.js'))

module.exports = {
    rules: [
        vld.check('phone')
            .custom(VldExtention.vldPhone).withMessage('Số điện thoại không đúng định dạng')
            .custom((val, { req }) => {
                let uuid = req.Auth.uuid
                return CustomerRule.existsCustomerPhone(val, uuid)
            }),

        vld.check('email')
            .custom(VldExtention.vldEmail).withMessage('Email không đúng định dạng')
            .custom((val, { req }) => {
                let uuid = req.Auth.uuid
                return CustomerRule.existsCustomerEmail(val, uuid)
            }),

        vld.check('CMND')
            .custom(VldExtention.vldIdentityCard).withMessage('CMND không đúng định dạng')
            .custom((val, { req }) => {
                let uuid = req.Auth.uuid
                return CustomerRule.existsCustomerCMND(val, uuid)
            })
    ]
}
