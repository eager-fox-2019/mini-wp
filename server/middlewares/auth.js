const { wrapAsync, givesError,  jwtVerifyToken } = require('../helpers')
const { User,Article } = require('../models')
const functions = {  
    authorize: wrapAsync(async (req, res, next) => {
        let token = jwtVerifyToken(req.headers.token)
        let user = await User.findOne({ _id: token._id })
        if (user) {
            req.user = user
            next()
        }
        else {
            next(givesError(401, 'bad token, no such user'))
        }
    }),
    authorizeOnArticle : wrapAsync(async(req,res,next)=>{
        let article = await Article.findOne({_id:req.params.id,author:req.user._id})        
        if (req.user && article && req.user._id.equals(article.author._id)) {            
            req.article = article
            next()
        }
        else {
            next(givesError(403, 'you are not the owner of this answer'))
        }
    })
}


module.exports = functions
