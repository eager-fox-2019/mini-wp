const Article = require('../models/article')

function authorization(req, res, next) {
    Article.findByPk(req.params.id)
        .then((data) => {
            if (data.user_id == req.decode.id) {
                next()
            }
        })
        .catch(() => {
            res.send(401).json({
                message: " you are not authorized"
            })
        })
}

module.exports = { authorization }