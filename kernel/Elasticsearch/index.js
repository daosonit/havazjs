const path = require('path');
const {
    Client
} = require('@elastic/elasticsearch')

const Connection = require(path.resolve('./configs/connections.js'))
let ConfigELK = Connection.MINIO

class Elasticsearch {
    constructor() {
        this.client = new Client({
            node: ConfigELK.ELASTIC_NODE,
            auth: {
                username: ConfigELK.ELASTIC_USER_NAME,
                password: ConfigELK.ELASTIC_PASSWORD
            }
        })
    }

    async ping() {
        this.client.ping({}, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('All is well');
            }
        });
    }

    async create(params) {
        return await this.client.indices.create(params, {
            ignore: [400]
        })
    }

    async refresh(params) {
        return await this.client.indices.refresh(params)
    }

    async bulk(params) {
        return await this.client.bulk(params)
    }

    async index(params) {
        return await this.client.index(params)
    }

    async search(params) {
        return await this.client.search(params)
    }

    async msearch(params) {
        return await this.client.msearch(params)
    }

    async exists(params) {
        return await this.client.exists(params)
    }

    async get(params) {
        return await this.client.get(params)
    }
}

module.exports = new Elasticsearch();