const Model = require('../models');
const {
  verifyPassword,
  generateToken
} = require('../helpers');
const {OAuth2Client} = require('google-auth-library');
client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class User {

  static register(req, res, next) {
    let userObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }

    Model.User.create(userObj)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }

  static login(req, res, next) {
    Model.User.find({
        email: req.body.email
      })
      .then((response) => {
        if (response.length == 0) {
          next({
            code: 401
          })
        } else {
          if (verifyPassword(req.body.password, response[0].password)) {
            res.status(200).json({
              token: generateToken({
                _id: response[0]._id,
                email: response[0].email,
                firstName: response[0].firstName,
                lastName: response[0].lastName
              }),
              user: response[0]
            });
          } else {
            next({
              code: 401
            });
          }
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static oauth(req, res, next) {
    client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(function(ticket){
      const { email, name, picture } = ticket.getPayload();

      // Generate jsonwebtoken for requesting your own endpoints/routes
      res.status(200).json({ email, name, picture });
    })
  }
}

module.exports = User;