const routes = require("express").Router()
const {Authentication} = require("../middlewares/auth.js")
const User = require("./user.js")
const Article = require("./article.js")


routes.use("/", User)
routes.use(Authentication)
routes.use("/home", Article)

module.exports = routes