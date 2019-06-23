const Article = require('../models/articleModel');
module.exports = function (req, res, next) {
    try {
        // console.log(req.decoded, "ini decoded")
        Article.findById(req.params.id)
            .then((article) => {
                // console.log(req.decoded.id , "===", article.author)
                if (req.decoded.id == article.author) {
                    next()
                } else {
                    next({ status: 400, messages: 'You dont have access' })
                }
            })
            .catch(err => {
                res.status(404).json({ msg: err.message })
            })
    } catch (error) {
        throw 'You dont have access'
    }
} 
