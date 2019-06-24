const articleController = require('../controllers/articleController')
const router = require('express').Router()
const {
    Authenticate,
    Authorize
} = require('../middleware/auth')

router.post('/', Authenticate, articleController.create)
router.get('/', articleController.getAll)
router.get('/search', articleController.search)
router.get('/user', Authenticate, articleController.getUserArticle)
router.get('/tags', articleController.getAllTags)
router.get('/:title', articleController.getOne)
router.put('/:id', Authenticate, Authorize, articleController.update)
router.delete('/:id', Authenticate, Authorize, articleController.deleteOne)

module.exports = router