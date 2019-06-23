const express = require('express')
const articleRouter = express.Router()
const ArticleController = require('../controllers/article')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const imageUpload = require('../middlewares/imageUpload')

articleRouter.use(authentication)
articleRouter.get('/',ArticleController.showList)
articleRouter.get('/:title',ArticleController.findByTitle)
articleRouter.get('/:articleid',ArticleController.findOneArticle)
articleRouter.post('/',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ArticleController.create)
articleRouter.use(authorization)
articleRouter.delete('/:articleid',ArticleController.delete)
articleRouter.put('/:articleid',ArticleController.update)


module.exports = articleRouter