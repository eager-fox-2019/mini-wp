const express = require("express")
const router = express.Router()
const userController = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/register", userController.register)
router.post("/signin", userController.signin)
router.post("/googlesignin", userController.googlesignin)

module.exports = router