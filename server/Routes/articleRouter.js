const express = require('express')
const router = express.Router()
const articleController = require('../Controllers/articleController')
// const gcsMiddlewares = require('../Middleware/googleSloudStorage')
const {Authorization} = require('../Middleware/auth')
const image = require('../Helpers/googleStorage')

router.post('/create', image.multer.single('image') , image.sendUploadToGCS, articleController.create)
// router.post('/create', articleController.create)
router.get('/showAll', articleController.show)
router.get('/findOne/:artId', articleController.findOne)
router.get('/findOneArticle/:artId', articleController.findOneArticle)
router.get('/findByAuthor', articleController.findAuthor)

router.patch('/edit/:userId/:artId', Authorization, articleController.update)
router.delete('/delete/:userId/:artId', Authorization, articleController.deleteArticle)

module.exports = router