const Article = require("../models/Article")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class articleController {
    static async create(req, res, next) {
        if (req.body.slug_url) {
            this.updateArticle(req, res, next)
        } else {
            let {
                title,
                image,
                body,
                tags,
            } = req.body

            let newArticle = new Article({
                title,
                image,
                body,
                tags,
                author: req.loggedUser.id,
                createdAt: new Date()
            })
            try {
                let saved = await newArticle.save()
                res.json(saved)
            } catch (error) {
                next(error)
            }
        }
    }

    static async search(req, res, next) {
        console.log(req.query);
        let searchTitle = new RegExp(req.query.title, "i")
        console.log(searchTitle);
        try {
            let bytitle = await Article.find({
                title: searchTitle
            })
            let bytag = await Article.find({
                tags: searchTitle
            })
            let obj = {
                result_title: bytitle,
                result_tag: bytag
            }
            res.json(obj)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        let article = await Article.findOne({
            slug_url: req.body.slug_url
        })
        article.title = req.body.title
        article.image = req.body.image
        article.body = req.body.body
        article.tags = req.body.tags
        res.json(await article.save())
    }

    static async getOne(req, res, next) {
        try {
            console.log(req.params);
            let article = await Article.findOne({
                slug_url: req.params.title
            }).populate('author')
            res.json(article)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            let articles = await Article.find({}).populate('author')
            res.json(articles)
        } catch (error) {
            next(error)
        }
    }

    static async getUserArticle(req, res, next) {
        try {
            let articles = await Article.find({
                author: req.loggedUser.id
            })
            res.json(articles)
        } catch (error) {
            next(error)
        }
    }

    static async getAllTags(req, res, next) {
        try {
            console.log('masuk');
            let articles = await Article.find({})
            // console.log(articles.length);
            // console.log(articles);
            let tags = []
            for (let article of articles) {
                for (let tag of article.tags) {
                    if (!tags.includes(tag)) {
                        tags.push(tag)
                    }
                }
            }
            // console.log(tags, 'xxxxxxxxxxx');
            res.json(tags)
        } catch (error) {
            next(error)
        }
    }

    static async deleteOne(req, res, next) {
        try {
            res.status(201).json(await Article.findByIdAndDelete(req.params.id))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = articleController