const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
    title :String,
    content :String,
    cretedAt :Date,
    author : String,
    feturedImage : String
})

let Article = mongoose.model('Article',articleSchema)

module.exports = Article