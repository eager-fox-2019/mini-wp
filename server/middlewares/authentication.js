const { verify } = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        if (req.headers.hasOwnProperty('token')) {
            console.log('jalan')
            const decode = verify(req.headers.token)
            req.decoded = decode

            User.findOne({
                email: req.decoded.email
            })
                .then(user => {
                    if (user) {
                        next()
                    } else {
                        throw ({
                            status: 401,
                            message: "Unauthorized"
                        })
                    }
                })
                .catch(next)
        } else {
            throw ({
                status: 401,
                message: 'You have to login first'
            })
        }
    }
    catch{
        next
    }
}