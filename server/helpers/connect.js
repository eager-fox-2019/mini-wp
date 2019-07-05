const mongoose = require('mongoose')
const dbName = "miniWP"
// const url = 'mongodb://localhost:27017/' + dbName
const mongoAtlasPass = process.env.MONGO_PASS
const url= 'mongodb+srv://dbStefKwan:'+mongoAtlasPass+'@clusterhacktiv-9vqzv.gcp.mongodb.net/'+dbName+'?retryWrites=true&w=majority'

function connect() {
	return new Promise ((resolve, reject) => {

		mongoose.connect(url, {useNewUrlParser:true, useFindAndModify: false }, err => {
			if (err) {
				reject({status:500})
			} else {
				resolve()
			}
		})

	})
}

module.exports = connect