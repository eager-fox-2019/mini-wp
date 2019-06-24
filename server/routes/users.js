const router = require("express").Router()
const Controller = require("../controllers/usercontroller.js")
const authentication = require("../middleware/authentication.js")

router.post("/register", Controller.create)
router.post("/login", Controller.login)
router.put("/", authentication, Controller.update)
router.delete("/", authentication, Controller.delete)

module.exports = router;