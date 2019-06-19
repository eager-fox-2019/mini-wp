const User = require('../models/').User
const verifyToken = require('../helpers/jwt.js').verifyToken

const authentication = (req, res, next) => {
	let token = req.headers.access_token
	if(token) {
		// console.log(token)
		try{
			let decode = verifyToken(token).input
			if(decode){
				req.decode = decode
				next()
			} else {
				//wrong token
				next({status: 403}) //forbidden
			}
		} catch (e){
			next({status: 400})
		}
	} else {
		//no token
		next({status: 403}) //forbidden
	}
}

const authorization = (req, res, next) => {
	let userId = req.params.userId
	if (userId){
		User.findOne({_id: userId})
			.then(found => {
				if (!found) {
					throw ({status: 404}) //user not found
				} else if (found.email == req.decode){
					//token's data matches userId params sent
					next()
				} else {
					//wrong user
					throw ({status:401}) //unauthorized
				}
			})
			.catch(next)
	} else {
		//no article id parameters
		next({status: 404}) //page not found
	}
}

module.exports = {
	authentication: authentication,
	authorization: authorization
}