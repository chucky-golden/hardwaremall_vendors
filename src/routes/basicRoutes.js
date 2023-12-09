const router = require('express').Router()
const basicController = require('../controllers/basiccontroller')
const upload = require("../middlewares/upload");

router.post('', basicController.vendorslogin)
router.post('/register', upload.single("file"), basicController.vendorsregister)
router.post('/forgot', basicController.vendorsForgot)
router.post('/reset', basicController.vendorsReset)
router.get('/profile/:id', basicController.fetchVendor)


module.exports = router