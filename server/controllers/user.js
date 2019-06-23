const { OAuth2Client } = require('google-auth-library');
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')

class ControllerUser {
    static login(req, res, next) {
        let { email, password } = req.body
        User
        .findOne({ email })
        .then(user => {
            if (!user) {
                throw({ code : 400, message: 'Username/ password invalid' })
             } else {
                 if (!compare(password, user.password)) {
                    throw({ code : 400, message: 'Username/ password invalid' })
                } else {
                    let token = sign({email: user.email})
                    res.status(200).json({ 
                        token,
                        name : user.name  
                    })
                }
             }
         })
         .catch(next)
    }
    static create (req, res, next) {
        let { email, password, name } = req.body
        User
        .create({
            email,
            password ,
            name
         })
        .then(data => {
            let token = sign({
                email: data.email
            })
            res.status(201).json({ 
                token,
                name : data.name
            })
        })
        .catch(next)
    }
    static loginGoogle(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.idToken,
        })
        .then((ticket) => {
            var payload = ticket.getPayload();
            User.findOne({ email : payload.email })
            .then(user => {
                if(user) {
                    let token = sign({email: user.email})
                    res.status(200).json({
                        token,
                        name : user.name
                    })
                } else {
                    return User.create({
                        email : payload.email,
                        name : payload.name,
                        password : '_googlePass'
                    })
                }
            })
            .then((data) => {
                console.log(data)
                let token = sign({ email: data.email })
                res.status(201).json({
                    token,
                    name : data.name
                })
            })
           
        })
        .catch(next)
    }
}
module.exports = ControllerUser