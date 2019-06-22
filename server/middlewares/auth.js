const jwt = require(`jsonwebtoken`);
const Article = require(`../models/article`);
const { ObjectId } = require(`mongoose`);

module.exports = {
  authentication: function(req, res, next) {
    console.log("auth 1");
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      console.log("auth ok");
      next();
    } catch (err) {
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
    console.log("authorization start");
    Article.findOne(condition)
      .then(result => {
        if (result) {
          console.log("authorization finish");
          next();
        } else {
          console.log("authorization not ok");
          next({
            code: 401,
            message: `access not allowed!`
          });
        }
      })
      .catch(err => {
        console.log("authorization error");
        console.log(err);
        next({
          code: 500,
          message: `internal server error!`
        });
      });
  }
};
