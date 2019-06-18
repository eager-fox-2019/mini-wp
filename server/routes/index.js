const router = require(`express`).Router();

const user = require(`./user`);
// const tag = require(`./tag`);
// const article = require(`./article`);

router.use(`/users`, user)
// router.use(`/tags`, tag)
// router.use(`/articles`, article)

module.exports = router;
