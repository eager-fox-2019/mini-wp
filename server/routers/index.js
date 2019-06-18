const router = require('express').Router()
const articleRoutes = require('./article')
const userRoutes = require('./user')

router.use('/user',userRoutes)
router.use('/article',articleRoutes)

module.exports = router