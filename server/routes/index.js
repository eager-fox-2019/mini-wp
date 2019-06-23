const Route = require('express').Router()
const userControllers = require('../controllers/userController')
const articleRoutes = require('../routes/articleRoutes')
const googleApi = require('../controllers/googleController')
const isLogin = require('../middlewares/authenticate')

Route.get('/', (req, res)=>{
    res.send('welcome to my server')
})
Route.post('/register', userControllers.register)
Route.post('/login', userControllers.login)
Route.get('/users', userControllers.getUsers)
Route.post('/googleSignIn', googleApi.loginFromGoogle)

Route.use('/articles', isLogin, articleRoutes)

module.exports = Route
