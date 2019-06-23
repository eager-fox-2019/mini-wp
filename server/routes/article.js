const router = require('express').Router()
const articleContoller = require('../controllers/article')
const { authenticate } = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorization')
const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')
const googleVision = require('../middlewares/google-vision')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

router.use(authenticate)
router.get('/',articleContoller.findAll)
router.get('/tags',articleContoller.findAllTag)
router.get('/user',articleContoller.findAllUser)
router.get('/:id',articleContoller.findOneArticle)
router.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS,googleVision,articleContoller.createArticle)
router.delete('/:id', authorization, articleContoller.deleteArticle)
router.put('/:id',authorization, multer.single('image'), gcsMiddlewares.sendUploadToGCS, articleContoller.updateArticle)

module.exports = router