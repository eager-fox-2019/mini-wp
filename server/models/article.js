const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  created_at: Date,
  tags: Array,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  imageName: {
    type: String,
    default: null,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Article', articleSchema);