const express = require('express')
const router = express.Router()

const ControllerArticle = require('../controllers/controller-article')
const { authentication, authorization } = require('../middlewares/author-authen')

router.get('/', ControllerArticle.readAllwFilter)
router.use(authentication)
router.post('/', ControllerArticle.create)
router.use('/:id', authorization)
router.get('/:id', ControllerArticle.readOne)
router.put('/:id', ControllerArticle.update)
router.delete('/:id', ControllerArticle.delete)

module.exports = router