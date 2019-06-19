const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "title cannot be empty"]
    },
    imgSrc:{
        type: String,
    },
    content:{
        type: String,
        required: [true, "content cannot be emptyu"]
    },
    createdAt:{
        type: Date,
        required: true
    },
    author:{type: ObjectId, ref: "User"}
})

module.exports = mongoose.model("Article", articleSchema)