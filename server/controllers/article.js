const Article = require('../models/article')

class ArticleController{
    static showList(req,res,next){
        Article.find(function(err,data){
            if(err){
                next
            }else{
                res.json(data)
            }
        })
    }

    static findByTitle(req,res,next){
        Article.find({title : req.params.title},function(err,data){
            if(err){
                next
            }else{
                res.json(data)
            }
        })
    }

    static create(req,res,next){
        console.log('masuk create');
        
        Article.create({
            title: req.body.title,
            content: req.body.content,
            picture: req.file.cloudStoragePublicUrl,
            user_id: req.decoded.id
        })
        .then(function(newarticle){
            console.log('create');
            
            res.status(201).json(newarticle)
        })
        .catch(next)
    }

    static findOneArticle(req,res,next){
        Article.findById({_id:req.params.articleid}, function(err,data){
            if(err){
                next
            }else{
                res.json(data)
            }
        })
    }
    static update(req,res,next){
        console.log(req.body);
        
        // Article.updateOne({_id: req.params.articleid},
        //     {
        //         title: req.body.title,
        //         content: req.body.content
        //     },function(err,data){
        //         if(err){
        //             next
        //         }else{
        //             res.status(200).json(data)
        //         }
        //     }
        // )
    }


    static delete(req,res,next){
        Article.findByIdAndDelete({_id: req.params.articleid} , function(err,data){
            if(err){
                next
            }else{
                res.json(data)
            }
        })
    }

}

module.exports = ArticleController