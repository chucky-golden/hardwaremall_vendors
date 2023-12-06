const router = require('express').Router()
const searchController = require('../controllers/searchController')

router.post('/adminsearch', searchController.adminsearch)
router.post('/adminsearchTwo', searchController.adminsearchTwo)
router.post('/adminsearchThree', searchController.adminsearchThree)
router.post('/adminsearchfour', searchController.adminsearchfour)


module.exports = router