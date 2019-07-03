const router = require('express').Router()
const articleController = require('../controllers/article.controller')
const multerMemoryStorage = require('../middlewares/multer.memory.storage')
const gcsUpload = require('../middlewares/google.cloud.bucket.middleware')
const authMiddleware = require('../middlewares/authentication.middleware')
const authorizationMiddleware = require('../middlewares/article.autorization.middleware')

router.get('/', authMiddleware({ allowUnauthorized: true}), articleController.list)
router.get('/:id', authMiddleware({allowUnauthorized: true}), articleController.detail)
router.post('/', authMiddleware(), multerMemoryStorage('image'), gcsUpload, articleController.create)
router.delete('/:id', authMiddleware(), authorizationMiddleware, articleController.delete)
router.patch('/:id', authMiddleware(), authorizationMiddleware, multerMemoryStorage('image'), gcsUpload, articleController.update)

module.exports = router