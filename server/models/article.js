const mongoose = require('mongoose')

let Schema = mongoose.Schema
const articleSchema = new Schema({
    title: String,
    content: String,
    picture: String,
    user_id: String
},{timestamps : true})


const Article = mongoose.model('Article',articleSchema)

module.exports = Article