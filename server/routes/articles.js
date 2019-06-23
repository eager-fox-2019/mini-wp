const router = require('express').Router()
const ControllerArticles = require('../controllers/controlArticles')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authArticle
// /api/articles
router.use(isAuthenticated)
router.get('/', ControllerArticles.findAll)
router.get('/:id', ControllerArticles.findOne)
router.get('/read/:id', ControllerArticles.read)

const gcsMiddlewares = require('../middleware/google-cloud-middleware.js')
const Multer = require('multer');

const multer = Multer({
	storage: Multer.MemoryStorage,
		limits: {
		  fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
		},
	});

router.post('/uploadImage', multer.single('image'), gcsMiddlewares.sendUploadToGCS,
    ControllerArticles.uploadImage)

router.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS, ControllerArticles.create)
router.patch('/:id', multer.single('image'), gcsMiddlewares.sendUploadToGCS, isAuthorized, ControllerArticles.update)
router.delete('/:id', isAuthorized, ControllerArticles.delete)

module.exports = router