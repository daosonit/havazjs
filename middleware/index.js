const path = require('path')
const fs = require('fs');
const basename = path.basename(__filename);
let moduleExports = new Object()

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    let nameService = file.replace('.js', '')
    let filePath = path.join(__dirname, file);
    moduleExports[nameService] = require(filePath);
});

module.exports = moduleExports;
