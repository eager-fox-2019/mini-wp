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
                    throw ({
                        status: 401,
                        msg: "Unauthorized"
                    })
                }
            } else {
                throw({
                    status: 404,
                    msg: "Post not found"
                })
            }
        })
        .catch(next)
}