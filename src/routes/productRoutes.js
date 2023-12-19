const router = require('express').Router()
const productController = require('../controllers/productController')
const auth = require("../middlewares/auth");

router.post('/import', auth, productController.importProduct)
router.post('/editimport', auth, productController.editImportProduct)
router.post('/deleteImport', auth, productController.deleteProduct)


router.get('/dashboard/:id', productController.dashboard)
router.get('/fetchproducts/:id', productController.fetchProducts)

module.exports = router