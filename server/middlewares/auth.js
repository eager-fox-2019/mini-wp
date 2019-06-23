const jwt = require('../helpers/jwt.js')
const User = require('../models/user.js')
const Article = require("../models/article.js")
const { OAuth2Client } = require('google-auth-library');
const { noToken, invalid, notAuth, forbidden } = require('../helpers/error.js');

module.exports = {
  Authentication: function (req, res, next){
    let token = req.headers.token
    if(!token){
        throw {
            code: 401,
            message: noToken
        }
    } else {
        try {
            let decoded = jwt.verify(token)
            User.findOne({
                email: decoded.email
            })
            .then((user) => {
                if (user){
                    req.decoded = decoded
                    next()
                } else {
                    throw {
                        code: 401,
                        message: invalid
                    }
                }
            })
            .catch(next)
        } catch (err) {
            throw {
                code: 401,
                message: notAuth
            }
        }  
    }
},
  Authorization: function (req, res, next){
      console.log('@masuk')
    let id = req.params.id
    Article.findById(id)
    .then((result) => {
        if (result.UserId.toString() == req.decoded.id){
            console.log('authorized')
            next()
        } else {
            throw {
                code: 401,
                message: forbidden
            }
        }
    })
    .catch(next)
  },
  GoogleAuth: function (req, res, next){
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let googleToken = req.body.googleToken
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        req.payload = ticket.getPayload();
        next()
      }
      verify()
      .catch(next);
  }
}
