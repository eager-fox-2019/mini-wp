const Article = require('../models/Article')
const jwt = require('../helpers/jwt')


class ArticleController {
    static findAllUser(req,res,next){
    //    let decodeToken = jwt.decode(req.headers.token)
       Article.find({UserId :decodeToken.id })
       .then((foundArticle)=>{
           if(!foundArticle){
               throw ({status : 404, message : "Not Found"})
           } else {
                res.json(foundArticle)
           }
       })
       .catch(next)

    }

    static findAll(req,res,next){
           Article.find().
           populate('UserId')
           .then((foundArticle)=>{
               if(!foundArticle){
                   throw ({status : 404, message : "Not Found"})
               } else {
                    res.json(foundArticle)
               }
           })
           .catch(next)
    
        }

    static findByPk(req,res,next){
        Article.findById(req.params.id)
        .then((foundArticle)=>{
            if(!foundArticle){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundArticle)
            }
        })
        .catch(next)
    }

    static create(req,res,next){
        console.log(req.body, "req body create new article");
        
        let decodeToken = jwt.decode(req.headers.token)
        let newArticle = {
            title: req.body.title,
            image: req.file.cloudStoragePublicUrl,
            content: req.body.content,
            category: req.body.category,
            UserId: decodeToken.id
        }
        console.log(newArticle);
        
        Article.create(newArticle)
        .then((gotData)=>{
            res.json(gotData)
        })
        .catch(next)

    }  
    static delete(req,res,next){
        Article.findByIdAndDelete(req.params.id)
        .then((foundArticle)=>{
            if(!foundArticle){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundArticle)
            }
        })
        .catch(next)

    }
    static update(req,res,next){
        Article.findOne({_id : req.params.id})
        .then((foundArticle)=>{
            if(!foundArticle){
                throw ({code : 404, message : "Not Found"})
            } else {
                    console.log(req.body);
                    
                 foundArticle.set(req.body)
                 return foundArticle.save()
            }
        })
        .then((savedArticle)=>{
            res.json(savedArticle)
        })
        .catch(next)
    }
    static updateDescription(req,res){
    }
}

module.exports = ArticleController