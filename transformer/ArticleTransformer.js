const path = require('path')
const Transformer = require(path.resolve('./kernel/Transformer/Transformer.js'))
const MixinTransformer = require(path.resolve('./kernel/Transformer/MixinTransformer.js'))

class ArticleTransformer extends Transformer {

    async transform(model) {
        return {
            uuid: model.uuid,
            name: model.name,
            type: model.type,
            provinceId: model.provinceId,
            districtId: model.districtId,
            townId: model.townId,
            address: model.address,
            coordinates: model.coordinates,
            description: model.description,
            status: (model.status) ? true : false,
            createdAt: model.createdAt,
            refSupplier: this.bltSupplier(model.refSupplier)
        };
    }

    bltSupplier(model) {
        if (!model) return null
        let item = {
            uuid: model.uuid,
            code: model.code,
            name: model.name,
        }
        return item
    }
}

module.exports = ArticleTransformer