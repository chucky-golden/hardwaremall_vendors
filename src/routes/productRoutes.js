const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/import', productController.importProduct)
router.post('/editimport', productController.editImportProduct)


router.get('/dashboard/:id', productController.dashboard)
router.get('/dashboard/products/:id', productController.fetchProducts)

module.exports = router