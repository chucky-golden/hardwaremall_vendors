const Vendors = require('../models/vendors')
const ProductImport = require('../models/productImport')
const axios = require('axios')


// get vendor and return to admin
const getProducts = async (req, res) => {
    try{
        let products = req.body.products
        const vendors = await Vendors.find()
        const importedProducts = await ProductImport.find()

        let productDetails = []

        products.forEach(data => {
            for(let x = 0; x < importedProducts.length; x++){
                if(data._id === importedProducts[x].productid){
                    let details = []

                    for(let i = 0; i < vendors.length; i++){
                        if(vendors[i]._id === importedProducts[x].vendorId){
                            details.push(vendors[i])
                        }
                    }

                    let sendData = {
                        product: data,
                        vendors: details
                    }
                    productDetails.push(sendData)
                }
            }
        });
        
        res.json({ foundproducts: productDetails })


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// get vendor for top products and return to admin
const getTopProducts = async (req, res) => {
    try{
        let products = req.body.products
        const vendors = await Vendors.find()
        const importedProducts = await ProductImport.find()

        let productDetails = []

        products.forEach(data => {
            for(let x = 0; x < importedProducts.length; x++){
                if(data._id === importedProducts[x].productid){
                    let details = []

                    for(let i = 0; i < vendors.length; i++){
                        if(vendors[i]._id === importedProducts[x].vendorId){
                            details.push(vendors[i])
                        }
                    }

                    let sendData = {
                        product: data,
                        vendors: details
                    }
                    productDetails.push(sendData)
                }
            }
        });
        
        res.json({ foundproducts: productDetails })


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}

// send vendor account
const vendors = async (req, res) => {
    try{
        const vendors = await Vendors.find().sort({ createdAt: -1 })
        const imports = await ProductImport.find()

        let sentVendors = []

        if(vendors !== null){
            
            vendors.forEach(vendor => {
                let vImport = []
                for(let x = 0; x < imports.length; x++){
                    if(vendor._id == imports[x].vendorId){
                        vImport.push(imports[x])
                    }
                }

                let searched = {
                    vendor: vendor,
                    importCount: vImport.length
                }
                sentVendors.push(searched)
            })

            res.json({ foundvendors: sentVendors })
        }else{
            res.json({ foundvendors: sentVendors })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// send top 8 created vendor account
const topvendors = async (req, res) => {
    try{
        const vendors = await Vendors.find().sort({ callLeads: -1 }).limit(8)
        if(vendors !== null){
            res.json({ foundvendors: vendors })
        }else{
            res.json({ foundvendors: vendors })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// get all vendors that imported a specific product and send back to admin route
const productsImported = async (req, res) => {
    try{
        let id = req.body.id
        let vendorids = [];
        let vendorDetails = []

        const importedProducts = await ProductImport.find({ productid: id }, { vendorId: 1 })

        if(importedProducts !== null){

            importedProducts.forEach(imported => {
                vendorids.push(imported.vendorId)
            });

            const vendors = await Vendors.find()

            vendors.forEach(vendor => { 
                for(let x = 0; x < vendorids.length; x++){
                    if(vendor._id == vendorids[x]){
                        vendorDetails.push(vendor)
                    }
                }
            });

            res.json({ vendors: vendorDetails })

        }else{
            res.json({ vendors: importedProducts })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// use vendor slug to get all product imported by vendor and send back to user
const findVendorWithSlug = async (req, res) => {
    try{
        let slug = req.body.slug

        const vendor = await Vendors.findOne({ slug: slug })

        if(vendor !== null){
            const importedProductids = await ProductImport.find({ vendorId: vendor._id }, { productid: 1 })

            if(importedProductids !== null){

                let response = await axios.post('https://admin-dqcw.onrender.com/users/vendorproducts', {
                    data: importedProductids
                })

                if(response.data.foundproducts !== null){
                    data = {
                        vendor: vendor,
                        importedproducts: response.data.foundproducts
                    }

                    res.json({ data: data })

                }else{
                    data = {}

                    res.json({ data: data })
                }
            }else{
                data = {
                    vendor: vendor,
                    importedproducts: []
                }

                res.json({ data: data })
            }

        }else{
            data = {}
            res.json({ data: data })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// update call lead for vendor
const callLead = async (req, res) => {
    try{
        let slug = req.body.slug

        const vendors = await Vendors.find({ slug: slug })
        if(vendors !== null){
            leads = Number(vendors.callLeads)
            leads += 1

            const vendor = await Vendors.updateOne({ _id: vendors._id }, 
                {
                    $set:{
                        callLeads: leads,
                    }
                }
            )

            res.json({ message: 'lead updated' })
        }else{
            res.json({ message: '' })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// update message lead for vendor
const messageLead = async (req, res) => {
    try{
        let slug = req.body.slug

        const vendors = await Vendors.find({ slug: slug })
        if(vendors !== null){
            leads = Number(vendors.phoneLeads)
            leads += 1

            const vendor = await Vendors.updateOne({ _id: vendors._id }, 
                {
                    $set:{
                        phoneLeads: leads,
                    }
                }
            )

            res.json({ message: 'lead updated' })
        }else{
            res.json({ message: '' })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


module.exports = {
    vendors,
    topvendors,
    productsImported,
    findVendorWithSlug,
    callLead,
    messageLead,
    getProducts,
    getTopProducts
}