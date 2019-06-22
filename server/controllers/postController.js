const Post = require('../models/post')

class PostController {
    static create(req, res) {
        let { title, content, tags } = req.body
        tags = tags.split(',')
        Post
            .create({
                title,
                content,
                user: req.decoded._id,
                createdAt: new Date(),
                tags
            })
            .then(post => {
                post.populate('user', err =>{
                    res.status(201).json(post)
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let { title, content, tags } = req.body
        tags = tags.split(',')
        let toChange = { title, content, tags }
        Post
            .findOneAndUpdate(
                { _id: req.params.id },
                toChange,
                { new: true })
            .populate('user')
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(200).json(err)
            })
    }

    static findOne(req, res) {
        Post
            .findOne({ _id: req.params.id })
            .populate('user')
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Post
            .find()
            .populate('user')
            .then(posts => {
                res.status(200).json(posts)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findMine(req, res) {
        Post
            .find({ user: req.decoded._id })
            .populate('user')
            .then(posts => {
                res.status(200).json(posts)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Post
            .findOneAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = PostController