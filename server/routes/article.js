const router = require('express').Router()
const Articles = require('../controllers/article')
const { auth, authorization } = require('../middlewares/access')
const { serverStorage, googleStorage } = require('../middlewares/storageUpload')

router.use(auth)

router.get('/', Articles.listAll)
router.post('/', serverStorage.single('imageUpload'), googleStorage, Articles.create)
router.put('/:id', authorization, serverStorage.single('imageUpload'), googleStorage, Articles.updateArticle)
router.delete('/:id', authorization, Articles.delete)

module.exports = router;