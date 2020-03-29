const path = require('path')
const request = require('request');
const AppConfig = require(path.resolve('./configs/app.js'))
const ENDPOIT_SEND_SMS_OF_CMC = 'http://124.158.6.45/ApiRF/api/sms/Send'
const CMC_USER = 'Havaz'
const CMC_PASS = 'Haivan@2019@0530'

class CmcSms {

    constructor() {
        this.brandName = 'HAVAZ'
        this.user = 'Havaz'
        this.pass = 'Haivan@2019@0530'
    }

    async send(inputs) {
        let phone = inputs.phone
        let content = inputs.content

        let validate = await this.validateSms(inputs)

        let options = {
            url: ENDPOIT_SEND_SMS_OF_CMC,
            method: 'POST',
            json: true,
            body: {
                Brandname: ENDPOIT_SEND_SMS_OF_CMC,
                user: CMC_USER,
                pass: CMC_PASS,
                Message: content,
                Phonenumber: phone
            }
        }

        return new Promise((resolve, reject) => {
            return request(options, (err, res, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(body)
                }
            })
        });
    }

    validateSms (input) {

    }
}

class Sms {
    constructor() {
        return new CmcSms()
    }
}

module.exports = Sms
