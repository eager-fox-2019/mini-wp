const mongoose = require('mongoose')

const {Schema} = mongoose
const articleSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User'},
    img : String,
    title : String,
    content: String,
    created_at: Date,
    tags: [{type: String}]
})
const Article = mongoose.model('article', articleSchema)
module.exports = Article