const router = require('express').Router()
const ControllerArticles = require('../controllers/controlArticles')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authArticle

// /articles
router.use(isAuthenticated)
router.get('/', ControllerArticles.findAll)
router.get('/:id', ControllerArticles.findOne)
router.get('/read/:id', ControllerArticles.read)
router.post('/', ControllerArticles.create)

router.patch('/:id', isAuthorized, ControllerArticles.update)
router.delete('/:id', isAuthorized, ControllerArticles.delete)


module.exports = router