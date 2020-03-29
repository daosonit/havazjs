'use strict'
const path = require('path')
const _ = require('lodash')
let Item = require(path.resolve('./kernel/Transformer/Resource/Item.js'))
let Collection = require(path.resolve('./kernel/Transformer/Resource/Collection.js'))
let Paginate = require(path.resolve('./kernel/Transformer/Resource/Paginate.js'))
const Transformer = require(path.resolve('./kernel/Transformer/Transformer.js'))

class BuilderTransformer {

  constructor(resource) {
    this.resource = resource
  }

  async handle() {
    let { transformer, model } = this.resource
    let result = this.resource.emptyData()

    if (this.resource instanceof Item) {
      result = await this.transform(transformer, model)
    }

    if (this.resource instanceof Collection) {
      for (let item of model) {
        result.push(await this.transform(transformer, item))
      }
    }

    if (this.resource instanceof Paginate) {
      let dataModel = _.get(model, 'rows', [])
      let data = []
      for (let item of dataModel) {
        data.push(await this.transform(transformer, item))
      }
      result = {
        pageSize: parseInt(model.pageSize),
        pages: (parseInt(model.page)),
        total: parseInt(model.count),
        docs: data
      }
    }

    return result
  }

  // Private
  async transform(transformer, model) {
    let data = new Object()
    if (transformer instanceof Transformer) {
      data = await transformer.transform(model)
    }

    return data
  }
}

class MixinTransformer {

  async item(model, transformer) {
    let resourceType = await new Item(model, transformer)
    let result = await new BuilderTransformer(resourceType)

    return result.handle()
  }

  async collection(model, transformer) {
    let resourceType = await new Collection(model, transformer)
    let result = await new BuilderTransformer(resourceType)

    return result.handle()
  }

  async paginate(model, transformer) {
    let resourceType = await new Paginate(model, transformer)
    let result = await new BuilderTransformer(resourceType)

    return result.handle()
  }
}

module.exports = new MixinTransformer()
