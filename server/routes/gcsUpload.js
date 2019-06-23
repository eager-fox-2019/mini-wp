const route = require('express').Router()
const images = require('../helpers/images')

route.post('/gcsUpload', 
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req,res,next) => {
        let imageLink = req.file.cloudStoragePublicUrl
        res.status(201).json(imageLink)
    }
)

module.exports = route