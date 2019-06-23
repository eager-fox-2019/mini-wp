const { decodeToken } = require('../helpers/jwt-helper')
const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const Article = require('../models/model-article')
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
  authentication: (req, res, next) => {
    try {
      console.log('########## Checking authentication');
      console.log('req bidy', req.body);
      
      let payload = decodeToken(req.headers.token)
      Promise.all([User.findOne({_id: payload.userId}), Token.findOne({token: req.headers.token})])
        .then(result => {
          let [user, token] = result
          if (!user) {
            console.log('user fail');
            next({ code: 401 })
          }
          if (token) {
            console.log('token fail');
            next({ code: 404, message: 'Please logout and login again'})
          }
          console.log('authentication done');
          req.userId = payload.userId
          next()
        })
        .catch(next)
    } catch (err) {
      next({error: err})
    }
    
  },
  authorization: function(req, res, next) {
    console.log('########## Checking authorization');
    console.log('req bidy', req.body);
    try {
      let articleId = req.params.id
      let loginUserId = req.userId
      Article.findById(articleId)
        .then((article) => {
          if (loginUserId !== article.user_id.toString()) {
            console.log('unauthorized');
            next({ code: 404 })
          } else {
            console.log('authorization done');
            next()
          }
        })
    } catch (err) {
      next({error: err})
    }
  }
}