const Article = require('../models/article')
const Tag = require('../models/tag')

class ArticleController {
    static find(req, res) {
        const query = req.query ? req.query.q : ''

        Article.find({'title': new RegExp(query, 'i')})
        .populate('userId', 'name')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static findAllByOwner(req, res) {
        Article.find({userId:req.headers.id})
        .populate('userId', 'name')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static findOne(req, res) {
        Article.findById(req.params.id)
        .populate('userId')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static create(req, res) {
        const { title, content, tags } = req.body        
        const featured_image = req.file ? req.file.cloudStoragePublicUrl : ''

        let userId = req.decoded.id
        let parseTags = []
        let newArticle = {}

        JSON.parse(tags).forEach(tag => {
            parseTags.push(tag.toLowerCase())
        })

        Article.create({
            title,
            content,
            featured_image,
            tags: parseTags,
            userId
        })
        .then(article => {
            newArticle = article

            if( parseTags.length > 0 ) {
                parseTags.forEach((tag) => {
                    tag = tag.toLowerCase()
                    Tag
                    .findOne({name: tag})
                    .then(tagFind=> {
                        if(!tagFind) {
                            return Tag
                            .create({
                                name:tag,
                                articleId: [newArticle._id]
                            })
                        }else{
                            return Tag
                            .findByIdAndUpdate(tagFind._id,{ "$push": { "articleId": newArticle._id } }, { "new": true, "upsert": true })
                        }
                    })
                    .then(tagged => {
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                })
            }

        })
        .then(ress=> {
            res.status(201).json(newArticle)
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
        
    }

    static update(req,res) {
        let obj = {}
        for(let key in req.body) {
            if(key==='tags') {
                obj.tags=[]
                JSON.parse(req.body[key]).forEach(e=> {
                    obj.tags.push(e)
                })
            }else {
                obj[key] = req.body[key]
            }
        }

        if(req.file) {
            obj.featured_image=req.file.cloudStoragePublicUrl
        }
                
        Article.findOneAndUpdate({_id: req.params.id}, obj, {new:true})
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Article.findByIdAndDelete({_id: req.params.id})
        .then(deletedArticle => {
            if(deletedArticle) {
                res.status(200).json(deletedArticle)
            }else{
                res.status(400).json({err: 'Article not found'})
            }
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }
}

module.exports = ArticleController
