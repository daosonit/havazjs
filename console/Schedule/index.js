const path = require('path')
const fs = require('fs');
const basename = path.basename(__filename);


fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    let filePath = path.join(__dirname, file);
    let objSchedule = require(filePath)

    if (typeof objSchedule === 'object' && objSchedule.actived) objSchedule.handle()
});