const Helper = require('../helpers/helper')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        req.decoded = Helper.verifyJWT(req.headers.token)
        User.findOne({ _id: req.decoded._id })
        next()
    } catch (err) {
        res.status(500).json(err)
    }
}