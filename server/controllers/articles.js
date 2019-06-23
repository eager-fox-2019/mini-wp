const Article = require('../models/articles')
var ObjectId = require('mongodb').ObjectID;

class ControllerArticle {

  static readAll(req, res, next) {
    Article.find().populate('user')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {id, title, description, content, picture} = req.body
    let input = {title, description, content, picture}
    if(req.file && req.file.gcsUrl) {
      input.user = req.userData.id
      input.createdAt = new Date()
      input.picture = req.file.gcsUrl
      Article.create(input)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    } else {
      next({code: 500, message: 'unable to upload'})
    }
  }

  static findArticle(req, res, next) {
    Article.findById(req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let {title, description, content} = req.body
    let input = {title, description, content}
    if(req.file && req.file.gcsUrl) {
      input.picture = req.file.gcsUrl
      Article.updateOne({_id: ObjectId(req.params.id)}, input)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    }
  }

  static delete (req, res, next) {
    Article.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static getByUser(req, res, next) {
    
    Article.find({user : ObjectId(req.params.id)})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerArticle