const express = require('express')
const router = express.Router()

//require to child router
const userRouter = require('./userRouter')
const articleRouter = require('./articleRouter')

//authentication
const {Authentication} = require('../Middleware/auth')

//router use
router.use('/user', userRouter)

// router.use(Authenticate)

router.use('/article', Authentication ,articleRouter)
// router.use('/article' ,articleRouter)

module.exports = router