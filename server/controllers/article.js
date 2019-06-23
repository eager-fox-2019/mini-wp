const Article = require("../models/article.js")

class ArticleController{
    static create(req, res, next) {
        let id = req.decoded.id
        let newArticle = {
          title: req.body.title,
          content: req.body.content,
          created_at: new Date(),
          image: req.file.cloudStoragePublicUrl,
          tag: req.body.tags,
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
        let tag = req.query.tag;
        let search = req.query.search;
        let userArticle = {
          UserId: id,
          group: tag,
          title: {$regex: `.*${search}.*`}
        }
        if(!myArticle) delete userArticle.UserId
        if(!search) delete userArticle.title
        if(!tag) delete userArticle.group
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