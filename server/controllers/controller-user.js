const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const { compareHash } = require('../helpers/hash-helpers')
const { generateToken, decodeToken } = require('../helpers/jwt-helper')
const { customPassword } = require('../helpers/passwordGenerator')

class ControllerUser {
  static login(req, res, next) {
    if (req.body.login_type == 'default') {
      // default login
      let { username, password } = req.body
      let userData
      User.findOne({ username: username })
        .then((user) => {
          userData = user
          if (!user) return next({code: 401, message: 'Username / password Invalid'})
          else {
            return compareHash(password, user.password)
          }
        })
        .then(result => {
          if (!result) return next({code: 401, message: 'Username / password Invalid'})
          else {
            let payload = {
              userId: userData._id
            }          
            let token = generateToken(payload)
            res.json({
              token: token
            })
          }
        })
        .catch(next)
    } else if (req.body.login_type == 'google') {
      // google login
      console.log('masuk login')
      let { full_name, username, email } = req.body
      let userData
      User.findOne({ email: email, username: username })
        .then((user) => {
          console.log('ini hasili user', user)
          userData = user
          if (!user) {
            let randomPass = customPassword();
            return User.create({
              email: email,
              username: username,
              full_name: full_name,
              password: randomPass
            })
          }
        })
        .then(result => {
          let payload = {
            userId: (userData) ? userData._id : result._id
          }          
          let token = generateToken(payload)
          console.log('ini payload', payload)
          console.log('ini token send', token)
          res.json({
            token: token
          })
        })
        .catch(next)
    }
  }
  
  static logout(req, res, next) {
    let token = req.headers.token
    Token.create({ token: token })
      .then((token) => {
        res.status(201).json({ message: 'Successfully log out' })
      })
      .catch(next)
  }

  static register(req, res, next) {
    let schemaField = Object.keys(User.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let newUser = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})
    User.create(newUser)
      .then((user) => {
        res.json(user)
      })
      .catch(next)
  }

  static profileData(req, res, next) {
    let payload = decodeToken(req.headers.token)
    User.findOne({ _id: payload.userId })
      .then((result) => {
        let sendData = {
          full_name: result.full_name,
          username: result.username,
          email: result.email,
          id: result._id
        }
        res.json(sendData)
      })
      .catch((err) => {
        console.log(err);
        next()
      })
  }
}

module.exports = ControllerUser