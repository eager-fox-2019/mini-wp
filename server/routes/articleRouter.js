const router = require('express').Router()
const ArticleController = require('../controllers/articleController')

router.post('/', ArticleController.addArticle)
router.get('/', ArticleController.listArticles)
router.delete('/:id', ArticleController.deleteArticle)

router.patch('/:id', ArticleController.editArticle)

module.exports = router