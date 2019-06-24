const Article = require('../models/article')


class ArticleController {
  static create(req, res, next) {
    let {title, content, tags, published} = req.body
    let newArticle = {
      title,
      featuredImg: req.file.cloudStoragePublicUrl,
      content,
      tags: tags.split(','),
      author: req.loggedUser.id,
      postedAt: new Date(),
      published
    }
    Article.create(newArticle)
      .then(data => {
        res.status(201).json({ data })
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    let tag
    if (req.query.tag) {
      tag = {tags: {$in: req.query.tag}}
    } else {
      tag = {}
    }
    Article
      .find(tag,{}, {
        sort: {
          postedAt : -1
        }
      })
      .populate('author')
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Article
      .findById(req.params.id)
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static put(req, res, next) {
    let {title, featuredImg, content, tags, published} = req.body
    Article
      .findByIdAndUpdate(req.params.id,
      {
        title,
        featuredImg,
        content,
        tags,
        published
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static patch(req, res, next) {
    console.log('masuk patch')
    let setVal = {}
      req.body.title && (setVal.title = req.body.title) 
      if (typeof req.body.featuredImg === String) {
        setVal.featuredImg = req.body.featuredImg
      } else {
        setVal.featuredImg = req.file.cloudStoragePublicUrl
      }
      req.body.content && (setVal.content = req.body.content)
      req.body.tags && (setVal.tags = req.body.tags)
      req.body.published && (setVal.published = req.body.published)
      Article
      .findById(req.params.id)
      .then(article =>{
          article.set(setVal)
          return article.save()
      })
      .then(updated =>{
          res.status(200).json(updated)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Article
      .deleteOne({_id : req.params.id})
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static findTags(req, res, next) {
    Article
      .find({})
      .then((articles) => {
        let tags = []
        articles.forEach(article => {
          article.tags.forEach(tag => {
            tags.push(tag)
          })
        })
        res.status(200).json({tags})
      })
      .catch(next)
  }
}

module.exports = ArticleController