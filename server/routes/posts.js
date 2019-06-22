const route = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')


// AUTHENTICATION
route.use(Authentication)

// CREATE
route.post('/', ArticleController.create)

// READ
route.get('/', ArticleController.findAll)
route.get('/findMine', ArticleController.findMine)
route.get('/:id', Authorization, ArticleController.findOne)

// UPDATE
route.patch('/:id', ArticleController.update)

// DELETE
route.delete('/:id', Authorization, ArticleController.delete)

module.exports = route