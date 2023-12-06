const Vendors = require('../models/vendors')


const adminsearch = async (req, res) => {
    try{
        
        let search = req.body.search
        let location = req.body.location

        if(location != ''){ 
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 })

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }else{
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' }, location: location }).sort({ createdAt: -1 })

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



const adminsearchTwo = async (req, res) => {
    try{
        
        let search = req.body.search
        let location = req.body.location
        let count = req.body.count

        if(location != ''){ 
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).limit(count)

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }else{
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' }, location: location }).sort({ createdAt: -1 }).limit(count)

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




const adminsearchThree = async (req, res) => {
    try{
        
        let search = req.body.search
        let location = req.body.location
        let start = req.body.start

        if(location != ''){ 
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).skip(start)

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }else{
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' }, location: location }).sort({ createdAt: -1 }).skip(start)

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




const adminsearchfour = async (req, res) => {
    try{
        
        let search = req.body.search
        let location = req.body.location
        let count = req.body.count
        let start = req.body.start

        if(location != ''){ 
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).limit(count).skip(start)

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }else{
            let vendor = await Vendors.find({ [title]: { $regex: search, $options: 'i' }, location: location }).sort({ createdAt: -1 }).limit(count).skip(start)

            if(vendor !== null){
                res.json({ message: vendor })
            }else{
                res.json({ message: 'no vendor found' })
            }
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





module.exports = {
    adminsearch,
    adminsearchTwo,
    adminsearchThree,
    adminsearchfour
}