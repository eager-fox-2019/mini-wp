const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
	title: {
		type: String,
		default: "no title"
	},
	content: {
		type: String,
		default: "no content"
	},
	status: {
		type: String,
		default: "draft"
	},
	created_at: {
		type: String,
		default: (new Date()).toDateString()
	},
	owner: { 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	}
});

const Article = mongoose.model('Article',articleSchema)

module.exports = Article