const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [40, 'Title max. 40 characters !!!']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  image_url: String,
  published: {
    type:Boolean,
    default: false
  },
  starred: {
    type:Boolean,
    default: false
  },
  tags: [String]
},{ timestamps: true })

let Post = mongoose.model('Post', postSchema)

module.exports = Post