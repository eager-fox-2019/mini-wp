const Article = require("../models/articles")


class ArticleController{
    
    static findAll(req, res, next){
        Article.find().populate("author").lean()
        .then(articles =>{
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static findMyArticles(req, res, next){
        var userid = req.headers.payload.id
        Article.find({author: userid}).populate("author")
        .then(articles =>{
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static create(req, res, next){
        var newArticle = new Article({
            title: req.body.title,
            imgSrc: req.body.imgSrc,
            content: req.body.content,
            author: req.headers.payload.id,
            createdAt: new Date()
        })
        newArticle.save()
        .then(saved =>{
            res.status(201).json(saved)
        })
        .catch(next)
    }

    static edit(req, res, next){
        return Article.update({_id: req.query.id},{
            title: req.body.title,
            imgSrc: req.body.imgSrc,
            content: req.body.content
        })
        .then(updated =>{
            return Article.findOne({_id: req.query.id})
        })
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Article.deleteOne({_id: req.query.article})
        .then(deleted =>{
            console.log(deleted)
            res.status(200).json("Successfully deleted article")
        })
        .catch(next)
    }
}

module.exports = ArticleController