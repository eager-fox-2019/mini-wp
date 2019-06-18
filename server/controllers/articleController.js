const Article = require('../models/article')

class ArticleController {

    static add(req, res){
        let newArt = new Article({
            userId : req.body.userId,
            title : req.body.title,
            text : req.body.text,
            date : req.body.date,
            img : req.body.img
        })

        newArt.save()
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static delete(req, res){
        Article.findByIdAndDelete(req.params.id)
            .then(data => {
                res.json({data, message : 'deleted'})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static update(req, res){
        let { title, text, img, date } = req.body
        let obj = { title, text, img, date}
        Article.findByIdAndUpdate(req.params.id, obj)
            .then(data => {
                res.json({data, message : 'updated'})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static findAll(req, res){
        Article.find({})
            .populate('userId')
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static findByUser(req, res){
        Article.find({
            userId : req.params.userId
        })
            .populate('userId')
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

}

module.exports = ArticleController