const router = require('express').Router()
const articleRoutes = require('./articles')
const userRoutes = require('./users')

router.use('/users', userRoutes)
router.use('/articles', articleRoutes)

module.exports = router