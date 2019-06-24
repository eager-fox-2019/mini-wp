const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/create', userController.register)
router.post('/login', userController.login)
// router.post('/logout', userController.logout)
router.post('/google', userController.googleLogin)
router.get('/get', userController.findAll)

module.exports = router