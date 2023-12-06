const router = require('express').Router()
const creditController = require('../controllers/creditController')

router.post('/buy', creditController.buy)
router.post('/history', creditController.history)


module.exports = router