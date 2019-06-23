const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ModelSchema = new Schema({
    title: String,
    content: String,
    createdAt: Date,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    } 
});

ModelSchema.pre('save', function (next) {
    this.createdAt = new Date()
    next()
});

const Model = mongoose.model('Article', ModelSchema)
module.exports = Model