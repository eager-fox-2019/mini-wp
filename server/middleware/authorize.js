const Article = require('../models/article.js')

module.exports = {
  article: (req, res, next) => {
    Article.findById(req.params.id)
      .exec()
      .then(article => {
        if(String(article.author) === String(req.userData.id)) {
          next()
        } else {
          console.log("AUTH FAILED")
          next({ status: 403, msg: "Unauthorized" })
        }
      })
      .catch(next)
  },
}