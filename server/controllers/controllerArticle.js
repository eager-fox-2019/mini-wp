const Article = require('../models/modelArticle')
const { decodeToken } = require('../helpers/jwtHelper')

class ControllerArticle {
  static create(req, res, next) {
    let payload = decodeToken(req.headers.token)
    let newArticle = {
      title: req.body.title,
      content: req.body.content,
      user_id: payload.userId
    }
    Article.create(newArticle)
      .then((createdArticle) => {
        res.json(createdArticle)
      })
      .catch(next)
  }

  static readAllwFilter(req, res, next) {
    let payload = (req.headers.token) ? decodeToken(req.headers.token) : ''
    let schemaField = Object.keys(Article.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let query = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})
    Article.find(query).populate('user_id').lean()
      .then((articles) => {
        articles = articles.map((article) => {
          article.permission = {admin: false}
          if (payload) {
            if (article.user_id._id == payload.userId) {
              article.permission = {admin:true}
            }
          }
          return article
        })
        console.log(articles);
        
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
    let updatedArticle
    Article.findOne({_id: req.params.id})
      .then((article) => {
        if (!article) throw { code: 404 }
        else {
          let schemaField = Object.keys(Article.prototype.schema.paths)
          let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
          updatedArticle = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})
          return Article.updateOne({_id: req.params.id}, updatedArticle)
        } 
      })
      .then((article) => {
        res.status(201).json(updatedArticle)
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