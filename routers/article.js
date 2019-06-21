const router = require('express').Router()
const article = require('../controllers/article')
const auth = require('../middlewares/authenticate')
const autho = require('../middlewares/authorize')
const gcsMiddlewares = require("../middlewares/google-cloud-storage")
const Multer = require('multer');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.use(auth)
router.get("/list", article.list);
router.get("/filter/:field/:value", article.filter);
router.get("/:id", article.detail);
router.post("/create", multer.single('img'), gcsMiddlewares.sendUploadToGCS, article.create);
router.patch("/update/:id", autho, multer.single('img'), gcsMiddlewares.sendUploadToGCS, article.update);
router.delete("/delete/:id", autho, article.delete)

module.exports = router
