const router = require('express').Router()
const article = require('../controllers/article')
const auth = require('../middlewares/authenticate')
const autho = require('../middlewares/authorize')

router.use(auth)
router.get("/list", article.list);
router.get("/filter/:field/:value", article.filter);
router.get("/:id", article.detail);
router.post("/create",article.create);
router.patch("/update/:id", autho, article.update);
router.delete("/delete/:id", autho, article.delete)

module.exports = router
