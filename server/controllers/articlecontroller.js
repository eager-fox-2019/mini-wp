const Article = require('../models/article.js')

class Controller {
  static create (req, res, next) {
    let props = {
      author: req.userData.id,
      title: req.body.title,
      content: req.body.content,
      created_at: req.body.created_at,
      tags: req.body.tags.split(',') || [],
    }
    if(req.file) {
      props.imageName = req.file.cloudStorageObject
      props.imageUrl = req.file.cloudStoragePublicUrl
    }
    
    Article.create(props)
      .then(article => {
        console.log("created 1 article")
        res.status(201).json(article)
      })
      .catch(next)
  }

  static readAll (req, res, next) {
    Article.find()
      .populate('author')
      .exec()
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
    }

  static readMine (req, res, next) { //Shows all articles belonging to user
    Article.find({ author: req.userData.id })
      .populate('author')
      .exec()
      .then(articles => {
        res.json(articles)
      })
      .catch(next)
  }

  static readOne (req, res, next) {
    Article.findById(req.params.id)
      .populate('author')
      .exec()
      .then(article => {
        res.json(article)
      })
      .catch(next)
  }

  static delete (req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .exec()
      .then(() => {
        console.log("deleted 1 article")
        res.status(204).end()
      })
      .catch(next)
  }

  static update(req, res, next) {
    let updates = Object.assign({}, req.body)
    Article.findByIdAndUpdate(req.params.id,
      { $set: updates },
      { new: true },
    )
      .exec()
      .then(article => {
        console.log("updated 1 article")
        res.json(article)
      })
      .catch(next)
  }

}

module.exports = Controller