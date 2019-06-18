const mongoose = require('mongoose')

const {Schema} = mongoose
const articleSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User'},
    title : String,
    content: String,
    created_at: Date,
})
const Article = mongoose.model('article', articleSchema)
module.exports = Article