const express = require('express')
const router = express.Router()

const routerUser = require('./user')
const routerArticle = require('./article')

router.use('/user', routerUser)
router.use('/article', routerArticle)

module.exports = router