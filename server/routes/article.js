const route = require('express').Router()
const { ControllerArticle } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const { authorize } = require('../middlewares/auth')


route.post('/articles', authenticate, ControllerArticle.create)
route.get('/articles', authenticate , ControllerArticle.findAll)
route.get('/articles/:id', authenticate, ControllerArticle.findOne)
route.get('/articles/tag/:tag', authenticate, ControllerArticle.findOneByTag)
route.put('/articles/:id', authenticate, authorize, ControllerArticle.update)
route.delete('/articles/:id', authenticate, authorize, ControllerArticle.delete)


module.exports = route