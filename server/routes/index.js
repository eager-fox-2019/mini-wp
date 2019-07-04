const router = require('express').Router()
const Articles = require('./article')
const Users = require('./user')

router.use('/user', Users)
router.use('/article', Articles)

module.exports = router