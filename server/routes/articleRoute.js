const router = require('express').Router()
const articleController = require('../controllers/articleController')
const {authentication} = require('../middlewares/auth')
const gcsMiddlewares = require('../middlewares/gcs')

const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

router.get('/', articleController.findAll)
router.get('/read/:articleId', articleController.readOne)
router.use(authentication)
router.get('/mypost', articleController.findPersonal)
router.get('/edit/:articleId', articleController.findOne)
router.post('/upload',
    multer.single('image'),
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            return res.send(req.file.gcsUrl);
        }
        return res.status(500).send('Unable to upload');
    },
);
router.post('/create', articleController.create)
router.patch('/:articleId', articleController.update)
router.delete('/:articleId', articleController.delete)


module.exports = router