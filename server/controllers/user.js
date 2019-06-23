const User= require('../models/user')
const {generateToken}= require('../helpers/jwt')
const {compare}= require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController{

   static register(req, res, next){
        let newUser= new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        
        newUser.save()
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(next)
    }

    static login(req, res, next){
        console.log('masuk login controller')
        User.findOne({email: req.body.email})
        .then(user=>{
            console.log(user)
            if(user){
                if(compare(req.body.password, user.password)){
                    let payload= {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }

                    let token= generateToken(payload)

                    res.status(200).json({
                        token,
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    })
                }else{
                    throw {code: 404, message: 'Wrong Email/Password'}
                }
            }else{
                throw {code: 404, message: 'Wrong Email/Password'}
            }
        })
        .catch(next)
    }
    
    static loginGoogle(req, res, next){
        console.log('masuk login google controller', req.body.idToken)
        client
        .verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        .then(function(ticket){
            console.log(ticket)
            const { email, name } = ticket.getPayload()

            let password= name+'saywords'
            let fullname= name.split(' ')
            console.log(fullname,'fullname')
            let newUser= new User({
                firstName: fullname[0],
                lastName: fullname.slice(1).join(''),
                email: email,
                password: password
            })

            User.findOne({email: email})
            .then(user=>{
                if(user){
                    console.log(user)
                    let payload= {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }

                    let token = generateToken(payload)
                    res.status(200).json({
                        token,
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    })

                }else{
                    User.create(newUser)
                    .then(user=>{
                        let payload= {
                            id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
    

                        let token = generateToken(payload)

                        res.status(200).json({
                            token,
                            userId: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName
                        })
                    })
                    .catch(next)  
                }
            })
            .catch(next)
        })
        .catch(next)
    }
}

module.exports= userController


 