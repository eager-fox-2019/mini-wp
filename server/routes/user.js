const route = require('express').Router()
const { ControllerUser } = require('../controllers')

route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/login/google', ControllerUser.loginGoogle)


module.exports = route