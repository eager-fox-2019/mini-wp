const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  title: String,
  content: String
},
{
  timestamps: true
});

let articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;