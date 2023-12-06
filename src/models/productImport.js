const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productImportSchema = new Schema({
    vendorId: {
        type: String,
        required: true
    },
    productid: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        required: true
    },
}, { timestamps: true })


const ProductImport = mongoose.model('ProductImport', productImportSchema);

module.exports = ProductImport