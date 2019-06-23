const router = require('express').Router()
const Articles = require('../controllers/article')
const { auth, authorization } = require('../middlewares/access')

router.use(auth)

router.get('/', Articles.listAll)
router.post('/', Articles.create)
router.put('/:id', authorization, Articles.updateArticle)
router.delete('/:id', authorization, Articles.delete)

module.exports = router;