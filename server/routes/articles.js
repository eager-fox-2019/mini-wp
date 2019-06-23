const router = require('express').Router()
const ControllerArticle = require('../controllers/articles')
const _multer = require('multer')
const authentication = require('../middlewares/authentication')
const gcsMiddleware = require('../middlewares/storage')
const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.post('/', authentication, multer.single('image'), gcsMiddleware.sendUploadToGCS, ControllerArticle.create) // C
router.get('/', ControllerArticle.readAll) // R
router.patch('/:id', authentication, multer.single('image'), gcsMiddleware.sendUploadToGCS, ControllerArticle.update) // U
router.delete('/:id', ControllerArticle.delete) // D
router.get('/find/:id', ControllerArticle.findArticle)
router.get('/user/:id', authentication, ControllerArticle.getByUser)

module.exports = router