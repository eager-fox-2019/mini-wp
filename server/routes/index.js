const express = require('express')
const router = express.Router()

const routerUser = require('./user')
const routerArticle = require('./article')

router.use('/users', routerUser)
router.use('/articles', routerArticle)

module.exports = router