const router = require('express').Router();
const article = require('../controllers/article')
const {authorizeOnArticle} = require(`../middlewares/auth`)
const {sendUploadToGCS,fromBase64toFile} = require('../helpers/image-utility')

router.get('/',   article.Get)
router.get('/:id', article.GetOne)
router.post('/', fromBase64toFile, sendUploadToGCS, article.Post)
router.patch('/:id', authorizeOnArticle, fromBase64toFile, sendUploadToGCS, article.Patch)
router.delete('/:id', authorizeOnArticle, article.Delete)


module.exports = router