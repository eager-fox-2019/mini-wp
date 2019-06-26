const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type:String,
        required:[true,'the field is required']
    },
    description:{
        type:String
    },
    content:{
        type:String,
        required:[true,'the field is required']
    },
    image:{
        type:String
    },
    createdAt:{ type: Date, default: Date.now, timestamps: true},
    tags:[{type:String}],
    userId:{
        type:Schema.Types.ObjectId, ref:'User'
    },
})

const Article = mongoose.model('Article',articleSchema)
module.exports = Article