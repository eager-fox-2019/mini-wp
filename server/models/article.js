const mongoose = require('mongoose')

let Schema = mongoose.Schema

let article = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    desc: {
        type: String,
        // required: [true, 'Description cannot be empty']
    },
    content: {
        type: String,
        required: [true, 'Content cannot be empty']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    img: {
        type: String
    },
    comments: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

let Article = mongoose.model('Article', article)

module.exports = Article