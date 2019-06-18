const route = require('express').Router();
const articleRoute = require('./article');

route.use('/api', articleRoute);

module.exports = route;