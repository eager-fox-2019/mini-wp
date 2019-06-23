const mongoose = require('mongoose')
const { hash } = require('../helpers/bcryptjs')

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name required.`],
  },
  email: { 
    type: String,
    required: [true, 'Email is required.'],
    validate : {
      validator : function(value) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          throw 'Invalid email format'
        }
      },
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
})

userSchema.pre('save', function( next ){
  this.password = hash(this.password)
  next()
})

let User = mongoose.model('User', userSchema)

User.schema.path('email').validate(function (input) {
  return new Promise ((res,rej)=>{
    User.find({ 
      _id : { $ne: this._id },
      email: input 
    })
    .then(data => {
      if(data.length !== 0) {
        rej (false)
      } else {
        res (true)
      }
    })
    .catch(err =>{
      console.log(err)
      rej(err)
    })

  })
}, 'Email already used.')

module.exports = User