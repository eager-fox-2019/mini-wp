const routes = require("express").Router()
const ArticleController = require("../controllers/article.js")
const { Authorization } = require("../middlewares/auth.js")
const image = require('../helpers/imageUpload')
const TagDetection = require('../helpers/tagDetection')

routes.post("/", image.multer.single('image'), image.sendUploadToGCS, TagDetection, ArticleController.create)
routes.get("/", ArticleController.read)
routes.patch("/:id", Authorization, image.multer.single('image'), image.sendUploadToGCS, TagDetection, ArticleController.edit)
routes.delete("/:id", Authorization, ArticleController.delete)

module.exports = routes