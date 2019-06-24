const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoute')
const articleRoutes = require('./articleRoute')

router.use('/user', userRoutes)
router.use('/article', articleRoutes)

module.exports = router