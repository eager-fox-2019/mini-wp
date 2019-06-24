const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET)
            req.decoded = decoded.payload
            next()
        } catch (err) {
            res.status(401).send({ error: err, message: 'unauthorized access' })
        }
    }
    else {
        res.status(401).send({ message: 'unauthorized access' })
    }
}

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authentication(req, res, next){
    if(req.headers.hasOwnProperty('token')){
        let decode = jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN)
        req.decode = decode
        User.findOne({ email:req.decode.email})
        .then(user=>{
            if(user){
                next()
            }else{
                res.status(404).json('Not Found')
            }
        })
    }else{
        res.status(403).json('Not Authenticated')
    }
    
}

module.exports= authentication