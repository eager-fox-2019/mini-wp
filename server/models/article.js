const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true })

const Article = new mongoose.model('Article', articleSchema)

module.exports = Article