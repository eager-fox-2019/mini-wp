const router = require(`express`).Router();
const controller = require("../controllers/article");
const { authentication, authorization } = require("../middlewares/auth");

// on routes /articles
router.use(authentication);

router.get(`/`, controller.all);
router.get(`/:id`, controller.detail);
router.get(`/user`, controller.user);

router.post(`/`, controller.create);
router.patch(`/likes/:id`, controller.updatelikes);

router.patch(`/:id`, authorization, controller.update);
router.delete(`/:id`, authorization, controller.delete);

module.exports = router;

