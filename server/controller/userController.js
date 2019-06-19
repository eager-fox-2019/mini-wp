const userM = require('../models/userModel')
const { compare } =require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

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

                        let token = jwt.sign({
                            id : foundUser._id,
                            email : foundUser.email,
                            username : foundUser.userName
                        },process.env.JWT_SECRET)
                        res.json({token})
                    }
                    else {
                        res.send('password berbeda')
                    }
                }
                else {
                    throw `Error password or Username`
                }
            })
            .catch(next)
    }

    static loginGoogle (req,res,next) {
        console.log ('loginGoogle')
        res.send ('loginbGoogle')
    }
}

module.exports = UserController