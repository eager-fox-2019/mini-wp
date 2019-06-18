const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  created_at: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imageName: String,
  imageUrl: String,
});

module.exports = mongoose.model('Article', articleSchema);