const article = require('./article.route')
const user = require('./user.route')
const router = require('express').Router() 
const authMiddleware = require('../middlewares/authentication.middleware')

router.use('/user', user)
router.use('/article', authMiddleware, article)

module.exports = router