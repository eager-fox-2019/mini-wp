const { Conversation } = require('../models')

class ControllerConversation {
    static create (req, res, next) {
        let userId = req.user._id
        let message = { ...req.body, ...{ userId } }
        Conversation.create(message)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
    static findAll (req, res, next ){
        Conversation.find()
        .populate('userId')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}
module.exports = ControllerConversation