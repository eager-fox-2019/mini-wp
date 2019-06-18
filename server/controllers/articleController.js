const Article = require('../models/article')
const ObjectID = require('mongodb').ObjectID

class ArticleController {
  static addArticle(req, res, next) {
    Article.create({
      title: req.body.title,
      content: req.body.content
    })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static listArticles(req,res,next) {
    Article.find()
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static deleteArticle(req,res,next) {
    // console.log(this.article)
    Article.deleteOne({ 
      _id: ObjectID(req.params.id)
    })
      .then(deleted => {
        res.status(200).json(deleted)
        // console.log(deleted)
      })
      .catch(next)
  }

  static editArticle(req,res,next) {
    Article.updateOne({
      _id: ObjectID(req.params.id)
    }, {
      title: req.body.title,
      content: req.body.content
    })
      .then(edited => {
        console.log(edited)
        res.status(200).json(edited)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = ArticleController