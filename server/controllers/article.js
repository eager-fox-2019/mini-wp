const Article = require('../models/article')

class ControllerArticle{
    static findAll(req, res, next){
        Article
        .find()
        .populate('userId')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req, res, next){
        Article
        .findOne({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static create(req, res, next){
        console.log(req.body, 'body create')
        let input = ""
        if (req.file){
            input = {
                userId: req.decoded.id,
                title: req.body.title,
                content: req.body.content,
                img: req.file.cloudStoragePublicUrl,
                tags: req.body.tags,
                comments: []
            }
        }else{
            input = {
                userId: req.decoded.id,
                title: req.body.title,
                content: req.body.content,
                img: req.body.image,
                tags: req.body.tags,
                comments: []
            }
        }
        Article
        .create(input)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static patch(req, res, next){
        let input = ""
        if (req.file){
            input = {
                userId: req.decoded.id,
                title: req.body.title,
                content: req.body.content,
                img: req.file.cloudStoragePublicUrl,
                tags: req.body.tags
            }
        }else{
            input = {
                userId: req.decoded.id,
                title: req.body.title,
                content: req.body.content,
                img: req.body.img,
                tags: req.body.tags
            }
        }

        Article
        .findByIdAndUpdate(req.params.id, input)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static delete(req, res, next){
        Article
        .findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json({
                id: req.params.id
            })
        })
        .catch(next)
    }
    static search(req, res, next){
        Article
        .find({
            title : {'$regex': req.params.input, '$options' : 'i'}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findAllUser(req, res, next){
        Article
        .find({
            userId: req.decoded.id
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ControllerArticle