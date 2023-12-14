const router = require('express').Router()
const creditController = require('../controllers/creditController')
const auth = require("../middlewares/auth");

router.post('/buy', auth, creditController.buy)
router.post('/history', creditController.history)


module.exports = router