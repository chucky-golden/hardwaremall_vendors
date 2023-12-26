const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendorsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    cloudinaryid: {
        type: String,
        required: true
    },
    callLeads: {
        type: Number,
        required: true
    },
    phoneLeads: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Vendors = mongoose.model('Vendors', vendorsSchema);

module.exports = Vendors