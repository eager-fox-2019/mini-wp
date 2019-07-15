let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {
        type: String,
        required : true,
    },
    image: {
        type: String,
        required : true,
    },
    content: {
        type: String,
        required : true,
    },
    category: {
        type: String,
        required : true,
    },
    UserId: {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
},{timestamps:true});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article