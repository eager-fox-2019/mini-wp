const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    validate: [
      {
        validator: function(name) {
          return Tag.findOne({
            name
          })
            .then(result => {
              if (result) {
                return false;
              } else {
                return true;
              }
            })
            .catch(err => {
              return false;
            });
        },
        message: "tag already exist"
      }
    ]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
