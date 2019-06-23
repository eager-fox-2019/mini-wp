const route = require('express').Router();
const userController = require('../controllers').user;

route.post('/register', userController.register);
route.post('/login', userController.login);
route.post('/tokensignin', userController.oauth);

module.exports = route;