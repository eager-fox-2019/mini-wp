const veritfy = require('jsonwebtoken')

module.exports = {
    authentication : function (req,res,next) {
        
        let token = req.headers.token
        if (token) {
            let decode = verify(token);

            userM.findOne({
                email : decode.email
            })
                .then(found=> {
                    if (found) {
                        req.logedUser = decode
                        req.user = found
                        next()
                    }
                    else {
                        throw ({code : 401, message : `Unauthenticated`})
                    }
                })
                .catch(next)
        }
        else {
            throw ({code : 401, message : `Unauthenticated. `})
        }
    },
    authorization : function(req,res,next) {
        let userId = req.logedUser.id
        imageM.findById(req.params.id)
            .then(data => {
                if(data && userId === data.userId){
                    next()
                }else{
                    throw({
                        code: 401,
                        message: "Unauthorized"
                    })
                }
            })
            .catch(next)
    }
}