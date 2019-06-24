const router = require('express').Router()
const articleController = require('../controllers/articleController')
const {authentication} = require('../middlewares/auth')
const gcsMiddlewares = require('../middlewares/gcs')

const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 1 * 1024 * 1024, // Maximum file size is 1MB
    },
});

router.get('/', articleController.findAll)
router.get('/read/:articleId', articleController.readOne)
router.use(authentication)
router.get('/mypost', articleController.findPersonal)
router.get('/edit/:articleId', articleController.findOne)
router.post('/create', multer.single('imgUrl'), gcsMiddlewares.sendUploadToGCS, articleController.create)
router.patch('/:articleId',multer.single('newImgUrl'), gcsMiddlewares.sendUploadToGCS, articleController.update)
router.delete('/:articleId', articleController.delete)


module.exports = router