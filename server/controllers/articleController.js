const Article = require('../models/articleModel')

class ArticleController {
    static create(req, res, next) {
        let { title, content, author, featured_image, tags } = req.body
        // console.log(req.body," ini req.body")
        Article.create({
            title, content, author, featured_image, tags
        })
            .then((newArticle) => {
                return Article.findOne({
                    _id: newArticle._id
                })
                    .populate('author')
                    .then((article) => {
                        res.status(201).json(article)
                    })
            })
            .catch(next)
    }

    static gets(req, res, next) {
        Article.find({})
            .populate('author')
            .then((articles) => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.id
        let dataUpdate = req.body
        Article.findByIdAndUpdate(id, dataUpdate, { new: true })
            .then((updated) => {
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.id
        Article.findByIdAndDelete(id)
            .then((deleted) => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }

    static uploadImage(req, res, next) {
        if (req.file && req.file.cloudStoragePublicUrl) {
            return res.send(req.file.cloudStoragePublicUrl);
        }
        return res.status(500).send('Unable to upload');
    }

    static searchTag(req, res, next) {
        let q = req.params.q
        // console.log(q)
        Article.find({
            tags: { $in: [q] }
        })
        .populate('author')
        .then((found) => {
            // console.log(found, "ini found")
            res.json(found)
        })
        .catch(next)
    }

}

module.exports = ArticleController

