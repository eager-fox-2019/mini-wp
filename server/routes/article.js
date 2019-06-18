const router = require('express').Router()
const Articles = require('../controllers/article')

router.get('/', Articles.listAll)
router.post('/', Articles.create)
router.get('/search', Articles.searchTitle)
router.put('/:id', Articles.updateArticle)
router.delete('/:id', Articles.delete)

module.exports = router;