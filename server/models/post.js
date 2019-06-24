const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    image: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    tags: []
  })


const Post = mongoose.model('Post', PostSchema)

module.exports = Post