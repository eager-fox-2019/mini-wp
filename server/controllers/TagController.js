const Tag = require('../models/tag')

class TagController{
    static list(req, res) {
        const limit = req.query.limit ? req.query.limit : ''

        Tag
        .find()
        .limit(Number(limit))
        .then(tags => {
            res.status(200).json(tags)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findByName(req, res) {
        if(req.query.q) {
            Tag
            .find({name: req.query.q})
            .populate({path : 'articleId', populate : {path : 'userId'}})
            .then(tags=> {
                res.status(200).json(tags)
            })
            .catch(err => {
                res.status(500).json(err)
            })

        }else{
            Tag
            .find()
            .populate({path : 'articleId', populate : {path : 'userId'}})
            .then(tags=> {
                res.status(200).json(tags)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        }

    }

    static create(req, res) {
        const {name} = req.body

        Tag
        .create(name)
        .then(tags => {
            res.status(201).json(tags)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
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
                
        Tag.findOneAndUpdate({_id: req.params.id}, obj, {new:true})
        .then(tag => {
            res.status(200).json(tag)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Tag.findByIdAndDelete({_id: req.params.id})
        .then(deletedTag => {
            if(deletedTag) {
                res.status(200).json(deletedTag)
            }else{
                res.status(400).json({err: 'Tag not found'})
            }
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }
}

module.exports = TagController
