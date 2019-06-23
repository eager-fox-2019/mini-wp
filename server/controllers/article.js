const Article = require('../models/article')

class articleController {
    static findAll(req,res,next) {
        if(req.query.tags){
            Article
                .find({ tags:{ $in:req.query.tags}})
                .populate('userId')
                .then((allArticles) => {
                    res.status(200).json(allArticles)
                })
                .catch(next)
        }
        else{
            Article
                .find({})
                .populate('userId')
                .then((allArticles) => {
                    res.status(200).json(allArticles)
                })
                .catch(next)
        }
    }

    static findAllUser(req, res, next) {
        Article
            .find({ userId: req.user.id })
            .populate('userId')
            .then((allArticles) => { res.status(200).json(allArticles) })
            .catch(next)
    }

    static findOneArticle(req, res, next) {
        Article
            .findOne({ _id: req.params.id})
            .populate('userId')
            .then((findOneArticle) => { res.status(200).json(findOneArticle) })
            .catch(next)
    }

    static createArticle(req, res, next) {
        const { title, content, tags, description} = req.body
        let tagsArray = tags.split(",")
        for(let gvision of req.tags){
            tagsArray.push(gvision)
        }
        let gcsUrl
        if (!req.file) gcsUrl = `https://semantic-ui.com/images/wireframe/image.png`
        else gcsUrl = req.file.gcsUrl
        Article
            .create({
                title,
                content,
                tags:tagsArray,
                image:gcsUrl,
                createdAt: new Date(),
                userId: req.user.id,
                description
            })
            .then((createdArticle) => { res.status(201).json({ message: 'Added a new article!', createdArticle }) })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        const { title, content, tags, description} = req.body
        let gcsUrl
        Article
            .findOne({
                _id:req.params.id
            })
            .then((updatedArticle) => {
                if(req.file){
                    gcsUrl = req.file.gcsUrl
                }
                else{
                    gcsUrl = updatedArticle.image
                }
                return Article.findOneAndUpdate({ _id: req.params.id }, { title, content, image: gcsUrl, tags:tags.split(","), description}, { new: true })
            })
            .then((updatedArticle) => { res.status(200).json({ message: 'Updated article!', updatedArticle }) })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err.message)
            })
    }

    static deleteArticle(req, res, next) {
        Article
            .findOneAndDelete({_id:req.params.id})
            .then((deletedArticle) => { res.status(200).json({ message: 'Deleted article!', deletedArticle }) })
            .catch(next)
    }

    static findAllTag(req,res,next){
        Article
        .find({})
        .populate('userId')
        .then((allArticles) => {
            let tags = []
            for(let article of allArticles){
                for(let tag of article.tags){
                    if(!tags.includes(tag)){
                        tags.push(tag)
                    }
                }
            }
            res.status(200).json(tags)
        })
        .catch(next)
    }
}
module.exports = articleController