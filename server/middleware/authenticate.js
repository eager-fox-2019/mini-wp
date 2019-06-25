const User = require('../models/user.js')
const tkHelper = require('../helpers/token.js')

module.exports = (req, res, next) => {
  if(req.headers.authorization) {
    try {
      const decoded = tkHelper.verify(req.headers.authorization);
      console.log('decoded is: ', decoded)
      User.find({ email: decoded.email })
        .then(users => {
          if(users.length > 0) {
            req.userData = decoded;
            next()
          } else {
            console.log('token decoded but user not found')
            next({ status: 403, msg: "Unauthorized" })
          }
        })
        .catch(next)
    }
    catch (err) {
      console.log('token failed to be decoded')
      next({ status: 401, msg: "Authentication failed" })
    }
  } else {
    console.log('header missing authorization field')
    next({ status: 401, msg: "Authentication failed" })
  }
}