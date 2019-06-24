const Helper = require('../helpers/helper')
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {

    static register(req, res) {
      let input = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
  
      User
        .create(input)
        .then(user => {
          res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
  
    static login(req, res) {
      User.findOne({ 'email': req.body.email }) 
        .then(user => {
          let cekPass = false
          if (user) {
            console.log(user, '---')
            cekPass = Helper.comparePassword(req.body.password, user.password)
            if (!cekPass) {
              console.log(cekPass)
              res.status(400).json({ message: 'invalid username or password' })
            } else {
              let token = Helper.generateJWT({ 
                _id: user._id,
                name: user.name,
                email: user.email
              });
              console.log(token)
              res.status(200).json({ token })
            }
          } else {
              console.log('salah')
              res.status(400).json({ err: "Username/Password wrong" });
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    }

    static googleSignIn(req, res) {
      client
          .verifyIdToken({
              idToken: req.headers.access_token,
              audience: process.env.GOOGLE_CLIENT_ID
          })
          .then(ticket => {
              console.log('masuk then 1')
              let payload = ticket.payload
              let foundUser = User.findOne({ email: payload.email })
              return Promise.all([payload, foundUser])
          })
          .then(([payload, foundUser]) => {
            console.log('masuk then 2')
              if (!foundUser) {
                  return User.create({
                      name: payload.name,
                      email: payload.email,
                      password: "123456"
                  })
              } else {
                  return foundUser
              }
          })
          .then(user => {
            console.log('masuk then 3')
              const myToken = Helper.generateJWT({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
              })
              res.status(200).json({
                  token: myToken,
                  _id: user._id,
                  name: user.name,
                  email: user.email
              })
          })
          .catch(err => {
              res.status(500).json(err)
          })
  }

  static findOne(req, res) {
      User
          .findOne({ _id: req.params.id })
          .then(user => {
              res.status(200).json(user)
          })
          .catch(err => {
              res.status(500).json(err)
          })
  }

  static findAll(req, res) {
      User
          .find()
          .then(users => {
              res.status(200).json(users)
          })
          .catch(err => {
              res.status(500).json(err)
          })
  }
  }
  
  module.exports = UserController