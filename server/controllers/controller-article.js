const Article = require('../models/model-article')
const { decodeToken } = require('../helpers/jwt-helper')

class ControllerArticle {
  static create(req, res, next) {
    let newArticle = {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published || false,
      user_id: req.userId,
    }
    Article.create(newArticle)
      .then((createdArticle) => {
        res.json(createdArticle)
      })
      .catch(next)
  }

  static readAllwFilter(req, res, next) {
    let schemaField = Object.keys(Article.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let query = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})

    Article.find(query).populate('user_id').lean()
      .then((articles) => {
        res.json(articles)
      })
      .catch(next)
  }

  static readAll(req, res, next) {
    Article.find().populate('user_id')
      .then((articles) => {
        res.json(articles)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Article.findById(req.params.id)
      .then((article) => {
        res.json(article)
      })
      .catch(next)
  }
  
  static update(req, res, next) {
    let schemaField = Object.keys(Article.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let updatedArticle = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})
    Article.findByIdAndUpdate({_id: req.params.id}, updatedArticle)
      .then((article) => {
        res.status(201).json(article)
      })
      .catch(next)
  }
  
  static delete(req, res, next) {
    let id = req.params.id
    Article.findById(id)
      .then((article) => {
        if (!article) throw { code: 404 }
        else {
          return Article.deleteOne({ _id: id})
        } 
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(next)
  }  
}

module.exports = ControllerArticle