const express = require('express');
const routes = express.Router();
const TagController = require('../controllers/TagController')

routes.get('/', TagController.list)
routes.get('/name', TagController.findByName)

module.exports = routes