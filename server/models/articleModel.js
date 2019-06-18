const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Required']
    },
    content: String,
    imgUrl: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article