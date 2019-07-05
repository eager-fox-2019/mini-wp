const mongoose = require('mongoose')

let articleSchema = mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    title : String,
    text : String,
    date : Date,
    img : String
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article