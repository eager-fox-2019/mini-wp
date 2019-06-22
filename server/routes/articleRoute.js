const route = require ('express').Router()
const articleC = require('../controller/articleController')

route.get('/allArticle',articleC.findAll)

route.get('/userArticle',articleC.findUsers)
route.get('/article',articleC.findOne)
route.post('/article',articleC.create)
route.patch('/article',articleC.update)
route.delete('/article/:id',articleC.delete)

module.exports = route