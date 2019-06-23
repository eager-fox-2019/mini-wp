const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  content: String,
}, { timestamps: true })

const Article = new mongoose.model('Article', articleSchema)

module.exports = Article