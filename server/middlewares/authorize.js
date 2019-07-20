const Article = require('../models/article')

module.exports = (req, res, next) => {
  Article.findOne({
      _id: req.params.id
    })
    .then(article => {
      if (article) {
        if (article.user.equals(req.decoded._id)) {
          next()
        } else {
          next({
            code: 403,
            message: 'Unauthorized'
          })
        }
      } else
        next({
          code: 404,
          message: 'Article not found'
        })
    })
    .catch(next)
}