const express = require("express")
const router = express.Router()
const purchaseController = require('../controllers/purchaseController')
const middleware = require('../middleware/authentication')

router.get('/', purchaseController.allPurchase)
router.get('/purchase/:id', purchaseController.myPurchase)
router.post('/purchase', purchaseController.purchase)
router.get('/:id', purchaseController.get)
router.post('/', purchaseController.create)
router.patch('/:id', purchaseController.update)
router.delete('/:id', purchaseController.delete)

module.exports = router