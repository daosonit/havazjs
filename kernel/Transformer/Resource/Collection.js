'use strict'
const path = require('path')

class Collection {

  constructor (model, transformer) {
    this.model = model
    this.transformer = transformer
  }

  emptyData () {
    return new Array()
  }
}

module.exports = Collection
