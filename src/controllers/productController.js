const ProductImport = require('../models/productImport')
const Vendors = require('../models/vendors')
const { idExist } = require('../middlewares/details')
const axios = require('axios')


// import products into store
const importProduct = async (req, res) => {
    try{
        let uid = req.body.vendorId
        let countperimport = Number(req.body.countperimport)

        countperimport += 1

        if(req.session.vendors._id == uid){ 
            var details = await idExist(req.body.vendorId, req.body.productid);
            
            if(details === false){             

                let info = {
                    vendorId: req.body.vendorId,
                    productid: req.body.productid,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    specification: req.body.specification,
                }

                
                let response = await axios.post('https://gateway-6ew9.onrender.com:3000/admin/updateData/data', {
                    productid: req.body.vendorId,
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
        }else{
            res.json({ message: "unauthorised user" });  
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// edit product imported into store
const editImportProduct = async (req, res) => {
    try{
        let vendorid = req.body.vendor_id
        let productid = req.body.product_id

        if(req.session.vendors._id == vendorid){ 

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

        }else{
            res.json({ message: "unauthorised user" });  
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

        let finance = await Vendors.find({ _id: uid }, { projection: { _id: 0, balance: 1, callLeads: 1, phoneLeads: 1 } })
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

        let productids = await ProductImport.find({ vendorId: uid }, { projection: { _id: 0, productid: 1 } })
        if (productids !== null) {

            let response = await axios.get('https://gateway-6ew9.onrender.com:3000/admin/vendors/getvendorproducts', {
                products: productids
            })

            if(response.data.foundProducts !== null) {
                response.json({ data: response.data.foundProducts })
            }else{
                response.json({ data: response.data.foundProducts })
            }

        }
        else {
            res.json({ message: 'error handling request' })
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
    editImportProduct
}
