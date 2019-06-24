const Article = require("../models/articlemodel.js")
let objectId = require("mongodb").ObjectID;

class Controller {
    static readAll (req, res) {
        Article.find({ author: req.userData.email })
        .exec()
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static readOne (req, res) {
        Article.findById(objectId(req.params.id))
        .exec()
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static create (req, res) {
        let imageName = null;
        let imageUrl = null;
        if(req.file) {
            imageName = req.file.cloudStorageObject
            imageUrl = req.file.cloudStoragePublicUrl
        }

        let newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at,
            author: req.userData.email,
            imageName: imageName,
            imageUrl: imageUrl,
        })

        newArticle.save((err, article) => {
            if (err) {
                console.log(err)
                res.status(500).json({ err })
            } else {
                res.status(201).json({
                    message: "Article saved",
                    article,
                })
            }
        })
    }

    static update(req, res) {
        const input = {}
        if(req.body.title) input.title = req.body.title
        if(req.body.content) input.content = req.body.content

        Article.updateOne({_id: objectId(req.params.id)}, {$set: input})
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static delete (req, res) {
        Article.remove({_id: objectId(req.params.id)})
        .exec()
        .then(deleted => {
            res.status(200).json({
                message: "Article deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    }
}

module.exports = Controller