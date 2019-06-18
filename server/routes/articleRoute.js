const router = require('express').Router()
const articleController = require('../controllers/articleController')
const {authentication} = require('../middlewares/auth')

router.get('/', articleController.findAll)
router.use(authentication)
router.get('/my-post', articleController.findPersonal)
router.post('/create', articleController.create)
router.patch('/:articleId', articleController.update)
router.delete('/:articleId', articleController.delete)

module.exports = router