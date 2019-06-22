const express = require('express')
const router = express.Router()
const users = require('./users')
const post = require('./posts')
const { isUser, isAuthorize } = require('../middlewares/auth')

router.use('/users', users)
router.use('/posts', isUser, post)

module.exports = router