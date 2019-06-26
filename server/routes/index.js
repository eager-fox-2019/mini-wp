const router = require('express').Router()
const user = require('./user')
const article = require('./article')
// const tag = require('./tag')

router.use('/',user)
router.use('/articles',article)
// router.use('/tags',tag)

module.exports = router