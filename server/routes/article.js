const router= require('express').Router()
const articleController= require('../controllers/article')
const authenticate= require('../middlewares/authentication')
const authorize= require('../middlewares/authorization')
const image = require('../helpers/image')

router.use(authenticate)
router.get('/:status/:id', articleController.getStatus)
router.get('/', articleController.getAll)
router.get('/:id', authorize, articleController.getOne)
router.post('/:status', image.multer.single('thumbnail'), image.sendUploadToGCS, articleController.create, )
router.put('/:id', authorize, articleController.updatePut)
router.patch('/:id', authorize, articleController.updatePatch)
router.delete('/:id', authorize, articleController.delete)

module.exports= router