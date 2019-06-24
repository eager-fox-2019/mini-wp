const router = require('express').Router()
const postController = require('../controller/postController')
const authorization = require('../middleware/authorization')

router.get('/', postController.findAll)
router.get('/:id', postController.findOne)
router.delete('/:id', authorization, postController.delete)

module.exports = router