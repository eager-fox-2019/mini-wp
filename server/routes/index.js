const Router = require('express').Router()
const userRoute = require('./user')
const articleRoute = require('./article')

Router.get('/', (req, res) => {res.status(200).json({message: 'Home'})})

Router.use('/users', userRoute)
Router.use('/articles', articleRoute)

module.exports = Router