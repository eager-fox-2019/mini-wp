const Article = require("../models/articles")


class ArticleController{
    
    static findAll(req, res, next){
        Article.find().populate("author").lean()
        .then(articles =>{
            res.status(201).json(articles)
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