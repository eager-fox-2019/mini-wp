const Route = require('express').Router()
const userControllers = require('../controllers/userController')
const articleRoutes = require('../routes/articleRoutes')
const googleApi = require('../controllers/googleController')
const isLogin = require('../middlewares/authenticate')

Route.post('/register', userControllers.register)
Route.post('/login', userControllers.login)
Route.get('/users', userControllers.getUsers)
Route.use('/articles', isLogin, articleRoutes)
Route.post('/googleSignIn', googleApi.loginFromGoogle)

module.exports = Route
