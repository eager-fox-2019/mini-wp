const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    content: String,
    created_at: Date,
    image: {
        type: String,
        required: [ true, 'Image is required' ],
    },
    tag: [String],
    UserId: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;