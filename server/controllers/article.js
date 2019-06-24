const Articles = require('../models/article')

class ArticleController {
  static create(req, res, next) {
    req.body = Object.assign({ userId: req.decode._id }, req.body)

    Articles.create(req.body) 
    .then(article => res.status(201).json(article))
    .catch(next)
  }

  static listAll(req, res, next) {
    Articles.find()
    .populate('userId')
    .then(article => res.json(article))
    .catch(next)
  }

  static updateArticle(req, res, next) {
    Articles.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content })
    .then(article => res.json(article))
    .catch(next) 
  }

  static delete(req, res, next) {
    Articles.findById(req.params.id)
    .then(article => {
      if (!article) throw { code: 404 }
      return Articles.deleteOne({ _id: req.params.id })
    })
    .then(() => res.json({ message: 'success' }))
    .catch(next)
  }
}

module.exports = ArticleController