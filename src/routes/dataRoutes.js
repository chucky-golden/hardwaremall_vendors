const router = require('express').Router()
const giveDataController = require('../controllers/giveDataController')

router.post('/data', giveDataController.giveData)
router.post('/editdata', giveDataController.editData)


module.exports = router