const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username cannot be empty"],
        validate: {
            validator: function () {
                let isUsed = async function checkUsername(v) {
                    let check = await User.findOne({
                        username: v,
                        _id: {
                            $ne: this._id
                        }
                    })
                    if (check) return false
                    else return true
                }
                return isUsed(this.username)
            },
            message: data => `username ${data.value} is already in use`
        }
    },
    picture: String,
    email: {
        type: String,
        required: [true, "email cannot be empty"],
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
            },
            message: data => `${data.value} is not a valid email`
        },
        validate: {
            validator: function () {
                let isUsed = async function checkEmail(v) {
                    let check = await User.findOne({
                        email: v,
                        _id: {
                            $ne: this._id
                        }
                    })
                    if (check) return false
                    else return true
                }
                return isUsed(this.email)
            },
            message: data => `${data.value} is already in use`
        }
    },
    password: String
})

userSchema.pre('save', async function (next) {
    try {
        let exist = await User.findById(this._id)
        if (exist) {
            next()
        } else {
            let salt = bcrypt.genSaltSync(10)
            this.password = bcrypt.hashSync(this.password, salt)
            next()
        }
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User