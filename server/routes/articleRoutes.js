const Route = require('express').Router()
const ArticleController = require('../controllers/articleController')
const isAuthor = require('../middlewares/authorize')
const gcsMiddlewares = require('../middlewares/uploadImage')
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

Route.get('/', ArticleController.gets)
Route.get('/tags/:q', ArticleController.searchTag)
Route.post('/', ArticleController.create)
Route.put('/:id', isAuthor, ArticleController.update)
Route.delete('/:id', isAuthor, ArticleController.delete)
Route.post('/upload', multer.single('image'), gcsMiddlewares.uploadSingle, ArticleController.uploadImage)

module.exports = Route