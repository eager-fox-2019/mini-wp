const Article = require('../models/article')
var mongoose = require('mongoose');

class ArticleCont {
  static create (req, res, next) {
    let newArticle = {
      user : req.decoded._id,
      title : req.body.title,
      content: req.body.content,
      created_at: new Date(),
    }
    if (req.file) {
      newArticle.img = req.file.gcsUrl
    } else {
      newArticle.img = req.body.img
    }
    Article.create(newArticle)
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static list (req, res, next) {
    Article.find({user: mongoose.Types.ObjectId(req.decoded._id)}, function (err, articles) {
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        let output = []
        for (let i = 0; i < articles.length; i++){
          let article = {
            _id: articles[i]._id,
            img : articles[i].img,
            title : articles[i].title,
            content: articles[i].content,
            created_at: articles[i].created_at,
          }
          output.push(article)
        }
        res.status(200).json(output)
      }
    })
  }

  static detail (req, res, next) {
    Article.findById(req.params.id, function (err, article) {
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        if(article) {
          res.status(200).json(article)
        } else {
          next({code: 404, message: `Article with id ${req.params.id} not found!`})
        }
      }
    })
  }

  static filter (req, res, next) {
    let where = {}
    if (req.params.field === "title") {
      where["title"] = {$regex: req.params.value, $options: 'i'}
    } else {
      where[req.params.field] = req.params.value
    }
    Article.find(where, function (err, articles) {
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        let output = []
        for (let i = 0; i < articles.length; i++){
          let article = {
            _id: articles[i]._id,
            img : articles[i].img,
            title : articles[i].title,
            content: articles[i].content,
            created_at: articles[i].created_at,
          }
          output.push(article)
        }
        res.status(200).json(output)
      }
    })
  }

  static update (req, res, next) {
    Article.findById(req.params.id, (err, article) => {
      if (err) {
        next({code: 500, message: err.message})
      } else {
        if (article) {
          article.title = req.body.title
          article.content = req.body.content
          if (req.file) {
            article.img = req.file.gcsUrl
          }
          article.save()
            .then (article => {
              res.status(200).json(article)
            })
            .catch(next)
        } else {
          next({code: 404, message: `Article with id ${req.params.id} not found!`})
        }
      }
    })
  }

  static delete (req, res, next) {
    Article.deleteOne({ _id: req.params.id })
    .then(result =>{
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ArticleCont
