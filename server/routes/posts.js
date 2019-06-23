const route = require('express').Router()
const PostController = require('../controllers/postController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')


// AUTHENTICATION
route.use(Authentication)

// CREATE
route.post('/', PostController.create)

// READ
route.get('/', PostController.findAll)
route.get('/findMine', PostController.findMine)
route.get('/:id', Authorization, PostController.findOne)

// UPDATE
route.patch('/:id', PostController.update)

// DELETE
route.delete('/:id', Authorization, PostController.delete)

module.exports = route