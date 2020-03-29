const path = require('path')
const db = require(path.resolve('./models/Rental/index.js'));

class Transformer {

  constructor() {
    this.db = db
  }

  transform() {
    return new Object()
  }

  refSupplier(model) {
    return {
      uuid: model.uuid,
      code: model.code,
      name: model.name,
      phone: model.phone,
      phoneOther: model.phoneOther,
      email: model.email,
      companyName: model.companyName,
      companyPhone: model.companyPhone,
      companyEmail: model.companyEmail,
      taxCode: model.taxCode,
      type: model.type,
      address: model.address,
      vilage: model.vilage,
      note: model.note,
      level: model.level,
    }
  }
}

module.exports = Transformer
