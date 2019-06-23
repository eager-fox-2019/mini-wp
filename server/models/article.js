const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

let articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;