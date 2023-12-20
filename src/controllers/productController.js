const ProductImport = require('../models/productImport')
const Vendors = require('../models/vendors')
const { idExist } = require('../middlewares/details')
const axios = require('axios')


// import products into store
const importProduct = async (req, res) => {
    try{
        if(req.body.vendor_email != req.vendor.email){
            return res.json({ message: 'invalid or expired token' })
        }
        

        let countperimport = 0
        if(req.body.countperimport === null || req.body.countperimport === undefined){ 
            countperimport += 1
            countperimport = countperimport.toString()
        }else{
            countperimport = Number(req.body.countperimport)
            countperimport += 1
            countperimport = countperimport.toString()
        }
        

        var details = await idExist(req.body.vendorId, req.body.productid);
        
        if(details === false){
            let slug = Math.floor(Math.random() * Date.now()).toString(16);        

            let info = {
                vendorId: req.body.vendorId,
                productid: req.body.productid,
                price: req.body.price,
                quantity: req.body.quantity,
                specification: req.body.specification,
                slug: slug
            }

            
            let response = await axios.post('https://admin-dqcw.onrender.com/updateData/data', {
                productid: req.body.productid,
                countperimport: countperimport
            })
            if(response.data.message === 'import count updated'){
                
                const product = await new ProductImport(info).save()
                if(product !== null){
                    res.json({ message: 'product imported' })
                }else{
                    res.json({ message: 'error importing product' })
                }
                
            }
            else {
                res.json({ message: 'error processing request' })
            }


            
        }else{
            res.json({ message: "product already imported" });
        }
        

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// get imported product using slug
const getProductSlug = async (req, res) => {
    try{
        let slug = req.params.slug

        let product = await ProductImport.find({ slug: slug })

        if (product !== null) {
            res.json({ message: product })
        }
        else {
            res.json({ message: 'No product with slug found' });
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}

// edit product imported into store
const editImportProduct = async (req, res) => {
    try{
        if(req.body.vendor_email != req.vendor.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        let vendorid = req.body.vendor_id
        let productid = req.body.product_id


        const user = await ProductImport.updateOne({ vendorId: vendorid, productid: productid }, 
            {
                $set:{
                    price: req.body.price,
                    quantity: req.body.quantity,
                    specification: req.body.specification,
                }
            }
        )

        if(user !== null){
            res.json({ message: 'product updated' })
        }else{
            res.json({ message: 'error updating product' })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





// get leads and adcredit balance
const dashboard = async (req, res) => {
    try{
        
        let uid = req.params.id

        let finance = await Vendors.find({ _id: uid }, {  _id: 0, balance: 1, callLeads: 1, phoneLeads: 1 } )
        if (finance !== null) {
            res.json({ message: finance })
        }
        else {
            res.json({ message: 'error handling request' })
        }
        

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





// get products imported by vendor
const fetchProducts = async (req, res) => {
    try{
        
        let uid = req.params.id

        let productids = await ProductImport.find({ vendorId: uid }, {  _id: 0, productid: 1 } )

        if (productids !== null && productids.length > 0) {

            let response = await axios.post('https://admin-dqcw.onrender.com/vendors/getvendorproducts', {
                products: productids
            })

            if(response.data.foundProducts !== null) {
                res.json({ data: response.data.foundProducts })
            }else{
                res.json({ data: response.data.foundProducts })
            }

        }
        else {
            res.json({ message: 'No products found for the given vendor ID' });
        }
       

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// delete imported product
const deleteProduct = async (req, res) => {
    try{
        if(req.body.vendor_email != req.vendor.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const vendorid = req.body.vendor_id
        const productid = req.body.product_id

        const result = await ProductImport.deleteOne({ vendorId: vendorid, productid: productid })

        if(result !== null){
            res.json({ message: 'imported product deleted' })
        }else{
            res.json({ message: 'error deleting imported product' })
        }  

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}






module.exports = {
    importProduct,
    dashboard,
    fetchProducts,
    editImportProduct,
    deleteProduct,
    getProductSlug
}
