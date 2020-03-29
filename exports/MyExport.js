const path = require('path')
const _ = require('lodash')
const moment = require('moment')
const Excel = require('excel4node');
const MinioClient = require(path.resolve('./kernel/MinIO/index.js'))

class ReportCustomizeExport {

    constructor() {
        const _rowHeader = 1
        let _workbook = new Excel.Workbook()
        this.rowHeader = _rowHeader
        this.fileName = 'File_report_customize_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.xlsx'
        this.forderName = 'test'
        this.workbook = _workbook
        this.worksheet = _workbook.addWorksheet('SHEET_NAME');
        this.worksheet.row(_rowHeader).freeze();
    }

    async handle(model) {
        await this.buildWorksheet(model)
        let buffer = await this.workbook.writeToBuffer()
        return await this.minIOPushObject(buffer)
    }

    async buildBufferExcel(_result) {
        await this.buildWorksheet(this.worksheet, _result, this.rowHeader)
        return await this.workbook.writeToBuffer()
    }

    async buildWorksheet(data) {
        let _itemFirst = _.get(data, [0], {})
        let _keyData = Object.keys(_itemFirst)

        _keyData.forEach((item, index) => {
            this.worksheet.cell(this.rowHeader, (index+1)).string(item)
        })

        data.map(objItem => {
            this.rowHeader++
            _keyData.forEach((item, index) => {
                let str = (objItem[item]) ? objItem[item].toString() : ''
                this.worksheet.cell(this.rowHeader, (index+1)).string(str)
            })
        })

        return _keyData
    }

    async minIOPushObject(buffer) {
        await MinioClient.putObject(this.forderName, this.fileName, buffer);
        return await MinioClient.presignedGetObject(this.forderName, this.fileName, 24 * 60 * 60)
    }
}

module.exports = new ReportCustomizeExport()