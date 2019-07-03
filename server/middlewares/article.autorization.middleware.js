const Article = require('../models/article')

module.exports = async (req, res, next) => {
    let user = req.user
    let {id} = req.params
    if (user) {
        try {
            let article = await Article.find({user, _id:id}).exec() 
            if (article){
                next() 
            } else {
                next({code: 401, msg:'not authorized'})
            }
        } catch(err) {
            next({err: 500, msg: err.message})
        }
    } else {
        next({ err: 401, msg: 'must login' })
    }
}