const { Article } = require('../models')

class ControllerUser {
    static create(req, res, next) {
        let author = req.user._id
        let article = { ...req.body, ...{ author } }
        Article.create(article)
          .then(data => {
            res.status(201).json( data )
          })
          .catch(next)
    }
    static findAll(req, res, next) {
        let author = req.user._id
        Article.find({ author  }).sort([[ 'updatedAt' , 'descending' ]])
          .then(data => {
            res.status(200).json(data)
          })
          .catch(next)
    }
    static findOne(req, res, next) {
        Article.findOne({ _id: req.params.id })
          .then(article => {
            res.status(200).json(article)
          })
          .catch(next)
    }
    static findOneByTag(req, res, next) {
      let author = req.user._id
        Article.find({ 
          tags: req.params.tag,
          author
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
    static update(req, res, next) {
        let input
        if(req.file) {
          input = {...req.body }
        }else{
          input = {...req.body }
        }
        Article.findOneAndUpdate({ _id: req.params.id }, input, { new: true })
          .then(article => {
            res.status(200).json(article)
          })
          .catch(next)
    }
    static delete(req, res, next) {
        Article.findOneAndDelete({ _id: req.params.id })
          .then(article => {
          res.status(200).json({ message: 'Delete successfully' })
          })
          .catch(next)
    }
}

module.exports = ControllerUser