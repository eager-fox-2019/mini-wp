const router = require(`express`).Router();
const controller = require("../controllers/article");
const { authentication, authorization } = require("../middlewares/auth");

// on routes /articles
router.use(authentication);

router.patch(`/:id`, authorization, controller.update);
router.delete(`/:id`, authorization, controller.delete);
router.get(`/:id`, controller.detail);

router.get(`/`, controller.all);
router.get(`/all/user`, controller.user);

router.post(`/`, controller.create);
router.patch(`/likes/:id`, controller.updatelikes);

module.exports = router;
