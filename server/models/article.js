const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { toProperCase } = require("../helpers/addition");

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
    status : String,
    postedAt : Date,
    likedby: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
  },
  { timestamps: true }
);

ArticleSchema.pre("save", function(next) {
  this.title = toProperCase(this.title);
  next();
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
