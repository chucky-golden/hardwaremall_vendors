const Vendors = require('../models/vendors')
const ProductImport = require('../models/productImport')

async function onlyMailExist (email){
    let vendors = await Vendors.findOne({ email: email  })
    if(vendors === null){
        return false
    }else{
        return true
    }
}


async function idExist (vendorId, productid){
    let product = await ProductImport.findOne({ vendorId: vendorId, productid: productid  })
    if(product === null){
        return false
    }else{
        return true
    }
}


async function userBalance (vendorId){
    let product = await Vendors.findOne({ _id: vendorId }, { _id: 0, email: 0, password: 0, title: 0, contact: 0, location: 0, website: 0, description: 0, whatsapp: 0, photo: 0 })
    if(product !== null){
        return product
    }else{
        return false
    }
}


module.exports = {
    onlyMailExist,
    idExist,
    userBalance,
};