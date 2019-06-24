const Router = require('express').Router()
const ArticleController = require('../controllers/article')
const {authenticate, authorize} = require('../middlewares/auth')
const {multer, sendUploadToGCS}= require('../helpers/imageUpload')

Router.get('/',ArticleController.findAll)
Router.get('/tags',ArticleController.findTags)
Router.get('/:id',ArticleController.findOne)
Router.get('/users/:id',ArticleController.findAll)

Router.use(authenticate)

Router.post('/', multer.single('featuredImg'), sendUploadToGCS, ArticleController.create)
Router.patch('/:id', authorize, multer.single('featuredImg'), sendUploadToGCS, ArticleController.patch)
Router.delete('/:id', authorize, ArticleController.delete)

module.exports = Router