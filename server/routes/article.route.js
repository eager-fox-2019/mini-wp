const router = require('express').Router()
const articleController = require('../controllers/article.controller')
const multerMemoryStorage = require('../middlewares/multer.memory.storage')
const gcsUpload = require('../middlewares/google.cloud.bucket.middleware')
const authMiddleware = require('../middlewares/authentication.middleware')

router.get('/', articleController.list)
router.get('/:id', articleController.detail)
router.post('/', authMiddleware, multerMemoryStorage('image'), gcsUpload, articleController.create)
router.delete('/:id', authMiddleware, articleController.delete)
router.patch('/:id', authMiddleware, articleController.update)

module.exports = router