const express = require('express')
const router = express.Router()
const article = require('../controllers/article')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require('../middlewares/images')

router.use(authentication)
router.get('/', article.findAll)
router.get('/users', article.findAllUser)
router.get('/:id', article.findOne)
router.get('/search/:input', article.search)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, article.create)
router.patch('/:id', authorization, images.multer.single('image'), images.sendUploadToGCS, article.patch)
router.delete('/:id',authorization, article.delete)

module.exports = router