const Post = require('../models/post');

module.exports = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.user.toString() === req.decoded._id.toString()) {
                next()
            }
            else {
                res.status(403).json({ err: "Forbidden" })
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
}