const path = require('path')
const moment = require('moment')
require('moment-lunar')
const momentTz = require('moment-timezone')
const _ = require('lodash')
const uuidv5 = require('uuid/v5');
let oldUuid = null

module.exports = {
  currentDateUtc: () => moment().utc(),

  currentDateVn: () => momentTz().tz('Asia/Ho_Chi_Minh'),
  startOfDayNowVn: () => momentTz().tz('Asia/Ho_Chi_Minh').startOf('day'),

  formatDateTime: (str, result = 'DD/MM/YYYY', origin = 'YYYY-MM-DD HH:mm:ss Z') => {
    return (str) ? moment(str, origin).format(result) : ''
  },

  uniqid(prefix) {
    const now = () => {
      let time = Date.now()
      let last = now.last || time
      return now.last = time > last ? time : last + 1
    }

    return (prefix || '') + now().toString(36)
  },

  randomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  },

  clone(val) {
    return _.clone(val)
  },

  uniqItemInArray(array) {
    return [...new Set(array)].filter(Boolean)
  },

  removeVn(str) {
    if (typeof str != 'string') return null
    str = str.replace(/(á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ)/g, 'a')
    str = str.replace(/(A|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ)/g, 'A')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/Đ/g, 'D')
    str = str.replace(/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/g, 'e')
    str = str.replace(/(É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ)/g, 'E')
    str = str.replace(/(í|ì|ỉ|ĩ|ị)/g, 'i')
    str = str.replace(/(Í|Ì|Ỉ|Ĩ|Ị)/g, 'I')
    str = str.replace(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/g, 'o')
    str = str.replace(/(Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ)/g, 'O')
    str = str.replace(/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/g, 'u')
    str = str.replace(/(Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự)/g, 'U')
    str = str.replace(/(ý|ỳ|ỷ|ỹ|ỵ)/g, 'y')
    str = str.replace(/(Ý|Ỳ|Ỷ|Ỹ|Ỵ)/g, 'Y')

    return str
  },

  algoRoundRobin(array = [], k) {
    for (let j = 0; j < k; j++)  array.unshift(array.pop())
    return array
  },

  genOpt() {
    let date = momentTz().tz('Asia/Ho_Chi_Minh').format('DDMMYY')
    let data = [...date]
    let day = momentTz().tz('Asia/Ho_Chi_Minh').format('D')
    let result = this.algoRoundRobin(data, parseInt(day))
    return result.join('')
  },

  genUuid() {
    if (oldUuid) {
      let newUuid = uuidv5(oldUuid, uuidv5.DNS)
      oldUuid = newUuid
      return newUuid;
    } else {
      let key = momentTz().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss Z')
      let newUuid = uuidv5(key, uuidv5.DNS)
      oldUuid = newUuid
      return newUuid;
    }
  },

  escapeElastic(strQuery) {
    let strNews = this.removeVn(strQuery)
    strNews = strNews.replace(/[\/-]/g, ' ')
    strNews = strNews.replace(/  /g, '')

    return strNews.toLowerCase()
  },

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  },

  async genAddress(db, instance) {
    let address = ''
    if (instance.townId) {
      let objTown = await db.Town.findOne({
        where: {
          id: instance.townId
        }
      })
      address += objTown.name
    }

    if (instance.districtId) {
      let objDistrict = await db.District.findOne({
        where: {
          id: instance.districtId
        }
      })
      address += " - " + objDistrict.name
    }

    if (instance.provinceId) {
      let objProvince = await db.Province.findOne({
        where:
        {
          id: instance.provinceId
        }
      })
      address += " - " + objProvince.name
    }
    return _.trim(address, ' - ')
  }
}