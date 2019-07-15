const route = require('express').Router()
const userController = require('../controller/user')


route.get('/:email', userController.findByemail)
route.post('/register',userController.register)
route.post('/login',userController.login)
route.post('/googlelogin',userController.googlelogin)
route.patch('/edit/:id',userController.edit)
module.exports = route