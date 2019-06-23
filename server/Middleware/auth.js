const jwt = require('jsonwebtoken')
const User  = require('../Models/userModels')
const Article = require('../Models/Articles')

module.exports = {
    Authentication(req, res, next){
        console.log('masuk auth')
        let theToken = req.headers.token
        console.log('nemu token ga?')
        console.log(req.headers.token, 'ini kah token')
        //kalo eroorr disini. kalo tojken gaada, error
        console.log(theToken, 'token?')
        //else
        if(!theToken){
            console.log(theToken, 'to kren')
            res.json({code : 401 , msg : 'you have to login first'})
        }else{
            console.log('masuk sini ga?')
            try {
                let decode = jwt.verify(theToken, process.env.JWT_SECRET)
                // req.decode = decode
                // next()
                User.findOne({
                    email : decode.email
                })
                .then(found => {
                    if(found){
                        console.log('ini found', decode)
                        req.decode = decode
                        next()
                    }else{
                        throw({status : 404, msg : 'user not found'})
                    }
                })
                .catch(next)

            }catch(err) {
                res.json({code : 401 , msg : 'invalid token'})
            }
        }
    },
    Authorization(req, res, next){
        console.log('masuk ke auhor')
        console.log(req.params.artId, 'apa ni?')
        Article.findOne({
            userId : req.params.userId
        })
        .then(found => {
            console.log(req.params.artId, 'params')
            console.log('masuk authorizationg?', found)
            if(!found){
                console.log('not found')
                throw ({code : 404 , msg : 'resource not found'})
            }else{
                if(found.userId == req.decode.id){
                    console.log('sampai')
                    next()
                }else{
                    console.log('tidak sammpai')
                    throw ({code : 401 , msg : 'not authorized'})   
                }
            }
        })
        .catch(next)
    }
}
  