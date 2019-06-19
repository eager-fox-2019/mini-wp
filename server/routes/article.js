const routes = require("express").Router()
const ArticleController = require("../controllers/article.js")

routes.post("/", ArticleController.create)
routes.get("/", ArticleController.read)

module.exports = routes