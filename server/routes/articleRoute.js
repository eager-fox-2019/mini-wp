const router = require('express').Router()
const articleController = require('../controllers/articleController')
const {authentication} = require('../middlewares/auth')

router.get('/', articleController.findAll)
router.get('/read/:articleId', articleController.readOne)
router.use(authentication)
router.get('/mypost', articleController.findPersonal)
router.get('/edit/:articleId', articleController.findOne)
router.post('/create', articleController.create)
router.patch('/:articleId', articleController.update)
router.delete('/:articleId', articleController.delete)

module.exports = router