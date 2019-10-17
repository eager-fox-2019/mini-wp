const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;
const Helper = require('../helpers/helper')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        User.findOne({
                                email
                            })
                            .then(data => {
                                if (data === null) {
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    });
                },
                message: props => `${props.value} already`
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password min length is 4'],
    }
}, {timestamps: true});

userSchema.pre('save', function(next, done) {
    this.password = Helper.hashPassword(this.password)
    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User