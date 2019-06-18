const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: String,
    picture: String,
    content: String,
    rawHTML: String,
    likedby: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
