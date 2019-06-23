const userM = require('../models/userModel')
const { compare } =require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const { sign, verify } = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        let newUser = {
            userName : req.body.username,
            password : req.body.password,
            email : req.body.email
        }

        userM.create(newUser)
            .then(newUserCreated => {
                console.log (newUserCreated)
                res.json(newUserCreated)
            })
            .catch(next)
    }

    static login (req,res,next) {
        let loginUser = {
            email : req.body.email,
            password : req.body.password
        }
        
        userM.findOne({
            email : loginUser.email
        })
            .then (foundUser=> {
                if (foundUser){
                    if (compare(loginUser.password,foundUser.password) ){

                        let token = sign({
                            id : foundUser._id,
                            email : foundUser.email,
                            username : foundUser.userName
                        })
                        res.status(200)
                            .json({ token })
                    }
                    else {
                        throw({
                            code :404,
                            message : 'Invalid username / password. '
                        })
                    }
                }
                else {
                    throw ({
                        code : 404,
                        message : 'Invalid username / password. '
                    })
                }
            })
            .catch(next)
    }

    static loginGoogle (req,res,next) {
        console.log ('loginGoogle')
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken : req.body.id_token
        }) 
            .then(ticket=> {
                const payload = ticket.getPayload()
                return userM.findOne({
                    email : payload.email
                })
                    .then(found=> {
                        if(found) {
                            let token = sign({
                                id : found._id,
                                email : found.email,
                                username : found.userName
                            })
                            res.status(200)
                                .json({ token })
                        }
                        else {
                            req.body.userName = payload.name
                            req.body.email = payload.email
                            req.body.password = '123456'
                            this.register(req,res,next)
                        }
                    })
                    .catch(err=>{
                        res.status(500)
                            .json({message : 'Internal server Error. '})
                    })
            })
    }
}

module.exports = UserController