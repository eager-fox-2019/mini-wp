const Article = require('../Models/Articles')

class articleControllers{
    static create(req, res, next){
        console.log(req.decode.id, 'ini keluar?')
        let dec = req.decode.id
        let {title, content, images} = req.body
        let newArt = new Article({userId : dec ,title, content, created_at : new Date(), author : req.decode.email, images : req.file.cloudStoragePublicUrl})
        Article.create(newArt)
        .then(created => {
            console.log('masuk', created)
            res.status(200).json(created)
        })
        .catch(next)
    }
    static update(req, res, next){
        // let id = req.params.id
        console.log('masuk ke update')
        let msg = 'updated'
        let updated = {}
        if(req.body.title){
            updated.title = req.body.title
        }
        if(req.body.content){
            updated.content = req.body.content
        }
        if(req.body.images){
            updated.images = req.body.images
        }
        console.log(updated, 'ini isi updatenya apa ya?')
        Article.findOneAndUpdate({
            _id : req.params.artId
        }, updated)
        .then(() => {
            res.json(msg)
        })
        .catch(next)
    }
    static deleteArticle(req, res, next){
        console.log('masuk ke delete')
        let msg = 'article has been deleted'
        Article.findOneAndDelete({
            _id : req.params.artId
        })
        .then(() => {
            res.status(200).json(msg)
        })
        .catch(next)
    }
    static show(req, res,next){
        console.log('masuk show')
        Article.find({},{},{
            sort : {
                _id : -1
            }
        })
        .then(foundAll => {
            console.log('show done')
            res.status(200).json(foundAll)
        })
        .catch(next)
    }
    static findAuthor(req, res, next){
        console.log('masuk ke author')
        Article.find({
            author : req.body.authorName
        })
        .then(foundAuthor => {
            res.status(200).json(foundAuthor)
        })
        .catch(next)
    }
    static findOne(req, res, next){
        Article.find({
            userId : req.params.artId
        })
        .then(foundOne => {
            res.status(200).json(foundOne)
        })
        .catch(next)
    }
    static findOneArticle(req, res, next){
        console.log('masuk find one')
        Article.findOne({
            _id : req.params.artId
        })
        .then(found => {
            console.log('ketemu 1 nih', found)
            res.status(200).json(found)
        })
        .catch(next)
    }
}

module.exports = articleControllers