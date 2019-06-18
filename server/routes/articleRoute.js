const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const authenticate = require('../middlewares/middleware')

router.get('/', ArticleController.findAll)
router.use('/', authenticate)
router.get('/:id', ArticleController.findByUser)
router.delete('/:id', ArticleController.delete)
router.post('/add', ArticleController.add)
router.put('/:id', ArticleController.update)

module.exports = router