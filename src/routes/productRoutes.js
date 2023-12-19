const router = require('express').Router()
const productController = require('../controllers/productController')
const auth = require("../middlewares/auth");

router.post('/import', auth, productController.importProduct)
router.post('/editimport', auth, productController.editImportProduct)


router.get('/dashboard/:id', productController.dashboard)
router.get('/fetch/:id', productController.fetchProducts)

module.exports = router