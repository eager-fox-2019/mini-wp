const { verify } = require('../helpers/jwt')
const Article = require('../models/article')

module.exports = (req, res, next) => {
    let accessToken = verify(req.headers["access-token"])
    Article
        .findOne({ _id: req.params.id })
        .then((findOneArticle) => {
            if (String(findOneArticle.userId) == accessToken.id) {
                next()
            }
            else {
                res.status(401).json(
                { type: 'AUTHORIZATION ERROR', 
                message: 'You do not have access!' }
                )
            }
        })
}