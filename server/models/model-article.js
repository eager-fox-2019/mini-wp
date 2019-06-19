'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: String,
  content: String,
  published: Boolean,
  user_id: { type: 'ObjectId', ref: 'User' },
  image_url: String,
}, {timestamps: true});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article