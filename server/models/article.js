const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  featuredImg: {
    type: String,
    required: [true, `Feature image required.`],
  },
  content: {
    type: String,
    required: [true, `Feature image required.`],
  },
  tags: [String],
  author : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  postedAt: Date,
  published: Boolean
})

let Article = mongoose.model('article', articleSchema)

module.exports = Article