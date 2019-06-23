const route = require('express').Router();
const articleController = require('../controllers').article;
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

const gcsMiddlewares = require('../middlewares/google-cloud-storage');

route.get('/articles', articleController.getArticles)
route.post('/articles', authentication, multer.single('img'), gcsMiddlewares.sendUploadToGCS ,articleController.create);
route.patch('/articles/:articleId', authentication, authorization, multer.single('img'), gcsMiddlewares.sendUploadToGCS, articleController.update);
route.delete('/articles/:articleId', authentication, authorization, articleController.delete);

module.exports = route;