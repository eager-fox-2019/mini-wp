const express = require('express')
const router = express.Router()
const { multer, sendUploadToGCS } = require('../helpers/images')
const ControllerArticle = require('../controllers/controller-article')
const { authentication, authorization } = require('../middlewares/author-authen')

router.get('/', ControllerArticle.readAllwFilter)
router.get('/:id', ControllerArticle.readOne)
router.use(authentication)
router.post('/', multer.single('featured_image'), sendUploadToGCS, ControllerArticle.create)
router.use('/:id', authorization)
router.patch('/:id', ControllerArticle.update)
router.delete('/:id', ControllerArticle.delete)

module.exports = router