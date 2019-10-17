const express = require('express');
const routes = express.Router();
const articles = require('./articles')
const users = require('./users')
const tags = require('./tags')
const Authentication = require('../middlewares/authenticate')

routes.use('/users', users)
routes.use('/articles', Authentication, articles)
routes.use('/tags', Authentication, tags)

routes.get('*', (req, res) => {
    res.send('404 page not found')
})

module.exports = routes