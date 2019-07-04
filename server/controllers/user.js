const Users = require('../models/user')
const { pwdMatch, randHashPwd } = require('../helpers/hashPwd')
const { genToken, verifyToken } = require('../helpers/token')
const { OAuth2Client } = require('google-auth-library')

class UserControllers {
  static create(req, res, next) {
    Users.create(req.body)
    .then(user => res.status(201).json({ name: user.name, email: user.email }))
    .catch(next)
  }

  static login(req, res, next) {
    Users.findOne({ email: req.body.email })
    .then(user => {
      if (!user || !pwdMatch(req.body.password, user.password)) throw { code: 404, message: `Invalid User/password` }
      
      const token = genToken({ _id: user.id, email: user.email })
      res.json({ token: token, name: user.name, email: user.email })
    })
    .catch(next)
  }

  static auth(req, res, next) {
    try {
      const decoded = verifyToken(req.headers.token)
      res.json({ message: 'Valid token'})
    }
    catch (err) { next({ code: 400, message: `Invalid Token. Please login/register` }) }
  }

  static glogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let email, name;

    client.verifyIdToken({
      idToken: req.headers.token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      ({ email, name } = ticket.getPayload())
      
      return Users.findOne({ email: email })
    })
    .then(user => {
      if (!user) return Users.create({ name: name, email: email, password: randHashPwd() })
      return user
    })
    .then(user => {
      const token = genToken({ _id: user.id, name: name, email: email })
      res.json({ token: token, name: user.name, email: user.email })
    })
    .catch(next)
  }
}

module.exports = UserControllers