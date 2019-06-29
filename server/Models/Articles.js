var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let articleSchema = new Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'Users'},
    title : String,
    content : String,
    created_at : Date,
    author : String,
    images : String
})

let Article = mongoose.model('Articles', articleSchema)

module.exports = Article