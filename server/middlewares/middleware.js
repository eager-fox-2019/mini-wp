const Helper = require('../helpers/helper')
const Article = require('../models/article')
const User = require('../models/user')

module.exports = {
    authenticate : (req, res, next) => {
        try {
            console.log(req.headers.access_token, 'ini token di middleware')
            const decoded = Helper.verifyJWT(req.headers.access_token);

            req.loggedUser = decoded

            console.log(req.loggedUser)

            User.findById(req.loggedUser.id)
                .then(user => {
                    if(user){
                        next()
                    } else {
                        res.status(401).json({ msg : 'not authorized'})
                    }
                })
            
            
        } catch (err) {
            res.status(500).json(err)
        }

    },
    authorize : (req, res, next) => {
        Article.findById(req.params.id)
            .populate('userId')
            .then(data => {
                if(req.loggedUser.id === data.userId._id){
                    next()
                } else {
                    res.status(401).json({ msg : 'not authorized'})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
        
    }
}