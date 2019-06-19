const jwt = require('../helpers/jwt.js')
const User = require('../models/user.js')
// const Todo = require("../Models/Todo.js")

module.exports = {
  Authentication: function (req, res, next){
    let token = req.headers.token
    if(!token){
        throw {
            code: 401,
            message: 'You must login to access this endpoint'
        }
    } else {
        let decoded = jwt.verify(token)
        User.findOne({
            email: decoded.email})
        .then((user) => {
            if (user){
                req.decoded = decoded
                next()
            } else {
                throw {
                    code: 401,
                    message: 'User is not valid'
                }
            }
        })
        .catch(next)  
    }
},
  Authorization: function (req, res, next){
    let id = req.params.id
    Todo.findById(id)
    .then((result) => {
        if (result.UserId == req.decoded.id){
            next()
        } else {
            throw {
                code: 401,
                message: 'Forbidden'
            }
        }
    })
    .catch(next)
  }
}
