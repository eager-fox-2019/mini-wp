const Article = require('../models/model-article')

class ControllerArticle {
  static create(req, res, next) {
    console.log('masuk creaate')
    let newArticle = {
      title: req.body.title || '',
      content: req.body.content || '',
      published: req.body.published || false,
      user_id: req.userId,
      featured_image: (req.file) ? req.file.gcsUrl : ''
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

    Article.find(query).lean().populate('user_id', '_id full_name username email')
      .then((articles) => {
        articles = articles.map((article) => {
          return Object.assign(article, {
            contentNonHtml: article.content.replace(/<[^>]*>?/gm, ' ').trim()
          })
        })
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
    console.log('ini nilai req.body content', req.body);
    console.log('ini nilai req.body content', typeof req.body);
    
    let schemaField = Object.keys(Article.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let updatedArticle = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})
    Article.findByIdAndUpdate(req.params.id, updatedArticle)
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
        res.status(201).json({
          message: 'successfully delete article'
        })
      })
      .catch(next)
  }  
}

module.exports = ControllerArticle