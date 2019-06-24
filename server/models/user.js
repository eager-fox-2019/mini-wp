const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose
const UserSchema = new Schema({
    name:String,
    password:String,
    email:String
})

UserSchema.pre('save', function(next){
    let user = this
    let salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    next()
})
const User = mongoose.model('User', UserSchema)
module.exports = User