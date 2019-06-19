const { Article } = require('../models')

class ArticleController{
    static findAll(req, res, next){
        Article.find()
            .then(articles => {
                res.json(articles)
            })
            .catch(next)
    }

    static findPersonal(req, res, next){
        console.log("Masuk ke find personal")
        Article.find({author: req.decode.id})
            .then(articles => {
                console.log("Find personal function", articles)
                articles.sort(function(a,b){
                    return new Date(a.updatedAt) - new Date(b.updatedAt);
                });
                res.json(articles)
            })
            .catch(next)
    }

    static readOne(req, res, next){
        Article.findOne({
            _id: req.params.articleId
        })
            .then(article => {
                res.json(article)
            })
            .catch(next)
    }

    static findOne(req, res, next){
        Article.findOne({
            _id: req.params.articleId,
            author: req.decode.id
        })
            .then(article => {
                res.json(article)
            })
            .catch(next)
    }

    static create(req, res, next){
        const { title, content, imgUrl } = req.body
        const input = { title, content, imgUrl }
        input.author = req.decode.id
        Article.create(input)
            .then(newArticle => {        
                res.status(201).json(newArticle)
            })
            .catch(next)
    }

    static update(req, res, next){
        let searchObj = {
            _id: req.params.articleId,
            author: req.decode.id
        }
        let updateObj = {}
        let updateKeys = Object.keys(req.body)
        for(let i = 0; i < updateKeys.length; i++){
            updateObj[updateKeys[i]] = req.body[updateKeys[i]]
        }
        let setObj = {
            $set: updateObj
        }
        Article.updateOne(searchObj, setObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: "Article not found"}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static delete(req, res, next){
        let searchObj = {
            _id: req.params.articleId,
            author: req.decode.id
        }
        Article.deleteOne(searchObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: "Article not found"}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = ArticleController