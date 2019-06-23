const route = require('express').Router();
const articleRoute = require('./article');
const userRoute = require('./user');

route.use('/api', articleRoute);
route.use('/user', userRoute);

module.exports = route;