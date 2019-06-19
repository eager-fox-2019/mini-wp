const User = require("../models/user.js")
const register = require('../helpers/bcrypt.js');
const jwt  = require('../helpers/jwt.js');

class UserController{
    static register(req,res,next){
        let newUser = {
            email: req.body.email,
            password: req.body.password,
        }
        User.create(newUser)
        .then((result) => {
            res.status(201).json(result)
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
                    res.status(200).json(token)
                } else {
                   throw `Error: wrong email or password!`
                }
            } else {
                throw `Error: wrong email or password!`
            }
        })
        .catch(next)
    }
}

module.exports = UserController