const Article = require('../models/article')

module.exports = function (req, res, next) {
    Article.findById({
            _id: req.params.id
        })
        .then(data => {
            if (data) {
                if (req.decoded.id == String(data.userId)) {
                    next()
                } else {
                    res.status(401).json({
                        msg: "Not Authorized"
                    })
                }
            } else {
                res.status(404).json({
                    msg: "Post Not Found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "Internal Server Error author"
            })
        })
}