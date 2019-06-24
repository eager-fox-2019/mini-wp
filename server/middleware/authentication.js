const jwt = require("jsonwebtoken")
const User = require("../models/usermodel.js")

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        User.find({email: decoded.email})
        .then(users => {
            if(users.length > 0) {
                req.userData = decoded;
                next()
            }
            else {
                res.status(401).json({
                    message: "Username / password is wrong"
                })
            }
        })
    }
    catch (err) {
        res.status(401).json({
            message: "Username / password is wrong"
        });
    }
}