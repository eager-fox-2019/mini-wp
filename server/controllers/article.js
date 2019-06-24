const { wrapAsync, givesError } = require('../helpers')
const { Article } = require('../models')
const { deleteFromBucket } = require('../helpers/image-utility')
const logz = k => { console.log(`~~~~~logz~~~~~~~`); console.log(k); console.log(`~~~~~~~~~~~~~~~~~~~`) }


const functions = {
    GetHomeArticles: wrapAsync(async function (req, res) {
        let search = {}
        let articles = await Article.find(search)
        if (articles.length > 0) res.json(articles);        
    }),
    Get: wrapAsync(async function (req, res) {
        let articles = await Article.find({ author: req.user._id })
        if (articles.length > 0) res.json(articles);        
    }),
    GetOne: wrapAsync(async function (req, res) {
        console.log(req.params)        
        res.json(req.article)
        
    }),
    Post: wrapAsync(async function (req, res) {
        let { author, title, content, tags } = req.body

        let image = null;
        if (req.file && req.file.cloudStoragePublicUrl) { image = req.file.cloudStoragePublicUrl }

        let newArticle = await new Article({ author, title, content, featured_image: image, tags }).save()
        if (newArticle) res.status(201).json(newArticle)
        else throw givesError(404, `article cannot be created, check your parameter`)
    }),
    Patch: wrapAsync(async function (req, res) {

        let values = { ...req.body }
        if (req.file && req.file.cloudStoragePublicUrl) { values.featured_image = req.file.cloudStoragePublicUrl }        

        let updateData = await Article.findByIdAndUpdate(req.params.id, values)
        if (updateData) res.status(200).json({ updateData, msg: `data with id ${req.params.id} updated ` })
        else throw givesError(404, `data with id of ${req.params.id}`)
    }),
    Delete: wrapAsync(async function (req, res) {

        let tobeDeleted = req.article
        let image = tobeDeleted.featured_image
        let fileName = image.substring(image.lastIndexOf('/'))        
        
        let delStatus = await Article.deleteOne({ _id: req.params.id })
        if (delStatus.deletedCount == 1) {
            // await
            deleteFromBucket(fileName);
            res.status(200).json({ deletedData: delStatus, msg: ` data ${req.params.id} is deleted` })
        }
        else if (delStatus.deletedCount == 0)
            throw givesError(404, `cannot delete, check the id`)
        else throw givesError(500, `internal server error while deleting`)
    })
}


module.exports = functions



