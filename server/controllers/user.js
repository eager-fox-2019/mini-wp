const User = require('../models/user')
const { compareSync } = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const randomPass = require('../helpers/randomPass')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserCont {
  static GoogleSignIn(req, res, next) {
    let payload = null
    let newPass = null
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        if (!user) {
          newPass = randomPass()
          return User.create({
            name: payload.name,
            email: payload.email,
            password: newPass
          })
        } else {
          return user
        }
      })
      .then(user => {
        let { name, email } = user
        let payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        let token = jwt.sign(payload)
        let data = { token, name, email }
        if (newPass) data.newPass = newPass
        res.status(201).json(data)
      })
      .catch(next)
  }

  static register(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({
      email: req.body.email,
    })
      .then(user => {
        if (user) {
          let { name } = user
          let isSame = compareSync(req.body.password, user.password)
          if (isSame) {
            let payload = {
              _id: user._id,
              email: user.email
            }
            let access_token = jwt.sign(payload)
            res.status(201).json({
              token: access_token,
              name: user.name,
              email: user.email
            })
          }
          else next({ code: 400, message: 'Wrong email/password' })
        }
        else
          next({ code: 400, message: 'Wrong email/password' })
      })
      .catch(next)
  }
}

module.exports = UserCont