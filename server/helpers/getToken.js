let jwt = require('jsonwebtoken')

module.exports = (input) => {
  let token = jwt.sign({
    email: input.email,
    id: input._id
  }, process.env.JWT_SECRET, {expiresIn: '4h'} )
  return token
}