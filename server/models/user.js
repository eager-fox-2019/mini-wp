const mongoose = require('mongoose');
const Schema = mongoose.Schema
const encrypt = require("../helpers/encrypt")


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is empty"],
        unique: [true, "username is already taken"]
    },
    password: {
        type: String,
        required: [true, "password is empty"]
    },
    email: {
        type: String,
        required: [true, "email is empty"],
        unique: [true, "email is already taken"]
    }
})

userSchema.pre("save", function(next){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(this.email)){
        this.password = encrypt(this.password)
        next()
    }else{
        throw new Error("Invalid email input")
    }
})

module.exports = mongoose.model("User", userSchema)