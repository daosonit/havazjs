const path = require('path')
// const dbMongo = require(path.resolve('./models/Mongo/index.js'))

class ActivityLog {

    async log(instance, action = 'CREATE') {
        let tableName = instance._modelOptions.tableName
        let prevValues = instance.previous()
        let newValues = instance.get()
        let changed = instance._changed

        let params = {
            action: action,
            supplierId: instance.supplierId,
            action: action,
            primaryKey: (instance.uuid) ? instance.uuid : instance.id,
            tableName: tableName,
            actionBy: instance.updatedBy,
            detail: JSON.stringify(changed),
            prevValue: (!(action === 'CREATE')) ? JSON.stringify(prevValues) : null,
            newValue: JSON.stringify(newValues)
        }

        // Lưu vào mongodb
        // if (instance.updatedBy) dbMongo.ActivityLogs.create(params)
    }
}

module.exports = new ActivityLog()