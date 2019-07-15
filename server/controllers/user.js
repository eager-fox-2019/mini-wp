const User = require("../models/user.js")
const register = require('../helpers/bcrypt.js')
const jwt  = require('../helpers/jwt.js')
const getPassword  = require('../helpers/random-password.js')
const { login } = require('../helpers/error.js');

class UserController{
    static register(req,res,next){
        let google = req.params.google
        let newUser = {
            email: req.body.email,
            password: req.body.password,
        }
        User.create(newUser)
        .then((result) => {
            if (google){
                UserController.signin(req,res,next)
            } else {
                res.status(201).json(result)
            }
        })
        .catch(next)
    }
    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            email: email
        })
        .then((result) => {
            if (result){
                let check = register.checkPassword(password, result.password)
                if (check == true){
                    let userSign = {
                        id: result._id,
                        email: result.email
                    }
                    let temp = jwt.sign(userSign)
                    let token = {
                        token: temp
                    }
                    console.log(token)
                    res.status(200).json(token)
                } else {
                    throw {
                        code: 404, 
                        message: login
                    }
                }
            } else {
                throw {
                    code: 404, 
                    message: login
                }
            }
        })
        .catch(next)
    }
    static googleSignin(req,res,next){
        let payload = req.payload
        User.findOne({
            email: payload.email
        })
        .then((result) => {
            if (result){
                let googleSign = {
                    id: result._id,
                    email: result.email,
                }
                let temp = jwt.sign(googleSign)
                let token = {
                    token: temp
                }
                res.status(200).json(token)
            } else {
                req.body.email = payload.email
                req.body.password = getPassword()
                req.params.google = true
                UserController.register(req,res,next)
            }
        })
        .catch(next)
    }
}

module.exports = UserController