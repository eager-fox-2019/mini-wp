const article = require('./article.route')
const user = require('./user.route')
const router = require('express').Router() 

router.use('/user', user)
router.use('/article', article)

module.exports = router