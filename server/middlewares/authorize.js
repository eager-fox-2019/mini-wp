const Article = require('../models/article')

module.exports = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')) {
        Article.findById(req.params.id)
        .then((article) => {
            if(article) {
                if(article.userId.toString() == req.decoded.id) {
                    next()  
                }else{
                    res.status(403).json({ err: 'Not authorize' });
                }
            }
        })
        .catch(err => {
            res.status(500).json({'msg': 'Request error'})
        })
    }else {
        res.status(403).json({'err': 'Not authorize'})
    }
}