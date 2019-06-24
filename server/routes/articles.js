const router = require('express').Router();
const Controller = require('../controllers/articlecontroller');
const Authenticate = require('../middleware/authenticate');
const Authorize = require('../middleware/authorize').article;

const upload = require('../middleware/upload');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 4800000
  }
});

router.post("/", Authenticate, multer.single('file'), upload, Controller.create)
router.get("/", Authenticate, Controller.readAll)
router.get("/user", Authenticate, Controller.readMine)
router.delete("/:id", Authenticate, Authorize, Controller.delete)
router.patch("/:id", Authenticate, Authorize, Controller.update)

module.exports = router;