const routes = require("express").Router()
const UserController = require("../controllers/user.js")
const { GoogleAuth } = require('../middlewares/auth.js')

routes.post("/register", UserController.register)
routes.post("/login", UserController.login)
routes.post("/google", GoogleAuth, UserController.googleSignin)


module.exports = routes