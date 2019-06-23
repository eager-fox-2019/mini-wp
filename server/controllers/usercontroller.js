const User = require('../models/user.js')
const pwHelper = require('../helpers/password.js');
const tkHelper = require('../helpers/token.js');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class Controller {
  static register(req, res, next) {
    console.log(`Registering ${ req.body.email }`)

    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        res.status(201).end()
      })
      .catch(err => {
        if(err.message.includes("invalid format")) {
          next({ status: 400, msg: "Invalid email format" })
        } else if(err.message.includes("not unique")) {
          next({ status: 409, msg: "Email already used" })
        }
        next({})
      })
  }

  static login(req, res, next) {
    console.log(`Logging in ${ req.body.email }`)

    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if(!user) {
        throw { status: 401, msg: "Invalid username/password" }
      }
      else {
        if(pwHelper.compare(req.body.password, user.password)) {
          let token = tkHelper.sign({ email: user.email, id: user._id, })
          res.json({
            email: req.body.email,
            token,
          })
        } else {
          throw { status: 401, msg: "Invalid username/password"}
        }
      }
    })
    .catch(next)
  }

  static gLogin(req, res, next) {
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.idtoken,
          audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      console.log(`Logging in google account: ${payload.email}`)
      User.findOne({ email: payload.email })
        .exec()
        .then(user => {
          if(!user) {
            // Create new user and send token
            User.create({
              email: payload.email,
              password: pwHelper.generateRandom(18),
            })
              .then(user2 => {
                let token = tkHelper.sign({ email: user2.email, id: user2._id, })
                res.json({ token })
              })
              .catch(next)
          } else {
            let token = tkHelper.sign({ email: user.email, id: user._id, })
            res.json({ token })
          }
        })
    }
    verify().catch(next);
  }

  static checkLogin(req, res) {
    console.log(`Auto login for: ${req.userData.email}`)
    res.status(200).json({
      email: req.userData.email,
    })
  }
}

module.exports = Controller