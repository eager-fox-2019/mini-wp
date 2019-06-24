const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const post = require('../models/post')

module.exports = function (req, res, next) {
    let id = req.decoded._id
    let postId = req.params.id
    post.findById(postId)
        .then(response => {
            if (response.author.equals(id)) {
                next()
            } else {
                res.status(400).json('not authorized')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
}