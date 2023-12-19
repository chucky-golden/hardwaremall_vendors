const Vendors = require('../models/vendors')


const giveData = async (req, res) => {
    try{
        
        let vendorid = req.body.vendorid

        let vendor = await Vendors.findOne({ _id: vendorid })

        if(vendor !== null){
            res.json({ message: vendor })
        }else{
            res.json({ message: 'no vendor found' })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


const editData = async (req, res) => {
    try{
        
        let vendorid = req.body.vendorid
        let action = req.body.action

        
        if(action == 'disable'){
            const user = await Vendors.updateOne({ _id: vendorid }, 
                {
                    $set:{
                        block: '0'
                    }
                }
            )

            if(user !== null){ 
                res.json({ message: 'vendor account blocked' })
            }else{
                res.json({ message: 'error handling request' })
            }
        }else{
            const user = await Vendors.updateOne({ _id: vendorid }, 
                {
                    $set:{
                        block: '1'
                    }
                }
            )

            if(user !== null){ 
                res.json({ message: 'vendor account unblocked' })
            }else{
                res.json({ message: 'error handling request' })
            }
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




module.exports = {
    giveData,
    editData,
}