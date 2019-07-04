const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('../helpers/nmailer')

class userController {

    static getAll(req, res) {
        res.status(200).json({
            msg: 'masuk'
        })
    }

    static async register(req, res, next) {
        let newUser = new User({
            username: req.body.username,
            picture: req.body.picture,
            email: req.body.email,
            password: req.body.password
        })
        try {
            if (req.body.google) {
                await newUser.save()
                nodemailer(newUser.email)
                userController.login(req, res, next)
            } else {
                let saved = await newUser.save()
                nodemailer(newUser.email)
                res.json(saved)
            }
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                let isValid = bcrypt.compareSync(req.body.password, user.password)
                if (isValid) {
                    let token = jwt.sign({
                        username: user.username,
                        email: user.email,
                        id: user._id
                    }, process.env.JWT_SECRET)
                    res.json({
                        token,
                        email: user.email,
                        id: user._id
                    })
                } else {
                    throw ({
                        code: 401,
                        message: "wrong email/password"
                    })
                }
            } else {
                throw ({
                    code: 404,
                    message: "wrong email/password"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static googleLogin(req, res, next) {
        const {
            OAuth2Client
        } = require('google-auth-library');
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let googleToken = req.body.googleToken

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            console.log(payload)
            User.findOne({
                    email: payload.email
                })
                .then((user) => {
                    if (user) {
                        let token = jwt.sign({
                            username: user.username,
                            email: user.email,
                            id: user._id
                        }, process.env.JWT_SECRET)
                        res.json({
                            token,
                            username: user.username,
                            email: user.email,
                            id: user._id
                        })
                    } else {
                        req.body.email = payload.email
                        req.body.password = "password12345"
                        req.body.username = payload.name
                        req.body.picture = payload.picture
                        req.body.google = true
                        userController.register(req, res, next)
                    }
                })
                .catch(next)
        }
        verify()
            .catch(next);
    }

}

module.exports = userController