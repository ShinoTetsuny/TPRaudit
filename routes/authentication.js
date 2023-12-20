const express = require("express")
const router = express.Router()
const loginController = require('../controllers/loginController')
const registerController = require('../controllers/registerController')

router.post('/register', registerController.register)
router.post('/login', loginController.login)

module.exports = router