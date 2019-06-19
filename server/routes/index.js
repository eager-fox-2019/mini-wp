const express = require("express")
const router = express.Router()
const userRouter = require("./user-router")
const articleRouter = require("./article-router")

router.use("/users", userRouter)
router.use("/articles", articleRouter)

module.exports = router