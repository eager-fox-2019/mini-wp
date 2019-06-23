const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (name) {
                    return new Promise(function (resolve, reject) {
                        Tag.findOne({
                                name
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
                message: props => `${props.value} already exist`
            }
        ]
    },
    articleId: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
},{timestamps:true});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag