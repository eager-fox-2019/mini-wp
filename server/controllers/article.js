const Article = require("../models/article.js")
const { image } = require("../helpers/error.js")

class ArticleController{
    static create(req, res, next) {
        let id = req.decoded.id
        if (!req.file){
          throw {
            code: 404,
            name: `ValidationError`,
            path: `Image`,
            message: image
          }
        }
        let newArticle = {
          title: req.body.title,
          content: req.body.content,
          created_at: new Date(),
          image: req.file.cloudStoragePublicUrl,
          tag: req.body.tag,
          UserId: id
        };
        Article.create(newArticle)
          .then(result => {
            res.status(201).json(result);
          })
          .catch(next);
      }
      static read(req, res, next) {
        let myArticle = req.query.myArticle
        let id = req.decoded.id;
        let userArticle = {
          UserId: id
        }
        if(!myArticle) delete userArticle.UserId
        Article.find(userArticle)
        .populate('UserId')
          .then(result => {
            res.status(200).json(result);
          })
          .catch(next);
      }
      static delete(req, res, next) {
        let id = req.params.id;
        Article.deleteOne({
          _id: id
        })
          .then(result => {
            res.status(200).json(result);
          })
          .catch(next);
      }
      static edit(req, res, next) {
        let id = req.params.id;
        let input = req.body
        let update = {}
        for (let keys in input){
          update[keys] = req.body[keys]
        }
        if (req.file){
          update.image = req.file.cloudStoragePublicUrl
        }
        console.log(update)
        Article.findByIdAndUpdate(id, 
          {$set: update},
          {new: true})
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(next);
      }
}

module.exports = ArticleController