const Article = require('../models/article')
const mongoose = require('mongoose')

class ArticleController { 
    static async create(req, res, next) {
        let user = req.user
        let {title, content } = req.body

        try {
            if (req.file && req.file.gcsUrl) {
                let image = req.file.gcsUrl
                let article = await Article.create({
                    title,
                    content,
                    user,
                    image,
                })
                let { _id } = article
                res.json({ _id, title, content, user })
            } else {
                next({code:400, msg: 'featured image is required'})
            }
        } catch(err) {
            console.log('article create error', err)
            next({code: 400, msg: err.message})
        }
    }

    static async list(req, res, next) {
        let user = req.user
        try {
            let queryResult = await Article.find({user}).exec()
            res.json(queryResult)
        } catch(err) {
            console.log('article list error', err)
            next(err)
        }
    }

    static async detail(req, res, next) {
        let { id } = req.params
        let user = req.user
        try {
            let article = await Article.findOne({_id: id, user}).exec()
            if (article) {
                res.json(article)
            } else {
                next(err)
            }
        } catch(err) {
            console.log('article detail error')
            next(err)
        }
    }

    static async update(req, res, next) {
        let id = req.params.id
        let { title, content } = req.body
        let user = req.user
        try {
            let article = await Article.findOne({ _id: id, user }).exec()
            if (article) {
                if (title) article.title = title
                if (content) article.content = content
                if (req.file && req.file.gcsUrl) article.image = req.file.gcsUrl
                await article.save()
                res.json(article)
            } else {
                next({code: 400, msg: 'id not found'})
            }
        } catch (err) {
            console.log('todo detail error', err)
            next(err)
        }
    }

    static async delete(req, res, next) {
        let {id} = req.params
        let user = req.user
        try {
            let todo = await Article.deleteOne({_id: id, user}).exec()
            res.json(todo)
        } catch(err) {
            console.log('todo delete error', err)
            next(err)
        }

    }
}

module.exports = ArticleController