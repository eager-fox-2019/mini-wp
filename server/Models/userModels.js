var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

let userSchema = new Schema({
    email : {
        type: String,
        validate: [{
          validator: function(value) {
            var re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        
            return re.test(value.toLowerCase())
          },
          message: props => `${props.value} is not a valid email` 
        },{
          validator: function(value) {
            return User.findOne({ email: value })
              .then((user) => {
                if (user) resolve(true)
              })
          },
          message: props => `${props.value} is already in our database. Please use other email`
        }]
      },
    password : String
})

userSchema.pre('save', function(next){
    console.log('shit!')
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

let User = mongoose.model('Users', userSchema)

module.exports = User