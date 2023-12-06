const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditImportSchema = new Schema({
    vendorId: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Credit = mongoose.model('Credit', creditImportSchema);

module.exports = Credit