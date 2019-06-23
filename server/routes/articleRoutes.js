const route = require('express').Router()
const articleController = require('../controller/article')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const uploadImages = require('../helpers/uploadImages')

// route.use(authentication)
route.get('/',articleController.findAll)
route.get('/:id', articleController.findByPk)
route.post('/', uploadImages.multer.single('image'),uploadImages.sendUploadToGCS,articleController.create)
route.delete('/:id',authorization,articleController.delete)
route.put('/:id',authorization, articleController.update) 
// route.patch('/description/:id',todoController.updateDescription)
    
module.exports = route


