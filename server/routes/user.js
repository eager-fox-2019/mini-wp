const Router = require('express').Router()
const UserController = require('../controllers/user')
const {authenticate} = require('../middlewares/auth')

Router.post('/register',UserController.register)
Router.post('/login',UserController.login)
Router.post('/loginGoogle', UserController.loginGoogle)

Router.use(authenticate)

Router.get('/',UserController.getAll)
Router.get('/:id',UserController.getOne)
Router.patch('/:id',UserController.update)
Router.delete('/:id',UserController.delete)

module.exports = Router