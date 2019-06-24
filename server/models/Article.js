const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLSlugs = require('mongoose-url-slugs')
const articleSchema = new Schema({
    title: String,
    image: String,
    body: String,
    tags: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Date
})
articleSchema.plugin(URLSlugs('title', {
    field: 'slug_url'
}))
const Article = mongoose.model('Article', articleSchema)

module.exports = Article