const router = require('express').Router();
const articleRouter = require('./article')
const authRouter = require('./auth')
const article = require('../controllers/article')
const {authorize} = require('../middlewares/auth')

router.use('/auth',authRouter)
router.get('/article-home',article.GetHomeArticles)

// router.use()
router.use('/article',authorize,articleRouter)

module.exports = router