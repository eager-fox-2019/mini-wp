const router = require(`express`).Router();
const user = require(`./user`);
const upload = require(`./uploadtocloud`);
const article = require(`./article`);
const tag = require(`./tag`);

router.use(`/`, upload);

router.use(`/users`, user);
router.use(`/articles`, article);
module.exports = router;
