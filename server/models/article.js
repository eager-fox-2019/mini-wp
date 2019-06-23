const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId}= require('mongodb')

let articleSchema= new Schema({
    title:{
        type: String,
        required: [true, 'Title required']
    },
    content: String,
    thumbnail: String,
    author: {
        type: ObjectId,
        ref: 'User'
    },
    createdAt: Date,
    status: String
})

let Article= mongoose.model('article', articleSchema)

module.exports= Article