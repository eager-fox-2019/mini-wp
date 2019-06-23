const route = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const userRouter = require('./user')
const articleRouter = require('./article')
const gcsUploadRouter = require('./gcsUpload')
const conversationRouter = require('./conversation')

route.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connect'
    })
})
route.get('/authenticate', authenticate, (req, res) => {
    res.status(200).json({}) 
})

route.use('/', userRouter)
route.use('/', articleRouter)
route.use('/', gcsUploadRouter)
route.use('/',conversationRouter)

route.use('/*', (req, res) => res.status(404).json({
    error: 'Not Found :('
}))

module.exports = route