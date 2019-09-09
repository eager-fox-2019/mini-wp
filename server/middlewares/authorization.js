const Article= require('../models/article')

function authorization(req, res, next){
    console.log('masuk authorize')
    Article.findById(req.params.id)
    .then(article=>{
        if(!article){
            res.status(404).json('Not found')
        }else{
            if(req.decode.id == article.author){
                next()
            }else{
                res.status(403).json('Not Authorized')
            }
        }
    })
    .catch(next)
}

module.exports= authorization