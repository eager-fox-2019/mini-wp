const router = require('express').Router()
const postRouter = require('./postRouter')
const userController = require('../controller/userController')
const authentication = require('../middleware/authentication')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.use(authentication)
router.use('/posts',postRouter)









module.exports = router