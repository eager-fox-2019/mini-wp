const express = require("express")
const router = express.Router()
const articleController = require("../controllers/article-controller")
const authenticate = require("../middlewares/authenticate")

router.get("/all", articleController.findAll)
router.get("/myarticles", authenticate, articleController.findMyArticles)
router.post("/:username/add", authenticate, articleController.create)
router.put("/:username/edit", authenticate, articleController.edit)
router.delete("/:username/delete", authenticate, articleController.delete)

module.exports = router