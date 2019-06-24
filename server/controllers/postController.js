const post = require('../models/post')

class postController{
    static findAll(req,res){
        post.find({author: req.decoded._id})
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    }
    static findOne(req,res){
        let id = req.params.id
        post.findById(id)
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
            
    }
    static create(req,res){
        let objInput = {
            title: req.body.title,
            content: req.body.content,
            created_at: new Date(),
            author: req.decoded._id
        }
        post.create(objInput)
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
    }
    static update(req,res){
        let id = req.params.id
        post.findById(id)
            .then(user =>{
                update.created_at = new Date()
                return user.save()
            })
            .then(updated =>{
                res.status(200).json(updated)
            })
            .catch(err=>{
                console.log('error')
                console.log(err)
                res.status(500).json(err)
            })
    }
    static delete(req,res){
        let id = req.params.id
        post.findByIdAndRemove(id)
                .then( deleted => {
                    res.status(200).json(deleted)
                })
                .catch( err => {
                    res.status(404).json({error: err})
                })
    }
}


module.exports = postController