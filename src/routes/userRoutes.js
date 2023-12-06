const router = require('express').Router()
const userController = require('../controllers/userController')


router.get('/vendors', userController.vendors)
router.get('/topvendors', userController.topvendors)



router.post('/vendorslug', userController.findVendorWithSlug)


router.post('/calllead', userController.callLead)
router.post('/messagelead', userController.messageLead)


router.post('/productsid', userController.productsImported)


module.exports = router