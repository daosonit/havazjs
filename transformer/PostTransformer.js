const path = require('path')
const Transformer = require(path.resolve('./kernel/Transformer/Transformer.js'))
const MixinTransformer = require(path.resolve('./kernel/Transformer/MixinTransformer.js'))

class PostTransformer extends Transformer {

    async transform(model) {
        return {
            id: model.id,
            content: model.content,
            like: model.like,
            comment: model.comment,
            image: model.image,
            images: model.images,
            createdBy: model.createdBy,
            createdAt: model.createdAt,
            refMember: (model.refMember) ? this.refMember(model.refMember) : null
        };
    }

    async refMember(model) {
        return {
            id: model.id,
            image: model.image,
            name: model.name
        }
    }
}

module.exports = PostTransformer