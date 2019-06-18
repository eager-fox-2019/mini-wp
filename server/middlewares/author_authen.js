const { decodeToken } = require('../helpers/jwtHelper')
const User = require('../models/modelUser')
const Token = require('../models/modelBlacklistToken')
const Article = require('../models/modelArticle')
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
  authentication: (req, res, next) => {
    try {
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
          
          next()
        })
        .catch(next)
    } catch (err) {
      next({error: err})
    }
    
  },
  authorization: function(req, res, next) {
    console.log('########## Checking authorization');
    try {
      let articleId = req.params.id
      Promise.all([decodeToken(req.headers.token), Article.findById(articleId)])
        .then((values) => {
          if (values[0].userId !== values[1].user_id.toString()) {
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