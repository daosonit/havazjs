const crypto = require('crypto')

module.exports = {
    hash(secretKey, password) {
        return crypto.pbkdf2Sync(password, secretKey, 98, 512, 'sha512').toString('base64')
    },

    compare(objUser, password) {
        let hashPassword = this.hash(objUser.salt, password)
        return hashPassword === objUser.dataValues.password
    },

    compareAgency(objAgency, password) {
        let hashPassword = this.hash(objAgency.salt, password)
        return hashPassword === objAgency.password
    },

    compareDriver(objDriver, password) {
        let hashPassword = this.hash(objDriver.salt, password)
        return hashPassword === objDriver.dataValues.password
    },

    compareCustomer(objCustomer, password) {
        let hashPassword = this.hash(objCustomer.salt, password)
        return hashPassword === objCustomer.dataValues.password
    },

    compareAdmin(objAdmin, password) {
        let hashPassword = this.hash(objAdmin.salt, password)
        return hashPassword === objAdmin.dataValues.password
    },

    hashSecretKey() {
        return crypto.randomBytes(16).toString('base64');
    }
}