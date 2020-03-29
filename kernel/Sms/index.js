const path = require('path')
const request = require('request');
const AppConfig = require(path.resolve('./configs/app.js'))
const ENDPOIT_SEND_SMS_OF_CMC = 'YOUR_URL'
const CMC_USER = 'YOUR_USER'
const CMC_PASS = 'YOUR_PASSWORD'

class Sms {
    constructor() {
    }

    // abstract
    async send(inputs) {}
}

class CmcSms extends Sms{

    constructor() {
    }

    async send(inputs) {
        let phone = inputs.phone
        let content = inputs.content

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
}

class Sms {
    constructor() {
    }

    // abstract
    async send(inputs) {}
}

module.exports = Sms
