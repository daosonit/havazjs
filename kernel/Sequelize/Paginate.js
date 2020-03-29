'use strict'

class SequelizePaginate {

    paginate(model) {

        const pagination = async ({ page = 0, pageSize = 15, ...params } = {}) => {
            const options = Object.assign({}, params)
            options.limit = pageSize
            options.offset = pageSize * (page)
            const {count, rows} = await model.findAndCountAll(options)

            return { rows, page, count , pageSize }
        }

        const instanceOrModel = model

        instanceOrModel.paginate = pagination
    }
}

module.exports = new SequelizePaginate()
