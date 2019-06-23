const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    content: {
        type: String,
        required: [true, 'Content is Required']
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    featured_image: {
        type: String
    },
    tags: [{
        type: String
    }]
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
