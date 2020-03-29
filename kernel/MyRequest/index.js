const path = require('path')
const request = require('request')
const AppEvents = require(path.resolve('./events/index.js'))
const AppConfig = require(path.resolve('./configs/app.js'))
const ENDPOINT_OF_FCM = ''

class MyRequest {
    async firebaseCloudMessaging(notification = new Object(), registrationIds = new Array(), data = new Object()) {
        try {
            if (!(notification && notification.title && notification.body)) {
                return {
                    status: 422,
                    message: "Định dạng Notification không đúng.",
                    example: {
                        "title": "required",
                        "body": "required",
                        "icon": "",
                        "sound": "default"
                    }
                }
            }

            if (!(registrationIds && registrationIds.length > 0)) return {
                status: 422,
                message: "Định dạng DeviceToken không đúng."
            }
            let headers = {
                "Content-Type": "application/json",
                "Authorization": "key=" + AppConfig.TOKEN_KEY_FCM
            }
            let params = {
                content_available: true,
                priority: "high",
                data: data,
                registration_ids: registrationIds,
                notification: notification
            }
            let option = {
                url: ENDPOINT_OF_FCM,
                method: 'POST',
                headers: headers,
                body: JSON.stringify(params)
            }

            return new Promise((resolve, reject) => {
                return request(option, (err, res, body) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(body))
                    }
                })
            })
        } catch (error) {
            throw error
        }

    }

    async slackWebhooks(data = '') {
        try {
            let _options = {
                url: `https://hooks.slack.com/services/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`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "text": data
                },
                json: true,
            }
            return new Promise((resolve, reject) => {
                return request(_options, (err, res, body) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(body)
                    }
                })
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = MyRequest