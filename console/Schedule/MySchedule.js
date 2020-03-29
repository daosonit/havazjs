const path = require('path')
const _ = require('lodash')
const Schedule = require('node-schedule')

class MySchedule {
    constructor() {
        this.actived = false // true là active Schedule  này
        this.cronFormat = '* * * * * *' // Cài đặt timer
    }

    handle() {
        Schedule.scheduleJob(this.cronFormat, async () => {
            await this.execute()
        })
    }

    async execute() {
        // TODO
    }
}

module.exports = new MySchedule()