const Users = require('../models/user')
const { pwdMatch } = require('../helpers/hashPwd')
const { genToken } = require('../helpers/token')


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
      res.json({ token: token, name: user.name })
    })
    .catch(next)
  }
}

module.exports = UserControllers