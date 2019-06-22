const articleM = require('../models/articleModel')

class articleController{
    static create (req,res,next) {
        // console.log ('create')
        let createArticle = {
            title :req.body.title,
            content :req.body.content,
            cretedAt : Date(),
            author : req.body.author,
            feturedImage : req.body.featuredImage
        }
        
        articleM.create(createArticle)
            .then (created=> {
                // console.log (created)
                res.json(created)
            })
    }
    static findAll (req,res,next) {
        // console.log('findall');
        articleM.find()
            .then(allData=> {
                // console.log(allData)
                res.json(allData)
            })
            .catch(err=> {
                // console.log(err)
                res.json(err)
            })
    }
    static findUsers(req,res,next) {
        // console.log('findusers');
        articleM.find({
            author : req.body.author
        })
            .then(usersArticle=> {
                // console.log(usersArticle)
                res.json(usersArticle)
            })
            .catch(err=> {
                // console.log(err)
                res.json(err)
            })
        
    }
    static findOne (req,res,next) {
        // console.log('findOne');
        let id = req.body._id
        articleM.findById(id)
            .then(article => {
                // console.log (article)
                res.json(article)
            })
            .catch(err=> {
                // console.log(err)
                res.json(err)
            })
        
    }
    static update (req,res,next) {
        // console.log('update');
        let update = {}
        let id = req.body._id
        if (req.body.title) {
            update.title = req.body.title
        }
        if (req.body.content) {
            update.content = req.body.content
        }
        if(req.body.featuredImage) {
            update.featuredImage = req.body.featuredImage
        }
        // console.log(update)
        // console.log(id)
        articleM.findByIdAndUpdate(id,update, {new:true})
            .then(success=> {
                // console.log (success)
                res.json(success)
            })
            .catch(err=> {
                // console.log(err)
                res.json(err)
            })
    }
    static delete(req,res,next) {
        // console.log('delete');
        let id = req.params.id

        articleM.findByIdAndDelete(id)
            .then(deleted=>{
                // console.log(deleted)
                res.json(deleted)
            })
            .then(err=> {
                // console.log(err)
                res.json(err)
            })
    }
}

module.exports = articleController