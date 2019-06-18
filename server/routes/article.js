const route = require('express').Router();
const articleController = require('../controllers').article;

route.get('/articles', articleController.getArticles)
route.post('/articles', articleController.create);
route.patch('/articles/:articleId', articleController.update);
route.delete('/article/:articleId', articleController.delete);

module.exports = route;