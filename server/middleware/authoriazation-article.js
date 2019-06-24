const Article = require("../models/articlemodel.js")
let objectId = require("mongodb").ObjectID;

module.exports = (req, res, next) => {
    req.userData.id

    Article.findById(objectId(req.params.id))
    .exec()
    .then(article => {
        if(article.userId.toString() === req.userData.id) {
            next()
        } else {
            res.status(403).json({
                message: "Permission denied, you aren't the author of this article" 
            })
        }
    })
    .catch(err => {
        res.status(500).json({err})
    })
}