const router = require('express').Router()
const articleRouter = require('../routes/articleRouter')

router.use('/article', articleRouter)

module.exports = router