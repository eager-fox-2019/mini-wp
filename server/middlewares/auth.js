const { verify } = require('../helpers/jwt');
const User = require('../models/user');
const Article = require('../models/article')


module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      throw {code: 401, msg: 'You must login to access this endpoint'}
    } else {
      try {
        let decoded = verify(token);
        req.loggedUser = decoded
      } catch (err) {
        throw err
      }
      User
        .findOne({
        email: req.loggedUser.email
        })
        .then(user => {
          if(user) {
            req.loggedUser = user;
            next();
          } else {
            throw {code: 401, msg: 'User is not valid'} 
         }
       })
       .catch(next)
    }
  },
  authorize: function(req, res, next) {
    Article.findOne({ _id: req.params.id })
    .then(article => {
        if(article.author._id == req.loggedUser._id) {
          next()
        } else {
          res.status(401).json({ error: 'Unauthorized' })
        }
      })
      .catch(err => { res.status(500).json(err) })
  },
}
