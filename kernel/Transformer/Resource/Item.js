'use strict'
const path = require('path')

class Item {

  constructor (model, transformer) {
    this.model = model
    this.transformer = transformer
  }

  emptyData () {
    return new Object()
  }
}

module.exports = Item
