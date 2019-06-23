const express = require('express');
const routes = express.Router();
const TagController = require('../controllers/TagController')

routes.get('/', TagController.findByName)

module.exports = routes