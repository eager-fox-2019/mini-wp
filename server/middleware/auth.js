const jwt = require('jsonwebtoken')
const Article = require('../models/Article')

function Authenticate(req, res, next) {
    try {
        if (req.headers.hasOwnProperty('token')) {
            const decode = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            req.loggedUser = decode
            next()
        } else {
            throw ({
                code: 401,
                message: "you have to login first"
            })
        }
    } catch (error) {
        next(error)
    }
}

async function Authorize(req, res, next) {
    console.log('masuk');
    try {
        let result = await Article.findById(req.params.id)
        if (result) {
            console.log(result.title);
            console.log(result.author);
            console.log(req.loggedUser);
            if (result.author == req.loggedUser.id) {
                next()
            } else {
                throw ({
                    code: 401,
                    message: "not authorized"
                })
            }
        } else {
            throw ({
                code: 404,
                message: "project not found"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    Authenticate,
    Authorize
}