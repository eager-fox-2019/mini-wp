let { verify } = require('../helpers/jwt.helper')

module.exports = ({ allowUnauthorized} = {}) => {
    return (req, res, next) => {
        let token = req.headers.token
        if (token) {
            try {
                let payload = verify(token)
                req.user = payload.user
                next()
            } catch (err) {
                console.log('auth middleware error', err)
                next((allowUnauthorized)? null : { err: 400, msg: 'invalid token' })
            }
        } else {
            next((allowUnauthorized) ? null : { err: 400, msg: 'token must be provided' })
        }
    }
}