const { verify } = require('../helpers/jwt');
const { User } = require('../models');
const { Article } = require('../models');

module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      throw({code : 401, message: 'Unauthorized' })
    } else {
      let decoded = verify(token);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
          if(user) {
            req.user = user;
            next();
          } else {
            throw({code : 401, message: 'Unauthorized'})
          }
       })
       .catch(next)
    }
  },
  authorize: function(req, res, next) {
    let { id } = req.params;
    let userId = req.user._id
    Article
    .findOne({ _id: id })
    .then( data => {
        if( data ) {
            if( String(data.author) == String(userId) ){
              next()
            }else {
              throw({ code : 403, message : 'Forbidden' })
            }
        } else {
          throw({ code : 400, message : 'Bad Request' })
        }
    })
    .catch(next)
  }
}