const mongoose = require("mongoose");
const { hash } = require("../helpers/bcrypt");

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Require Name user. "]
  },
  password: {
    type: String,
    required: [true, "Password Required. "]
  },
  email: {
    type: String,
    required: [true, " Email required. "],
    validate: [
      {
        validator: function(value) {
          if (
            !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
              value
            )
          ) {
            throw `Invalid format email. `;
          }
        },
        validator: function(value) {
          return new Promise(function(res, rej) {
            User.findOne({
              email: value
            })
              .then(found => {
                if (found) {
                  res(false);
                } else {
                  res(true);
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        },
        message: `Email has been Used. `
      }
    ]
  }
});

userSchema.pre("save", function(next) {
  this.password = hash(this.password);
  next();
});

let User = mongoose.model("User", userSchema);

module.exports = User;
