const Article = require('../models/article')
const mongoose = require('mongoose')

class ArticleController { 
    static async create(req, res, next) {
        let user = req.user
        let {title, content } = req.body
        try {
            let article = await Article.create({ 
                title, 
                content, 
            })
            let {_id} = article
            res.json({_id, title, content, user })
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
            let todo = await Article.findOne({ _id: id, user }).exec()
            if (todo) {
                if (title) todo.title = title
                if (content) todo.content = content
                await todo.save()
                res.json(todo)
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