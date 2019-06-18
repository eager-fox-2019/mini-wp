const router = require('express').Router()
const ControllerArticles = require('../controllers/controlArticles')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authorization

// /articles
router.use(isAuthenticated)
router.get('/', ControllerArticles.findAll)
router.get('/:id', ControllerArticles.findOne)
router.post('/', ControllerArticles.create)

router.patch('/:userId/:id', isAuthorized, ControllerArticles.update)
router.delete('/:userId/:id', isAuthorized, ControllerArticles.delete)

router.get('/read/:userId/:id', isAuthorized, ControllerArticles.read)

module.exports = router