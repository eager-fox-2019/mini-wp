const express = require('express');
const routes = express.Router();
const ArticleController = require('../controllers/ArticleController')
const Upload = require('../helpers/uploadToGCP')
const Authorize = require('../middlewares/authorize')

routes.get('/', ArticleController.find)
routes.get('/myarticle', ArticleController.findAllByOwner)
routes.get('/:id', ArticleController.findOne)
// routes.post('/', ArticleController.create)
routes.post('/', Upload.multer.single('featured_image'), Upload.sendUploadToGCS, ArticleController.create)
// routes.post('/', labels, ArticleController.generateLabel)
routes.put('/:id', Authorize, Upload.multer.single('featured_image'), Upload.sendUploadToGCS, ArticleController.update)
routes.patch('/:id', Authorize, Upload.multer.single('featured_image'), Upload.sendUploadToGCS, ArticleController.update)
routes.delete('/:id', Authorize, ArticleController.delete)

routes.get('*', (req, res) => {
    res.status(404).json('404 page not found')
})

module.exports = routes
