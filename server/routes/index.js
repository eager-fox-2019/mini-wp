const express = require('express');
const route = express.Router();
const articleRoutes = require('./articleRoutes')
const userRoutes = require('./userRoutes')
route.use('/article', articleRoutes)
route.use('/user',userRoutes)


module.exports = route