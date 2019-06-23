const router = require('express').Router()
const articleController = require('../controllers/article.controller')
const multerMemoryStorage = require('../middlewares/multer.memory.storage')
const gcsUpload = require('../middlewares/google.cloud.bucket.middleware')

router.get('/', articleController.list)
router.get('/:id', articleController.detail)
router.post('/', multerMemoryStorage('image'), gcsUpload, articleController.create)
router.delete('/:id', articleController.delete)
router.patch('/:id', articleController.update)

module.exports = router