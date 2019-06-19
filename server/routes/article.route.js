const router = require('express').Router()
const articleController = require('../controllers/article.controller')

router.get('/', articleController.list)
router.get('/:id', articleController.detail)
router.post('/', articleController.create)
router.delete('/:id', articleController.delete)
router.patch('/:id', articleController.update)

module.exports = router