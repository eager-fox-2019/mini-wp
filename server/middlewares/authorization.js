const Model = require('../models');
module.exports = (req, res, next) => {
  Model.Article.find({_id: req.params.articleId})
    .then((article) => {
      if (article.length != 0) {
        if (article[0].author == req.decode.obj._id) {
          next();
        } else {
          next({
            code: 401
          });
        }
      } else {
        next({
          code: 404
        });
      }
    })
    .catch((err) => {
      next(err);
    });
}