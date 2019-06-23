const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  content: {
    type: String,
    required: [true, `Content required.`],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  featuredImage: {
    type: String,
  },
  tags: [String]
}, { timestamps: true })

let Article = mongoose.model('Article', articleSchema)

module.exports = Article