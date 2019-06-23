const Article = require('../models/article')
var mongoose = require('mongoose');

class ArticleCont {
  static create (req, res, next) {
    let newArticle = {
      user : req.decoded._id,
      title : req.body.title,
      content: req.body.content,
      created_at: new Date(),
      tags: JSON.parse(req.body.tags)
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
    Article.find({}).populate({path:'user', select: 'name'}).exec(function (err, articles) {
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        if (articles) {
          res.status(200).json(articles)
        } else {
          res.status(200).json([])
        }
      }
    })
  }

  static detail (req, res, next) {
    Article.findById(req.params.id).populate({path:'user', select: ['name', 'email']}).exec(function (err, article) {
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
    Article.find(where).populate({path:'user', select: 'name'}).exec(function (err, articles) {
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        if(articles) {
          res.status(200).json(articles)
        } else {
          res.status(200).json([])
        }
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
          article.tags = JSON.parse(req.body.tags)
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
