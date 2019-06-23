const route = require('express').Router()
const { ControllerConversation } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

route.post('/conversation', authenticate, ControllerConversation.create)
route.get('/conversation', authenticate, ControllerConversation.findAll)

module.exports = route