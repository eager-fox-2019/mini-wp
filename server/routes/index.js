const router = require('express').Router()
const Articles = require('./article')

router.use('/api/article', Articles)

module.exports = router