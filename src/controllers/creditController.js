const Credit = require('../models/adcredits')
const Vendors = require('../models/vendors')
const { userBalance } = require('../middlewares/details')


// buy adcredit route
const buy = async (req, res) => {
    try{
        
        let details = await userBalance(req.body.vendorId);
        let balance = Number(details.balance)
        let amount = Number(req.body.price)

        balance += amount

        let info = {
            vendorId: req.body.vendorId,
            price: req.body.price,
        }

        const user = await Vendors.updateOne({ _id: req.body.vendorId }, 
            {
                $set:{
                    balance: balance
                }
            }
        )

        if(user !== null){ 
            const product = await new Credit(info).save()
            if(product !== null){
                res.json({ message: 'payment successful' })
            }else{
                res.json({ message: 'error creating payment history' })
            }
        }else{
            res.json({ message: 'error handling request' })
        }
        
    
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// get history history
const history = async (req, res) => {
    try{
        let uid = req.body.vendor_id


        let credit = await Credit.find().sort({ vendorId: uid, createdAt: -1 })
        if (credit !== null) {
            res.json({ message: credit })
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
    buy,
    history,
}