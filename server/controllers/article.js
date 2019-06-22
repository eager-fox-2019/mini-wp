const Articles = require('../models/article')
const imagePath = '/data/Phase2/week2/senin/mini-wp/images'

class ArticleController {
  static create(req, res, next) {
    //console.log('aaaa')
    //if (Object.keys(req.files).length !== 0) {
      
      const uploadedFile = req.files.imageFile

      uploadedFile.mv(`${imagePath}/benul.png`, function(err) {
        if (err) next(err)
        // Articles.create(req.body)
        // .then(article => res.status(201).json(article))
        // .catch(next)
        console.log('success')
      })
    //}
    console.log('image kosong')    
  }

  static listAll(req, res, next) {
    Articles.find()
    .then(article => res.json(article))
    .catch(next)
  }

  static searchTitle(req, res, next) {
    Articles.find({ title: req.query.title })
    .then(articles => res.json(articles))
    .catch(next)
  }

  static updateArticle(req, res, next) {
    Articles.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content })
    .then(article => res.json(article))
    .catch(next) 
  }

  static delete(req, res, next) {
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'success' }))
    .catch(next)
  }
}

module.exports = ArticleController