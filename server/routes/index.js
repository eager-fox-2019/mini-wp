const express = require("express")
const router = express.Router()
const userRouter = require("./user-router")
const articleRouter = require("./article-router")
const images = require('../helpers/images')





router.use("/users", userRouter)
router.use("/articles", articleRouter)
router.post('/googleCloudStorage', 
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req,res,next)=>{
        let imageLink = req.file.cloudStoragePublicUrl
        res.status(200).json(imageLink)
    }
)

module.exports = router