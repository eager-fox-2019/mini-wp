const router = require("express").Router()
const Controller = require("../controllers/articlecontroller.js")
const authentication = require("../middleware/authentication.js")
const upload = require("../middleware/uploadToGCS.js")
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5000000
    }
});

router.get("/", authentication, Controller.readAll)
router.get("/:articleId", authentication, Controller.readOne)
router.post("/", authentication, multer.single('image'), upload, Controller.create)
router.delete("/:articleId", authentication, Controller.delete)
router.put("/:articleId", authentication, Controller.update)

module.exports = router;