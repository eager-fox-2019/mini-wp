const mongoose = require('mongoose')

let conversationSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  userId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
},{ timestamps: true })

let Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation