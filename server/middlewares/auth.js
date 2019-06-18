const jwt = require(`jsonwebtoken`);
const Article = require(`../models/article`);

module.exports = {
  authentication: function(req, res, next) {
    try {
      console.log("disini")
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("disini 2")
      next({
        code: 401,
        message: `login first!`
      });
    }
  },
  authorization: function(req, res, next) {
    let condition = {
      _id: req.params.id,
      author: req.user._id
    };

    Article.findOne(condition)
      .then(result => {
        if (result) {
          next();
        } else {
          next({
            code: 401,
            message: `access not allowed!`
          });
        }
      })
      .catch(err => {
        next({
          code: 500,
          message: `internal server error!`
        });
      });
  }
};
