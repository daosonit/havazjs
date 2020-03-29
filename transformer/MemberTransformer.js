const path = require('path')
const Transformer = require(path.resolve('./kernel/Transformer/Transformer.js'))
const MixinTransformer = require(path.resolve('./kernel/Transformer/MixinTransformer.js'))

class MemberTransformer extends Transformer {
    async transform(model) {
        return {
            id: model.id,
            account: model.account,
            firstName: model.firstName,
            lastName: model.lastName,
            image: model.image,
            phone: model.phone,
            email: model.email,
            birthday: model.birthday,
            gender: model.gender,
            identityCard: model.identityCard,
            note: model.note,
            provinceId: model.provinceId,
            districtId: model.districtId,
            townId: model.townId,
            address: model.address,
            vilage: model.vilage,
            status: model.status,
            createdAt: model.createdAt
        }
    }
}

module.exports = MemberTransformer