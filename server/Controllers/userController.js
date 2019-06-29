const User = require('../Models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {comparePassword, generateJWT} = require('../Helpers/crypt')

class UserController{
    static create(req, res, next){
        let {email, password} = req.body
        let obj = new User({email, password})
        console.log('halo?')
        obj.save()
        .then(created => {
            console.log('ke save?')
            res.status(200).json(created)
        })
        .catch(next)
    }
    static login(req, res, next){
        console.log('pasti masuk')
        User.findOne({email : req.body.email})
        .then(found => {
            console.log('ketemu 1')
            if(found){
               let checkCompare = comparePassword(req.body.password, found.password)
               console.log(checkCompare, 'apakah true?')
               if(checkCompare){
                   let payload = {
                       email : found.email,
                       id : found.id
                   }
                   let token = generateJWT(payload)
                   res.json({token, payload})
               }else{
                    throw ({status : 401, msg : 'wrong inputs'})
               }
                // bcrypt.compare(req.body.password, found.password, function(err, sucess) {
                //     if(sucess){
                //         console.log('bro')
                //         let payload = {
                //             email : found.email,
                //             id : found.id
                //         }
                //         let token = jwt.sign(payload, process.env.JWT_SECRET)
                //         // console.log(token)
                //         res.json({token, payload})
                //     }else{
                //         console.log('eo')
                //         throw ({status : 401, msg : 'wrong inputs'})
                //     }
                // })
            }else{
                console.log('else luar')
                throw {msg : 'salah uiy'}
            }
        })
        .catch(next)
    }
}

module.exports = UserController