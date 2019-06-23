const { verifyToken } = require('../helpers/token')
const Users = require('../models/user')
const Articles = require('../models/article')

const auth = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    try {
      const decode = verifyToken(req.headers.token)
      req.decode = decode

      Users.findOne({ email: decode.email })
      .then(user => {
        if (user) next()
        else next({ code: 400, message: `Invalid Token. Please re-login` })
      })
      .catch(next)
    }
    catch (err) { next({ code: 400, message: `Invalid Token. Please login/register` }) }
  }
  else next({ code: 400, message: `No token provided. Please login/register`})
}

const authorization = (req, res, next) => {
  Articles.findById(req.params.id)
  .then(article => {
    if (article.userId.toString() === req.decode._id) next()
    else next({ code: 401 })
  })
  .catch(next)
}

module.exports = {
  auth,
  authorization
}